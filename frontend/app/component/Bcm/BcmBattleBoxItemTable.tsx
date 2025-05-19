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
    getBcmBattleBoxItems,
    getBcmBattleBoxItemById,
    addBcmBattleBoxItem,
    updateBcmBattleBoxItem,
    deleteBcmBattleBoxItem,
} from '@/app/services/api/BcmBattleBoxItemApi';

import { BcmBattleBoxItemPojo, BcmBattleBoxItemDTO, PaginationResult, ErrorState } from '@/app/types/api';

import styles from './BcmBattleBoxItemTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmBattleBoxItemModal from './AddEditBcmBattleBoxItemModal';
import ViewBcmBattleBoxItemModal from './ViewBcmBattleBoxItemModal';

const BcmBattleBoxItemTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmBattleBoxItemPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Partial<BcmBattleBoxItemDTO> | null>(null);
    const [viewItem, setViewItem] = useState<BcmBattleBoxItemPojo | null>(null);

    // Fetch data on component mount or dependency change
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    // Fetch data
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<BcmBattleBoxItemPojo> = await getBcmBattleBoxItems(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load battle box items. Please try again later.',
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
            const data = await getBcmBattleBoxItemById(id);
            setViewItem(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching item details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmBattleBoxItemById(id);
            const dto: BcmBattleBoxItemDTO = {
                itemName: data.itemName,
                description: data.description,
                quantity: data.quantity,
                location: data.location,
                lastUpdated: data.lastUpdated,
                responsiblePerson: data.responsiblePerson,
            };
            setSelectedItem(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching item details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmBattleBoxItem(id);
            message.success('Item deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting item.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedItem(null);
        setModalOpen(true);
    };

    // Handle pagination change
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row menu items
    const getRowMenuItems = (record: BcmBattleBoxItemPojo) => [
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
        { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
        { title: 'Responsible Person', dataIndex: 'responsiblePerson', key: 'responsiblePerson' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmBattleBoxItemPojo) => (
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
            <div className={styles.tableHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className={styles.addButton}>
                    Add New Item
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
                <AddEditBcmBattleBoxItemModal
                    visible={modalOpen}
                    initialValues={selectedItem || undefined}
                    onSubmit={async (values) => {
                        if (selectedItem) {
                            await updateBcmBattleBoxItem(selectedItem.itemName!, values);
                        } else {
                            await addBcmBattleBoxItem(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewItem && (
                <ViewBcmBattleBoxItemModal
                    visible={viewModalOpen}
                    data={viewItem}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmBattleBoxItemTable;
