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
    getBcmImpactAssessmentList,
    getBcmImpactAssessmentById,
    addBcmImpactAssessment,
    updateBcmImpactAssessment,
    deleteBcmImpactAssessment,
} from '@/app/services/api/BcmImpactAssessmentApi';
import { BcmImpactAssessmentPojo, BcmImpactAssessmentDTO, PaginationResult, ErrorState } from '@/app/types/api';
import styles from './BcmImpactAssessmentTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBcmImpactAssessmentModal from './AddEditBcmImpactAssessmentModal';
import ViewBcmImpactAssessmentModal from './ViewBcmImpactAssessmentModal';

const BcmImpactAssessmentTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmImpactAssessmentPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedImpactAssessment, setSelectedImpactAssessment] = useState<Partial<BcmImpactAssessmentDTO> | null>(null);
    const [viewImpactAssessment, setViewImpactAssessment] = useState<BcmImpactAssessmentPojo | null>(null);

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<BcmImpactAssessmentPojo> = await getBcmImpactAssessmentList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load impact assessments. Please try again later.',
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

    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmImpactAssessmentById(id);
            setViewImpactAssessment(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching assessment details.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmImpactAssessmentById(id);
            const dto: BcmImpactAssessmentDTO = {
                id: data.id,
                impactType: data.impactType,
                severityLevel: data.severityLevel,
                timeToRecover: data.timeToRecover,
                processId: data.process?.id ?? '',
                subProcessId: data.subProcess?.id ?? '',
            };
            setSelectedImpactAssessment(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching assessment details.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmImpactAssessment(id);
            message.success('Assessment deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting assessment.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedImpactAssessment(null);
        setModalOpen(true);
    };

    const handleTableChange = (tablePagination: any) => {
        setPagination({
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
            total: tablePagination.total,
        });
    };

    const getRowMenuItems = (record: BcmImpactAssessmentPojo) => [
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
        { title: 'Impact Type', dataIndex: 'impactType', key: 'impactType' },
        { title: 'Severity Level', dataIndex: 'severityLevel', key: 'severityLevel' },
        { title: 'Time to Recover', dataIndex: 'timeToRecover', key: 'timeToRecover' },
        {
            title: 'Process',
            key: 'process',
            render: (record: BcmImpactAssessmentPojo) => record.process ? record.process.name : '',
        },
        {
            title: 'Sub-Process',
            key: 'subProcess',
            render: (record: BcmImpactAssessmentPojo) => record.subProcess ? record.subProcess.name : '',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmImpactAssessmentPojo) => (
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
            <div className={styles.tableHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className={styles.addButton}>
                    Add New Impact Assessment
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
                    loading={loading}
                    rowKey="id"
                    onChange={handleTableChange}
                />
            )}

            {modalOpen && (
                <AddEditBcmImpactAssessmentModal
                    visible={modalOpen}
                    initialValues={selectedImpactAssessment || undefined}
                    onSubmit={async (values) => {
                        if (selectedImpactAssessment?.id) {
                            await updateBcmImpactAssessment(selectedImpactAssessment.id, values);
                        } else {
                            await addBcmImpactAssessment(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {viewModalOpen && viewImpactAssessment && (
                <ViewBcmImpactAssessmentModal
                    visible={viewModalOpen}
                    data={viewImpactAssessment}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmImpactAssessmentTable;
