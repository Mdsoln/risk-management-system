import React, { useState, useEffect } from 'react';
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
    BcmPhoneDirectoryPojo,
    BcmPhoneDirectoryDTO,
    PaginationResult,
    ErrorState,
} from '@/app/types/api';

import styles from './BcmPhoneDirectoryTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

import {
    getBcmPhoneDirectories,
    getBcmPhoneDirectoryById,
    addBcmPhoneDirectory,
    updateBcmPhoneDirectory,
    deleteBcmPhoneDirectory,
} from '@/app/services/api/BcmPhoneDirectoryApi';
import AddEditBcmPhoneDirectoryModal from './AddEditBcmPhoneDirectoryModal';
import ViewBcmPhoneDirectoryModal from './ViewBcmPhoneDirectoryModal';


const BcmPhoneDirectoryTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmPhoneDirectoryPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<Partial<BcmPhoneDirectoryDTO> | null>(null);
    const [viewEntry, setViewEntry] = useState<BcmPhoneDirectoryPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmPhoneDirectoryPojo> = await getBcmPhoneDirectories(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load phone directory entries. Please try again later.',
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
            const data = await getBcmPhoneDirectoryById(id);
            setViewEntry(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching phone directory details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmPhoneDirectoryById(id);
            const dto: BcmPhoneDirectoryDTO = {
                id: data.id,
                roleName: data.roleName,
                phoneNumber: data.phoneNumber,
                room: data.room,
            };
            setSelectedEntry(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching phone directory details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmPhoneDirectory(id);
            message.success('Phone directory entry deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting phone directory entry.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedEntry(null); // Clear selected entry
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmPhoneDirectoryPojo) => [
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
        { title: 'Role/Name', dataIndex: 'roleName', key: 'roleName' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Room', dataIndex: 'room', key: 'room' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmPhoneDirectoryPojo) => (
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
                    Add New Entry
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
                <AddEditBcmPhoneDirectoryModal
                    visible={modalOpen}
                    initialValues={selectedEntry || undefined}
                    onSubmit={async (values) => {
                        if (selectedEntry?.id) {
                            await updateBcmPhoneDirectory(selectedEntry.id, values);
                        } else {
                            await addBcmPhoneDirectory(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewEntry && (
                <ViewBcmPhoneDirectoryModal
                    visible={viewModalOpen}
                    data={viewEntry}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmPhoneDirectoryTable;
