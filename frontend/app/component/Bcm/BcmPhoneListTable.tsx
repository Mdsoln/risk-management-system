import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Input, Skeleton, Space, message } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import {
    getBcmPhoneLists,
    getBcmPhoneListById,
    addBcmPhoneList,
    updateBcmPhoneList,
    deleteBcmPhoneList,
} from '@/app/services/api/BcmPhoneListApi';
import { BcmPhoneListPojo, BcmPhoneListDTO, PaginationResult, ErrorState } from '@/app/types/api';
import styles from './BcmPhoneListTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmPhoneListModal from './AddEditBcmPhoneListModal';
import ViewBcmPhoneListModal from './ViewBcmPhoneListModal';

const BcmPhoneListTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmPhoneListPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedPhoneList, setSelectedPhoneList] = useState<Partial<BcmPhoneListDTO> | null>(null);
    const [viewPhoneList, setViewPhoneList] = useState<BcmPhoneListPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmPhoneListPojo> = await getBcmPhoneLists(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load phone lists. Please try again later.',
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
            const data = await getBcmPhoneListById(id);
            setViewPhoneList(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching phone list details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmPhoneListById(id);
            const dto: BcmPhoneListDTO = {
                id: data.id,
                roleOrName: data.roleOrName,
                phonesRequired: data.phonesRequired,
                isdAccess: data.isdAccess,
                installedOk: data.installedOk,
                testedOk: data.testedOk,
                comments: data.comments,
            };
            setSelectedPhoneList(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching phone list details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmPhoneList(id);
            message.success('Phone list entry deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting phone list entry.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedPhoneList(null);
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmPhoneListPojo) => [
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
        { title: 'Role/Name', dataIndex: 'roleOrName', key: 'roleOrName' },
        { title: 'Phones Required', dataIndex: 'phonesRequired', key: 'phonesRequired' },
        { title: 'ISD Access', dataIndex: 'isdAccess', key: 'isdAccess', render: (isd: boolean) => (isd ? 'Yes' : 'No') },
        { title: 'Installed', dataIndex: 'installedOk', key: 'installedOk', render: (installed: boolean) => (installed ? 'Yes' : 'No') },
        { title: 'Tested', dataIndex: 'testedOk', key: 'testedOk', render: (tested: boolean) => (tested ? 'Yes' : 'No') },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmPhoneListPojo) => (
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
            <div className={styles.tableHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className={styles.addButton}>
                    Add New Entry
                </Button>
            </div>

            {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />}

            {loading ? (
                <Skeleton active />
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    rowKey="id"
                    onChange={handleTableChange}
                />
            )}

            {modalOpen && (
                <AddEditBcmPhoneListModal
                    visible={modalOpen}
                    initialValues={selectedPhoneList || undefined}
                    onSubmit={async (values) => {
                        if (selectedPhoneList?.id) {
                            await updateBcmPhoneList(selectedPhoneList.id, values);
                        } else {
                            await addBcmPhoneList(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {viewModalOpen && viewPhoneList && (
                <ViewBcmPhoneListModal visible={viewModalOpen} data={viewPhoneList} onClose={() => setViewModalOpen(false)} />
            )}
        </div>
    );
};

export default BcmPhoneListTable;
