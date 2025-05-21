import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Input, Skeleton, Space, message } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import {
    getRiskRegistryList,
    getRiskRegistryById,
    addRiskRegistry,
    updateRiskRegistry,
    deleteRiskRegistry,
} from '@/app/services/api/riskRegistryApi';

import { RiskRegistryPojo, RiskRegistryDTO, PaginationResult, ErrorState } from '@/app/types/api';

import styles from './RegistriesTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
// import AddEditRegistryModal from './AddEditRegistryModal';
import ViewRegistryModal from './ViewRegistryModal';

const RegistriesTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<RiskRegistryPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRegistry, setSelectedRegistry] = useState<Partial<RiskRegistryDTO> | null>(null);
    const [viewRegistry, setViewRegistry] = useState<RiskRegistryPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<RiskRegistryPojo> = await getRiskRegistryList(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load registries. Please try again later.',
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
            const data = await getRiskRegistryById(id);
            setViewRegistry(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching registry details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getRiskRegistryById(id);
            const dto: RiskRegistryDTO = {
                id: data.id,
                riskId: data.riskId,
            };
            setSelectedRegistry(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching registry details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteRiskRegistry(id);
            message.success('Registry deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting registry.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedRegistry(null); // Clear selected registry for adding new
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: RiskRegistryPojo) => [
        {
            key: 'view',
            icon: <EyeOutlined />, label: 'View',
            onClick: () => handleView(record.id),
        },
        {
            key: 'edit',
            icon: <EditOutlined />, label: 'Edit',
            onClick: () => handleEdit(record.id),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />, label: 'Delete',
            onClick: () => handleDelete(record.id),
        },
    ];

    // Table columns
    const columns = [
        { title: 'Risk ID', dataIndex: 'riskId', key: 'riskId' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RiskRegistryPojo) => (
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
            <Space>
                <Input
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add New Registry
                </Button>
            </Space>

            {/* Table */}
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                rowKey="id"
                onChange={handleTableChange}
            />

            {/* Add/Edit Modal */}
            {/* {modalOpen && (
                <AddEditRegistryModal
                    visible={modalOpen}
                    initialValues={selectedRegistry || undefined}
                    onSubmit={async (values) => {
                        if (selectedRegistry?.id) {
                            await updateRiskRegistry(selectedRegistry.id, values);
                        } else {
                            await addRiskRegistry(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )} */}

            {/* View Modal */}
            {viewModalOpen && viewRegistry && (
                <ViewRegistryModal
                    visible={viewModalOpen}
                    data={viewRegistry}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default RegistriesTable;
