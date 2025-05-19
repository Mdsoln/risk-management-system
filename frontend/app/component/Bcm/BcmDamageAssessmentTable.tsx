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
    getBcmDamageAssessments,
    getBcmDamageAssessmentById,
    deleteBcmDamageAssessment,
    addBcmDamageAssessment,
    updateBcmDamageAssessment,
} from '../../services/api/BcmDamageAssessmentApi';
import { BcmDamageAssessmentPojo, BcmDamageAssessmentDTO, PaginationResult } from '@/app/types/api';
import styles from './BcmDamageAssessmentTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmDamageAssessmentModal from './AddEditBcmDamageAssessmentModal';
import ViewBcmDamageAssessmentModal from './ViewBcmDamageAssessmentModal';

const BcmDamageAssessmentTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmDamageAssessmentPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState<Partial<BcmDamageAssessmentDTO> | null>(null);
    const [viewAssessment, setViewAssessment] = useState<BcmDamageAssessmentPojo | null>(null);

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    // Fetch BCM damage assessments
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<BcmDamageAssessmentPojo> = await getBcmDamageAssessments(
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
            const data = await getBcmDamageAssessmentById(id);

            // Map Pojo to DTO
            const dto: BcmDamageAssessmentDTO = {
                id: data.id,
                supplier: data.supplier,
                name: data.name,
                phoneWork: data.phoneWork,
                phoneHome: data.phoneHome,
                phoneMobile: data.phoneMobile,
            };

            setSelectedAssessment(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching assessment details.');
        } finally {
            setLoading(false);
        }
    };

    // View handler
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmDamageAssessmentById(id);
            setViewAssessment(data); // Set selected assessment for viewing
            setViewModalOpen(true); // Open the view modal
        } catch (error) {
            message.error('Error fetching assessment details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmDamageAssessment(id);
            message.success('Assessment deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting assessment.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedAssessment(null); // Clear selection for adding new assessment
        setModalOpen(true);
    };

    // Table pagination change
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row menu items
    const getRowMenuItems = (record: BcmDamageAssessmentPojo) => [
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
        { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Work Phone', dataIndex: 'phoneWork', key: 'phoneWork' },
        { title: 'Home Phone', dataIndex: 'phoneHome', key: 'phoneHome' },
        { title: 'Mobile Phone', dataIndex: 'phoneMobile', key: 'phoneMobile' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmDamageAssessmentPojo) => (
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
                    Add New Assessment
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
                <AddEditBcmDamageAssessmentModal
                    visible={modalOpen}
                    initialValues={selectedAssessment || undefined}
                    onSubmit={async (values: BcmDamageAssessmentDTO) => {
                        if (selectedAssessment?.id) {
                            await updateBcmDamageAssessment(selectedAssessment.id, values);
                        } else {
                            await addBcmDamageAssessment(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewAssessment && (
                <ViewBcmDamageAssessmentModal
                    visible={viewModalOpen}
                    data={viewAssessment}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmDamageAssessmentTable;
