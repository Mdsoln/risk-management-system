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
    getComplianceDocumentCategories,
    getComplianceDocumentCategoryById,
    deleteComplianceDocumentCategory,
    addComplianceDocumentCategory,
    updateComplianceDocumentCategory,
} from '../../services/api/complianceDocumentCategoryApi';
import {
    ComplianceDocumentCategoryPojo,
    ComplianceDocumentCategoryDTO,
    PaginationResult,
} from '@/app/types/api';
import styles from './ComplianceDocumentCategoryTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditComplianceDocumentCategoryModal from './AddEditComplianceDocumentCategoryModal';
import ViewComplianceDocumentCategoryModal from './ViewComplianceDocumentCategoryModal';

const ComplianceDocumentCategoryTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<ComplianceDocumentCategoryPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<string | null>(null);

    // Modal States
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Partial<ComplianceDocumentCategoryDTO> | null>(null);
    const [viewCategory, setViewCategory] = useState<ComplianceDocumentCategoryPojo | null>(null);

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    // Fetch compliance document categories
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<ComplianceDocumentCategoryPojo> = await getComplianceDocumentCategories(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
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

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getComplianceDocumentCategoryById(id);
            const dto: ComplianceDocumentCategoryDTO = {
                id: data.id,
                code: data.code,
                name: data.name,
                description: data.description,
            };

            setSelectedCategory(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching category data.');
        } finally {
            setLoading(false);
        }
    };

    // View handler
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getComplianceDocumentCategoryById(id);
            setViewCategory(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching category details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteComplianceDocumentCategory(id);
            message.success('Category deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting category.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    // Table pagination change
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row menu items
    const getRowMenuItems = (record: ComplianceDocumentCategoryPojo) => [
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
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: ComplianceDocumentCategoryPojo) => (
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
                    Add New Category
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
                <AddEditComplianceDocumentCategoryModal
                    visible={modalOpen}
                    initialValues={selectedCategory || undefined}
                    onSubmit={async (values: ComplianceDocumentCategoryDTO) => {
                        if (selectedCategory?.id) {
                            await updateComplianceDocumentCategory(selectedCategory.id, values);
                        } else {
                            await addComplianceDocumentCategory(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && (
                <ViewComplianceDocumentCategoryModal
                    visible={viewModalOpen}
                    data={viewCategory}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ComplianceDocumentCategoryTable;
