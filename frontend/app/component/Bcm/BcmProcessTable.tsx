import { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, message, Input, Skeleton, Space } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import {
    getBcmProcessList,
    getBcmProcessById,
    addBcmProcess,
    updateBcmProcess,
    deleteBcmProcess,
} from '@/app/services/api/BcmProcessApi';

import { BcmProcessPojo, BcmProcessDTO, PaginationResult, ErrorState } from '@/app/types/api';

import styles from './BcmProcessTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmProcessModal from './AddEditBcmProcessModal';
import ViewBcmProcessModal from './ViewBcmProcessModal';

const BcmProcessTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmProcessPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState<Partial<BcmProcessDTO> | null>(null);
    const [viewProcess, setViewProcess] = useState<BcmProcessPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmProcessPojo> = await getBcmProcessList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load processes list. Please try again later.',
                errors: [],
                refId: null,
            });
        } finally {
            setLoading(false);
        }
    };

    // Search handler
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    // View handler
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmProcessById(id);
            setViewProcess(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching process details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmProcessById(id);
            const dto: BcmProcessDTO = {
                id: data.id,
                name: data.name,
                priorityRanking: data.priorityRanking,
                rto: data.rto,
                rpo: data.rpo,
                dependencies: data.dependencies,
                responsibleParties: data.responsibleParties,
                departmentId: data.department.id,
            };
            setSelectedProcess(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching process details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmProcess(id);
            message.success('Process deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting process.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedProcess(null); // Clear selected process for adding new
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmProcessPojo) => [
        {
            key: 'view',
            icon: <EyeOutlined />,
            label: 'View',
            onClick: () => handleView(record.id),
        },
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: () => handleEdit(record.id),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: () => handleDelete(record.id),
        },
    ];

    // Table columns
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Priority Ranking', dataIndex: 'priorityRanking', key: 'priorityRanking' },
        { title: 'RTO', dataIndex: 'rto', key: 'rto' },
        { title: 'RPO', dataIndex: 'rpo', key: 'rpo' },
        { title: 'Department', dataIndex: 'department.name', key: 'department' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmProcessPojo) => (
                <Dropdown menu={{ items: getRowMenuItems(record) }} trigger={['click']}>
                    <Button type="text">
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            {/* Search Bar */}
            <div className={styles.tableHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className={styles.addButton}>
                    Add New Process
                </Button>
            </div>

            {/* Error Display */}
            {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />}

            {/* Table */}
            {loading ? (
                <Skeleton active />
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    loading={loading}
                    rowKey="id"
                    onChange={handleTableChange}
                />
            )}

            {/* Add/Edit Modal */}
            {modalOpen && (
                <AddEditBcmProcessModal
                    visible={modalOpen}
                    initialValues={selectedProcess || undefined}
                    onSubmit={async (values) => {
                        if (selectedProcess?.id) {
                            await updateBcmProcess(selectedProcess.id, values);
                        } else {
                            await addBcmProcess(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewProcess && (
                <ViewBcmProcessModal
                    visible={viewModalOpen}
                    data={viewProcess}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmProcessTable;
