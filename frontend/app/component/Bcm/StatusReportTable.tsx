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
    getStatusReportList,
    getStatusReportById,
    addStatusReport,
    updateStatusReport,
    deleteStatusReport,
} from '@/app/services/api/StatusReportApi';

import { StatusReportPojo, StatusReportDTO, PaginationResult, ErrorState } from '@/app/types/api';

import styles from './StatusReportTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditStatusReportModal from './AddEditStatusReportModal';
import ViewStatusReportModal from './ViewStatusReportModal';

const StatusReportTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<StatusReportPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Partial<StatusReportDTO> | null>(null);
    const [viewReport, setViewReport] = useState<StatusReportPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<StatusReportPojo> = await getStatusReportList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load status report list. Please try again later.',
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
            const data = await getStatusReportById(id);
            setViewReport(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching status report details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getStatusReportById(id);
            const dto: StatusReportDTO = {
                id: data.id,
                departmentId: data.department.id, // Updated field
                reportDate: data.reportDate,
                reportTime: data.reportTime,
                staff: data.staff,
                customers: data.customers,
                workInProgress: data.workInProgress,
                financialImpact: data.financialImpact,
                operatingConditions: data.operatingConditions,
            };
            setSelectedReport(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching status report details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteStatusReport(id);
            message.success('Status report deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting status report.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedReport(null); // Clear selected report for adding new
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: StatusReportPojo) => [
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
        {
            title: 'Department',
            dataIndex: ['department', 'name'], // Access nested 'department.name'
            key: 'department'
        },
        {
            title: 'Report Date',
            dataIndex: 'reportDate',
            key: 'reportDate'
        },
        {
            title: 'Report Time',
            dataIndex: 'reportTime',
            key: 'reportTime'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: StatusReportPojo) => (
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
                    Add New Report
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
                <AddEditStatusReportModal
                    visible={modalOpen}
                    initialValues={selectedReport || undefined}
                    onSubmit={async (values) => {
                        if (selectedReport?.id) {
                            await updateStatusReport(selectedReport.id, values);
                        } else {
                            await addStatusReport(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewReport && (
                <ViewStatusReportModal
                    visible={viewModalOpen}
                    data={viewReport}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default StatusReportTable;
