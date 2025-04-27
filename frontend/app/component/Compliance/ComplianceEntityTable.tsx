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
    ComplianceEntityPojo,
    ComplianceEntityDTO,
    PaginationResult,
} from '@/app/types/api';
import styles from './ComplianceEntityTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { getComplianceEntities, getComplianceEntityById, deleteComplianceEntity, updateComplianceEntity, addComplianceEntity } from '@/app/services/api/ComplianceEntityApi';
import AddEditComplianceEntityModal from './AddEditComplianceEntityModal';
import ViewComplianceEntityModal from './ViewComplianceEntityModal';

const ComplianceEntityTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<ComplianceEntityPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Partial<ComplianceEntityDTO> | null>(null);
    const [viewEntity, setViewEntity] = useState<ComplianceEntityPojo | null>(null);

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]);

    // Fetch compliance entities
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<ComplianceEntityPojo> = await getComplianceEntities(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({
                current: data.currentPage + 1,
                pageSize: data.pageSize,
                total: data.totalItems,
            });
        } catch (error: any) {
            setErrorState('Error fetching data. Please try again.');
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
            const data = await getComplianceEntityById(id);
            setViewEntity(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching entity details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getComplianceEntityById(id);

            // Map Pojo to DTO
            const dto: ComplianceEntityDTO = {
                id: data.id,
                name: data.name,
                description: data.description,
                categoryId: data.category.id, // Map category
            };

            setSelectedEntity(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching entity data.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteComplianceEntity(id);
            message.success('Entity deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting entity.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedEntity(null); // Clear selection for adding new entity
        setModalOpen(true);
    };

    // Table pagination change
    const handleTableChange = (pagination: any) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
        });
    };

    // Row menu items
    const getRowMenuItems = (record: ComplianceEntityPojo) => [
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
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Category', dataIndex: ['category', 'name'], key: 'category' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: ComplianceEntityPojo) => (
                <Dropdown
                    overlay={<Menu items={getRowMenuItems(record)} />}
                    trigger={['click']}
                >
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
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    className={styles.addButton}
                >
                    Add New Entity
                </Button>
            </div>

            {/* Error Display */}
            {errorState && (
                <ErrorDisplayAlert
                    errorState={{
                        message: errorState,
                        description: '',
                        errors: [],
                        refId: null,
                    }}
                    onClose={() => setErrorState(null)}
                />
            )}

            {/* Table */}
            {loading ? (
                <Skeleton active />
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        onChange: (page, pageSize) => {
                            setPagination(prev => ({ ...prev, current: page, pageSize }));
                        },
                    }}
                    loading={loading}
                    rowKey="id"
                    onChange={handleTableChange}
                />
            )}

            {/* Add/Edit Modal */}
            {modalOpen && (
                <AddEditComplianceEntityModal
                    visible={modalOpen}
                    initialValues={selectedEntity || undefined}
                    onSubmit={async (values: ComplianceEntityDTO) => {
                        if (selectedEntity?.id) {
                            await updateComplianceEntity(selectedEntity.id, values);
                        } else {
                            await addComplianceEntity(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewEntity && (
                <ViewComplianceEntityModal
                    visible={viewModalOpen}
                    data={viewEntity}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ComplianceEntityTable;
