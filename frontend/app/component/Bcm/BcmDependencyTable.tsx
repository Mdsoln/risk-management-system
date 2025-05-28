// BcmDependencyTable.tsx

import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Input, Skeleton, message } from 'antd';
import { SearchOutlined, MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { BcmDependencyDTO, BcmDependencyPojo, PaginationResult, ErrorState } from '@/app/types/api';
import { getBcmDependencies, getBcmDependencyById, addBcmDependency, updateBcmDependency, deleteBcmDependency } from '@/app/services/api/BcmDependencyApi';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmDependencyModal from './AddEditBcmDependencyModal';
import ViewBcmDependencyModal from './ViewBcmDependencyModal';
// (Optionally) import styles from './BcmDependencyTable.module.css'; // If you have a CSS module

const BcmDependencyTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmDependencyPojo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
    const [selectedDependency, setSelectedDependency] = useState<Partial<BcmDependencyDTO> | null>(null);
    const [viewDependency, setViewDependency] = useState<BcmDependencyPojo | null>(null);

    // Fetch data on component mount or when pagination/search changes
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<BcmDependencyPojo> = await getBcmDependencies(page - 1, pageSize, keyword);
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching dependencies',
                description: error?.message || 'Could not load data',
                errors: [],
                refId: null,
            });
        } finally {
            setLoading(false);
        }
    };

    // Search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    // Add
    const handleAdd = () => {
        setSelectedDependency(null);
        setModalOpen(true);
    };

    // Edit
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmDependencyById(id);
            // Convert Pojo to DTO (include id so we can update)
            const dto: BcmDependencyDTO = {
                id: data.id,
                name: data.name,
                description: data.description,
            };
            setSelectedDependency(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching dependency details.');
        } finally {
            setLoading(false);
        }
    };

    // View
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmDependencyById(id);
            setViewDependency(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching dependency details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmDependency(id);
            message.success('Dependency deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting dependency.');
        } finally {
            setLoading(false);
        }
    };

    // Table pagination
    const handleTableChange = (p: any) => {
        setPagination({ current: p.current, pageSize: p.pageSize, total: p.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmDependencyPojo) => [
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
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmDependencyPojo) => (
                <Dropdown menu={{ items: getRowMenuItems(record) }}>
                    <Button type="text">
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            {/* Search / Add Toolbar */}
            <div /*className={styles.tableHeader}*/ style={{ display: 'flex', marginBottom: 16 }}>
                <Input
                    /*className={styles.searchInput}*/
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ width: 300, marginRight: 16 }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add Dependency
                </Button>
            </div>

            {/* Error Display */}
            {errorState && (
                <ErrorDisplayAlert
                    errorState={errorState}
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
                    }}
                    onChange={handleTableChange}
                    rowKey="id"
                    size="middle"
                />
            )}

            {/* Add/Edit Modal */}
            {modalOpen && (
                <AddEditBcmDependencyModal
                    visible={modalOpen}
                    initialValues={selectedDependency || undefined}
                    onSubmit={async (values) => {
                        if (selectedDependency?.id) {
                            // Update existing
                            await updateBcmDependency(selectedDependency.id, values);
                        } else {
                            // Add new
                            await addBcmDependency(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewDependency && (
                <ViewBcmDependencyModal
                    visible={viewModalOpen}
                    data={viewDependency}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmDependencyTable;
