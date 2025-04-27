import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, message, Input, Skeleton } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import {
    BcmSystemListingPojo,
    BcmSystemListingDTO,
    PaginationResult,
    ErrorState,
} from '@/app/types/api';

import styles from './BcmSystemListingTable.module.css';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

import {
    getBcmSystemListings,
    getBcmSystemListingById,
    addBcmSystemListing,
    updateBcmSystemListing,
    deleteBcmSystemListing,
} from '@/app/services/api/BcmSystemListingApi';
import AddEditBcmSystemListingModal from './AddEditBcmSystemListingModal';
import ViewBcmSystemListingModal from './ViewBcmSystemListingModal';


const BcmSystemListingTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<BcmSystemListingPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Partial<BcmSystemListingDTO> | null>(null);
    const [viewListing, setViewListing] = useState<BcmSystemListingPojo | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]);

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BcmSystemListingPojo> = await getBcmSystemListings(
                page - 1,
                pageSize,
                keyword
            );
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load system listings. Please try again later.',
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
            const data = await getBcmSystemListingById(id);
            setViewListing(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching system listing details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBcmSystemListingById(id);
            const dto: BcmSystemListingDTO = {
                id: data.id,
                businessArea: data.businessArea,
                applicationsAndDatabase: data.applicationsAndDatabase,
                telephones: data.telephones,
                mobilePhones: data.mobilePhones,
                modem: data.modem,
                fax: data.fax,
                laserPrinter: data.laserPrinter,
                photocopier: data.photocopier,
                others: data.others,
            };
            setSelectedListing(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching system listing details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBcmSystemListing(id);
            message.success('System listing deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting system listing.');
        } finally {
            setLoading(false);
        }
    };

    // Add handler
    const handleAdd = () => {
        setSelectedListing(null); // Clear selected listing
        setModalOpen(true);
    };

    // Pagination handler
    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    // Row actions menu
    const getRowMenuItems = (record: BcmSystemListingPojo) => [
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
        { title: 'Business Area', dataIndex: 'businessArea', key: 'businessArea' },
        { title: 'Applications & DB', dataIndex: 'applicationsAndDatabase', key: 'applicationsAndDatabase' },
        { title: 'Telephones', dataIndex: 'telephones', key: 'telephones' },
        { title: 'Mobile Phones', dataIndex: 'mobilePhones', key: 'mobilePhones' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BcmSystemListingPojo) => (
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
                    Add New Listing
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
                <AddEditBcmSystemListingModal
                    visible={modalOpen}
                    initialValues={selectedListing || undefined}
                    onSubmit={async (values) => {
                        if (selectedListing?.id) {
                            await updateBcmSystemListing(selectedListing.id, values);
                        } else {
                            await addBcmSystemListing(values);
                        }
                        fetchData(pagination.current, pagination.pageSize, searchKeyword);
                        setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                />
            )}

            {/* View Modal */}
            {viewModalOpen && viewListing && (
                <ViewBcmSystemListingModal
                    visible={viewModalOpen}
                    data={viewListing}
                    onClose={() => setViewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BcmSystemListingTable;
