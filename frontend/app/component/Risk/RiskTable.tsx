import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, message, Input, Skeleton, Space } from 'antd';
import { MoreOutlined, RightCircleFilled, DownCircleFilled, EyeOutlined, EditOutlined, PlusOutlined, DeleteOutlined, SearchOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getRisks, getRiskById, deleteRisk } from '../../services/api/riskApi';
import ViewRiskModal from './ViewRiskModal';
import AddEditRiskModal from './AddEditRiskModal';
import { Risk, PaginationResult, ErrorState, FieldError, RiskDto, RiskIndicatorDto, RiskControlDto } from '@/app/types/api';
import ClearPersistedStateButton from '../Button/ClearPersistedStateButton';
import { formatDateTime } from '../../utils/dateHelper';
import { renderStatus } from '../../utils/statusHelper';
import { useDebounce } from '../../utils/debounce';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import type { ColumnsType } from 'antd/es/table';
import { handleErrorResponse } from '@/app/utils/errorHandler';
import styles from './RiskTable.module.css'; // Import CSS module
import AddEditRiskControlModal from '../RiskControl/AddEditRiskControlModal';
import CustomModal from '../Modal/CustomModal';
import RiskViewDetail from './RiskViewDetail';

const RiskTable: React.FC = () => {
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewData, setViewData] = useState<Risk | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [indicatorModalOpen, setIndicatorModalOpen] = useState(false);
    const [controlModalOpen, setControlModalOpen] = useState(false); // New state for risk control modal
    const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<Risk[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

    useEffect(() => {
        fetchTableData(pagination.current, pagination.pageSize, debouncedSearchKeyword);
    }, [pagination.current, pagination.pageSize, debouncedSearchKeyword]);

    const fetchTableData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<Risk> = await getRisks(page - 1, pageSize, keyword); // Adjust page index for API
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, handleFormErrors);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    const handleView = async (id: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data = await getRiskById(id);
            setViewData(data);
            setViewModalOpen(true);
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, handleFormErrors);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setViewModalOpen(false);
    };

    const handleReload = async () => {
        if (viewData?.id) {
            setLoading(true);
            setErrorState(null);
            try {
                const data = await getRiskById(viewData.id);
                setViewData(data);
            } catch (error: any) {
                handleErrorResponse(error, setErrorState, handleFormErrors);
                message.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAdd = () => {
        setCurrentRecordId(null);
        setViewData(null);
        setModalOpen(true);
    };

    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getRiskById(id);
            setViewData(data);
            setModalOpen(true);
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, handleFormErrors);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddIndicator = (riskId: string) => {
        setCurrentRecordId(riskId);
        setIndicatorModalOpen(true);
    };

    const handleAddControl = (riskId: string) => { // New handler for adding risk control
        setCurrentRecordId(riskId);
        setControlModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            await deleteRisk(id);
            message.success('Risk deleted successfully');
            fetchTableData(pagination.current, pagination.pageSize, debouncedSearchKeyword);
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, handleFormErrors);
            message.error('Error deleting data');
        } finally {
            setLoading(false);
        }
    };

    const getRowMenuItems = (record: Risk) => [
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
            key: 'addIndicator',
            icon: <PlusOutlined />,
            label: 'Add Indicator',
            onClick: () => handleAddIndicator(record.id),
        },
        {
            key: 'addControl', // New menu item for adding risk control
            icon: <PlusOutlined />,
            label: 'Add Control',
            onClick: () => handleAddControl(record.id),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: () => handleDelete(record.id),
        },
    ];

    const renderExpandIcon = ({ expanded, onExpand, record }: { expanded: boolean; onExpand: (record: Risk, e: React.MouseEvent<HTMLElement>) => void; record: Risk }) =>
        expanded ? (
            <DownCircleFilled className={styles.icon} onClick={e => onExpand(record, e)} />
        ) : (
            <RightCircleFilled className={styles.icon} onClick={e => onExpand(record, e)} />
        );

    const columns: ColumnsType<Risk> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: renderStatus },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => (
                <>
                    <Button type="text" icon={<ClockCircleOutlined style={{ color: '#000000' }} />} />
                    {formatDateTime(text)}
                </>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Risk) => (
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

    const handleFormErrors = (errors: FieldError[]) => {
        const formFields = errors.map(error => ({
            name: error.field,
            errors: [error.message],
        }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    // custom modal
    const handleCustomCancel = () => {
        // setIsModalVisible(false);
        console.log('Custom Modal Cancel button clicked');
        setViewModalOpen(false);

    };

    const handleCustomOk = (data?: any) => {
        console.log('Custom Modal OK button clicked with data:', data);
        // setIsModalVisible(false);
    };


    const customFooter = (
        <div>
            <Space>
                <Button onClick={handleCustomCancel}>Close</Button>
                <Button type="primary" onClick={handleCustomOk}>
                    Confirm
                </Button>
            </Space>
        </div>
    );

    return (
        <div>
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
                    Add New Risk
                </Button>
            </div>
            {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />}
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
                    expandable={{
                        expandedRowRender: (record: Risk) => <p style={{ margin: 0 }}>{record.description}</p>,
                        expandIcon: renderExpandIcon,
                    }}
                    onChange={handleTableChange}
                    size="small"
                    scroll={{ x: '100%', y: '100%' }}
                />
            )}

            {/* <CustomModal
                visible={viewModalOpen}
                title="Custom Modal Title"
                onCancel={handleCustomCancel}
                onOk={handleCustomOk}
                footer={customFooter}
                width="85%"
                height="85vh"
                data={{ customData: 'example' }}
            >
                <p>Modal content goes here...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
            </CustomModal> */}
            {/* <CustomModal
                visible={viewModalOpen}
                title="Amidst the bustling city streets, where the sounds of honking cars and chattering pedestrians filled the air, a lone musician stood at the corner, playing a soulful melody on his violin, capturing the hearts of passersby and providing a moment of serenity in the chaos."
                onCancel={handleCustomCancel}
                onOk={handleCustomOk}
                footer={customFooter}
                width="85%"
                height="73vh"
                data={{ customData: 'example' }}
                icon={<InfoCircleOutlined />}
                errorState={errorState}
            >
                <p>Modal content goes here...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
                <p>More content...</p>
            </CustomModal> */}


            <RiskViewDetail
                visible={viewModalOpen}
                risk={viewData}
                onCancel={handleCustomCancel} />



            {/* <ViewRiskModal
                visible={viewModalOpen}
                data={viewData}
                onClose={handleModalClose}
            /> */}
            <AddEditRiskModal
                visible={modalOpen}
                initialValues={viewData || undefined}
                onSubmit={async (values: Partial<RiskDto>) => {
                    fetchTableData(pagination.current, pagination.pageSize, debouncedSearchKeyword);
                    setModalOpen(false);
                }}
                onCancel={() => setModalOpen(false)}
            />
            {/* <AddEditRiskIndicatorModal
                visible={indicatorModalOpen}
                initialValues={undefined}
                riskId={currentRecordId!}
                onSubmit={async (values: Partial<RiskIndicatorDto>) => {
                    fetchTableData(pagination.current, pagination.pageSize, debouncedSearchKeyword);
                    setIndicatorModalOpen(false);
                }}
                onCancel={() => setIndicatorModalOpen(false)}
            /> */}
            <AddEditRiskControlModal // Render the risk control modal
                visible={controlModalOpen}
                initialValues={undefined}
                riskId={currentRecordId!}
                onSubmit={async (values: Partial<RiskControlDto>) => {
                    fetchTableData(pagination.current, pagination.pageSize, debouncedSearchKeyword);
                    setControlModalOpen(false);
                }}
                onCancel={() => setControlModalOpen(false)}
                context="table"
            />
            <ClearPersistedStateButton />
        </div>
    );
};

export default RiskTable;
