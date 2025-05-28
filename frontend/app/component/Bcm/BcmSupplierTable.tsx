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
    getBcmSuppliers,
    getBcmSupplierById,
    deleteBcmSupplier,
    addBcmSupplier,
    updateBcmSupplier,
} from '@/app/services/api/BcmSupplierApi';

import { BcmSupplierPojo, BcmSupplierDTO, PaginationResult, ErrorState } from '@/app/types/api';
import styles from './BcmSupplierTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmSupplierModal from './AddEditBcmSupplierModal';
import ViewBcmSupplierModal from './ViewBcmSupplierModal';

const BcmSupplierTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmSupplierPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Partial<BcmSupplierDTO> | null>(null);
    const [viewSupplier, setViewSupplier] = useState<BcmSupplierPojo | null>(null);

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    // Fetch suppliers
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmSupplierPojo> = await getBcmSuppliers(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching suppliers.',
                description: 'Unable to load supplier data. Please try again later.',
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
            const data = await getBcmSupplierById(id);
            setViewSupplier(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching supplier details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmSupplierById(id);

            // Map Pojo to DTO
            const dto: BcmSupplierDTO = {
                id: data.id,
                name: data.name,
                phoneWork: data.phoneWork,
                phoneHome: data.phoneHome,
                phoneMobile: data.phoneMobile,
                description: data.description,
            };

            setSelectedSupplier(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching supplier details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmSupplier(id);
            message.success('Supplier deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting supplier.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedSupplier(null); // Clear selection for adding new supplier
        setModalOpen(true);
    };

    // Handle pagination change
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row menu items
    const getRowMenuItems = (record: BcmSupplierPojo) => [
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
        { title: 'Work Phone', dataIndex: 'phoneWork', key: 'phoneWork' },
        { title: 'Home Phone', dataIndex: 'phoneHome', key: 'phoneHome' },
        { title: 'Mobile Phone', dataIndex: 'phoneMobile', key: 'phoneMobile' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmSupplierPojo) => (
                <Dropdown
                    menu={{ items: getRowMenuItems(record) }}
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
                    Add New Supplier
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
                <AddEditBcmSupplierModal
                    visible={modalOpen}
                    initialValues={selectedSupplier || undefined}
                    onSubmit={async (values) => {
                        if (selectedSupplier?.id) {
                            await updateBcmSupplier(selectedSupplier.id, values);
                        } else {
                            await addBcmSupplier(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewSupplier && (
                <ViewBcmSupplierModal
                    visible={viewModalOpen}
                    data={viewSupplier}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmSupplierTable;
