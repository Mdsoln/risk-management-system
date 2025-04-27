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
    getBcmUrgentResources,
    getBcmUrgentResourceById,
    deleteBcmUrgentResource,
    addBcmUrgentResource,
    updateBcmUrgentResource,
} from '@/app/services/api/BcmUrgentResourceApi';
import { BcmUrgentResourcePojo, BcmUrgentResourceDTO, PaginationResult, ErrorState } from '@/app/types/api';
import styles from './BcmUrgentResourceTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmUrgentResourceModal from './AddEditBcmUrgentResourceModal';
import ViewBcmUrgentResourceModal from './ViewBcmUrgentResourceModal';

const BcmUrgentResourceTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmUrgentResourcePojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState<Partial<BcmUrgentResourceDTO> | null>(null);
    const [viewResource, setViewResource] = useState<BcmUrgentResourcePojo | null>(null);

    // Fetch data on component load
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmUrgentResourcePojo> = await getBcmUrgentResources(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load urgent resources. Please try again later.',
                errors: [],
                refId: null,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    // View handler
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmUrgentResourceById(id);
            setViewResource(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching resource details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmUrgentResourceById(id);
            const dto: BcmUrgentResourceDTO = {
                resourceName: data.resourceName,
                description: data.description,
                quantity: data.quantity,
                category: data.category,
                location: data.location,
                responsiblePerson: data.responsiblePerson,
                contactNumber: data.contactNumber,
            };
            setSelectedResource(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching resource details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmUrgentResource(id);
            message.success('Resource deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting resource.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedResource(null);
        setModalOpen(true);
    };

    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Menu actions
    const getRowMenuItems = (record: BcmUrgentResourcePojo) => [
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

    const columns = [
        { title: 'Resource Name', dataIndex: 'resourceName', key: 'resourceName' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmUrgentResourcePojo) => (
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
                    Add New Resource
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
                <AddEditBcmUrgentResourceModal
                    visible={modalOpen}
                    initialValues={selectedResource || undefined}
                    onSubmit={async (values) => {
                        if (selectedResource) {
                            await updateBcmUrgentResource(selectedResource.resourceName!, values);
                        } else {
                            await addBcmUrgentResource(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewResource && (
                <ViewBcmUrgentResourceModal
                    visible={viewModalOpen}
                    data={viewResource}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmUrgentResourceTable;
