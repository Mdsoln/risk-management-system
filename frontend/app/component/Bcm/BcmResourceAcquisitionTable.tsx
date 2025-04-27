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
    BcmResourceAcquisitionPojo,
    BcmResourceAcquisitionDTO,
    PaginationResult,
    ErrorState,
} from '@/app/types/api';

import styles from './BcmResourceAcquisitionTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

import {
    getBcmResourceAcquisitions,
    getBcmResourceAcquisitionById,
    addBcmResourceAcquisition,
    updateBcmResourceAcquisition,
    deleteBcmResourceAcquisition,
} from '@/app/services/api/BcmResourceAcquisitionApi';

import AddEditBcmResourceAcquisitionModal from './AddEditBcmResourceAcquisitionModal';
import ViewBcmResourceAcquisitionModal from './ViewBcmResourceAcquisitionModal';

const BcmResourceAcquisitionTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmResourceAcquisitionPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState<Partial<BcmResourceAcquisitionDTO> | null>(null);
    const [viewResource, setViewResource] = useState<BcmResourceAcquisitionPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmResourceAcquisitionPojo> = await getBcmResourceAcquisitions(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load resource acquisitions. Please try again later.',
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
            const data = await getBcmResourceAcquisitionById(id);
            setViewResource(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching resource acquisition details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmResourceAcquisitionById(id);
            const dto: BcmResourceAcquisitionDTO = {
                id: data.id, // Include the ID here
                resource: data.resource,
                qtyNeeded: data.qtyNeeded,
                qtyAvailable: data.qtyAvailable,
                qtyToGet: data.qtyToGet,
                source: data.source,
                done: data.done,
            };
            setSelectedResource(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching resource acquisition details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmResourceAcquisition(id);
            message.success('Resource acquisition deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting resource acquisition.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedResource(null); // Clear selected resource
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmResourceAcquisitionPojo) => [
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
        { title: 'Resource', dataIndex: 'resource', key: 'resource' },
        { title: 'Qty Needed', dataIndex: 'qtyNeeded', key: 'qtyNeeded' },
        { title: 'Qty Available', dataIndex: 'qtyAvailable', key: 'qtyAvailable' },
        { title: 'Qty To Get', dataIndex: 'qtyToGet', key: 'qtyToGet' },
        { title: 'Source', dataIndex: 'source', key: 'source' },
        {
            title: 'Done',
            dataIndex: 'done',
            key: 'done',
            render: (done: boolean) => (done ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmResourceAcquisitionPojo) => (
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
            {/* Search Bar */}
            <div className={styles.tableHeader}>
                <Input
                    className={styles.searchInput}
                    placeholder="Search"
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className={styles.addButton}>
                    Add New Resource
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
                <AddEditBcmResourceAcquisitionModal
                    visible={modalOpen}
                    initialValues={selectedResource || undefined}
                    onSubmit={async (values) => {
                        if (selectedResource?.id) {
                            // Pass the ID for update
                            await updateBcmResourceAcquisition(selectedResource.id, values);
                        } else {
                            // Add new resource
                            await addBcmResourceAcquisition(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}

                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewResource && (
                <ViewBcmResourceAcquisitionModal
                    visible={viewModalOpen}
                    data={viewResource}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmResourceAcquisitionTable;
