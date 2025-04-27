import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Input, Skeleton, Space, message } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
    DownCircleFilled,
    RightCircleFilled,
} from '@ant-design/icons';

import {
    FundObjectivePojo,
    FundObjectiveDTO,
    PaginationResult,
    ErrorState,
} from '@/app/types/api';

import styles from './FundObjectiveTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

import AddEditFundObjectiveModal from './AddEditFundObjectiveModal';
import ViewFundObjectiveModal from './ViewFundObjectiveModal';

import {
    getFundObjectiveList,
    getFundObjectiveById,
    deleteFundObjective,
    updateFundObjective,
    addFundObjective,
} from '@/app/services/api/fundObjectiveApi';

const FundObjectiveTable: React.FC = () => {
    // States
    const [dataSource, setDataSource] = useState<FundObjectivePojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    // Modal States
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedObjective, setSelectedObjective] = useState<Partial<FundObjectiveDTO> | null>(null);
    const [viewObjective, setViewObjective] = useState<FundObjectivePojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]);

    // Fetch Fund Objectives
    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<FundObjectivePojo> = await getFundObjectiveList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load fund objectives. Please try again later.',
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
            const data = await getFundObjectiveById(id);
            setViewObjective(data);
            setViewModalOpen(true); // Open view modal
        } catch (error) {
            message.error('Error fetching fund objective details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getFundObjectiveById(id);
            const dto: FundObjectiveDTO = {
                id: data.id,
                name: data.name,
                description: data.description,
                startDateTime: data.startDateTime,
                endDateTime: data.endDateTime,
            };
            setSelectedObjective(dto); // Set data for edit
            setModalOpen(true); // Open modal for edit
        } catch (error) {
            message.error('Error fetching fund objective details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteFundObjective(id);
            message.success('Fund objective deleted successfully.');
            fetchData(1, pagination.pageSize, searchKeyword); // Refresh data
        } catch (error) {
            message.error('Error deleting fund objective.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedObjective(null); // Clear selected objective
        setModalOpen(true); // Open modal for add
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Expandable row render
    const renderExpandIcon = ({ expanded, onExpand, record }: any) =>
        expanded ? (
            <DownCircleFilled onClick={(e) => onExpand(record, e)} />
        ) : (
            <RightCircleFilled onClick={(e) => onExpand(record, e)} />
        );

    // Table columns
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Start Date', dataIndex: 'startDateTime', key: 'startDateTime' },
        { title: 'End Date', dataIndex: 'endDateTime', key: 'endDateTime' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: FundObjectivePojo) => (
                <Dropdown overlay={<Menu
                    items={[
                        {
                            key: 'view',
                            icon: <EyeOutlined />,
                            label: 'View',
                            onClick: () => handleView(record.id)
                        },
                        {
                            key: 'edit',
                            icon: <EditOutlined />,
                            label: 'Edit',
                            onClick: () => handleEdit(record.id)
                        },
                        {
                            key: 'delete',
                            icon: <DeleteOutlined />,
                            label: 'Delete',
                            onClick: () => handleDelete(record.id)
                        },
                    ]}
                />} trigger={['click']}>
                    <Button type="text">
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <Space>
                <Input
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add New Objective
                </Button>
            </Space>

            {/* Error Display */}
            {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />}

            {/* Table */}
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                rowKey="id"
                expandable={{
                    expandedRowRender: (record) => <p>{record.description}</p>,
                    expandIcon: renderExpandIcon,
                }}
                onChange={handleTableChange}
            />

            {/* Add/Edit Modal */}
            {modalOpen && (
                <AddEditFundObjectiveModal
                    visible={modalOpen}
                    initialValues={selectedObjective || undefined}
                    onSubmit={async (values) => {
                        if (selectedObjective?.id) {
                            await updateFundObjective(selectedObjective.id, values);
                        } else {
                            await addFundObjective(values);
                        }
                        fetchData(1, pagination.pageSize, searchKeyword); // Refresh table
                        setModalOpen(false); // Close modal
                    }}
                    onCancel={() => setModalOpen(false)} // Close modal
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewObjective && (
                <ViewFundObjectiveModal
                    visible={viewModalOpen}
                    data={viewObjective}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default FundObjectiveTable;
