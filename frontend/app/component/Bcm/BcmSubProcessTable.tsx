import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, message, Input, Skeleton, Space } from 'antd';
import { MoreOutlined, EditOutlined, PlusOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { getBcmSubProcessList, deleteBcmSubProcess, getBcmSubProcessById, addBcmSubProcess, updateBcmSubProcess } from '@/app/services/api/BcmSubProcessApi';
import { BcmSubProcessPojo, PaginationResult } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmSubProcessModal from './AddEditBcmSubProcessModal';
import ViewBcmSubProcessModal from './ViewBcmSubProcessModal';

const BcmSubProcessTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmSubProcessPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedSubProcess, setSelectedSubProcess] = useState<Partial<BcmSubProcessPojo> | null>(null);
    const [viewSubProcess, setViewSubProcess] = useState<BcmSubProcessPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmSubProcessPojo> = await getBcmSubProcessList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load sub-process list. Please try again later.',
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
            const data = await getBcmSubProcessById(id);
            setViewSubProcess(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching sub-process details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmSubProcessById(id);
            setSelectedSubProcess(data);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching sub-process details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmSubProcess(id);
            message.success('Sub-process deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting sub-process.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedSubProcess(null); // Clear selected sub-process for adding new
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmSubProcessPojo) => [
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
        { title: 'Process', dataIndex: 'process.name', key: 'process' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmSubProcessPojo) => (
                <Dropdown overlay={<Menu items={getRowMenuItems(record)} />} trigger={['click']}>
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
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <Input
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ width: '200px' }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    style={{ marginLeft: '8px' }}
                >
                    Add New Sub-process
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
                <AddEditBcmSubProcessModal
                    visible={modalOpen}
                    initialValues={selectedSubProcess || undefined}
                    onSubmit={async (values) => {
                        if (selectedSubProcess?.id) {
                            // Update sub-process
                            await updateBcmSubProcess(selectedSubProcess.id, values);
                        } else {
                            // Add new sub-process
                            await addBcmSubProcess(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewSubProcess && (
                <ViewBcmSubProcessModal
                    visible={viewModalOpen}
                    data={viewSubProcess}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmSubProcessTable;
