import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, message, Input, Skeleton, Radio } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import {
    getComplianceDocuments,
    getComplianceDocumentById,
    deleteComplianceDocument,
    addComplianceDocument,
    updateComplianceDocument,
} from '../../services/api/complianceDocumentApi';
import {
    ComplianceDocumentPojo,
    ComplianceDocumentDTO,
    PaginationResult,
} from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditComplianceDocumentModal from './AddEditComplianceDocumentModal';
import ViewComplianceDocumentModal from './ViewComplianceDocumentModal';
import AddEditComplianceMatrixFormModal from './AddEditComplianceMatrixFormModal'; // Added for matrix modal

const ComplianceDocumentTable: React.FC = () => {
    const [dataSource, setDataSource] = useState<ComplianceDocumentPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [matrixModalOpen, setMatrixModalOpen] = useState(false); // Added for matrix modal
    const [selectedDocument, setSelectedDocument] = useState<Partial<ComplianceDocumentDTO> | null>(null);
    const [viewDocument, setViewDocument] = useState<ComplianceDocumentPojo | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);
        try {
            const data: PaginationResult<ComplianceDocumentPojo> = await getComplianceDocuments(
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const handleAdd = () => {
        setSelectedDocument(null);
        setModalOpen(true);
    };

    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getComplianceDocumentById(id);
            const dto: ComplianceDocumentDTO = {
                id: data.id,
                name: data.name,
                year: data.year,
                description: data.description,
                entityId: data.entity.id,
                documentCategoryId: data.documentCategory.id,
                departmentId: data.department.id,
                complianceMatrices: data.complianceMatrices.map(matrix => ({
                    id: matrix.id,
                    itemNumber: matrix.itemNumber,
                    details: matrix.details,
                    departmentId: matrix.department.id,
                    documentId: data.id,
                    sections: matrix.sections.map(section => ({
                        id: section.id,
                        itemNumber: section.itemNumber,
                        details: section.details,
                        complianceStatusId: section.complianceStatus.id,
                        comment: section.comment,
                        recommendation: section.recommendation,
                        matrixId: matrix.id,
                    })),
                })),
            };

            setSelectedDocument(dto);
            setModalOpen(true);
        } catch (error) {
            message.error('Error fetching document details.');
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getComplianceDocumentById(id);
            setViewDocument(data);
            setViewModalOpen(true);
        } catch (error) {
            message.error('Error fetching document details.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteComplianceDocument(id);
            message.success('Document deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting document.');
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    const handleRowSelection = (id: string) => {
        setSelectedRowId(id);
    };

    const handleAddSectors = () => {
        setMatrixModalOpen(true);
    };

    const getRowMenuItems = (record: ComplianceDocumentPojo) => [
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
        {
            title: 'Select',
            key: 'select',
            render: (_: any, record: ComplianceDocumentPojo) => (
                <Radio
                    checked={record.id === selectedRowId}
                    onChange={() => handleRowSelection(record.id)}
                />
            ),
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Year', dataIndex: 'year', key: 'year' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: ComplianceDocumentPojo) => (
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
            <Input placeholder="Search" onChange={handleSearchChange} prefix={<SearchOutlined />} />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add New Document</Button>
            <Button type="primary" style={{ marginLeft: 10 }} disabled={!selectedRowId} onClick={handleAddSectors}>Add regulatory compliance matrix  </Button>

            {errorState && (
                <ErrorDisplayAlert errorState={{ message: errorState, description: '', errors: [], refId: null }} onClose={() => setErrorState(null)} />
            )}

            {loading ? (
                <Skeleton active />
            ) : (
                <Table columns={columns} dataSource={dataSource} pagination={pagination} loading={loading} rowKey="id" onChange={handleTableChange} />
            )}

            <AddEditComplianceDocumentModal visible={modalOpen} initialValues={selectedDocument || undefined} onSubmit={async (values: ComplianceDocumentDTO) => { if (selectedDocument?.id) { await updateComplianceDocument(selectedDocument.id, values); } else { await addComplianceDocument(values); } fetchData(pagination.current, pagination.pageSize, searchKeyword); setModalOpen(false); }} onCancel={() => setModalOpen(false)} />

            <ViewComplianceDocumentModal visible={viewModalOpen} data={viewDocument} onClose={() => setViewModalOpen(false)} />
            <AddEditComplianceMatrixFormModal
                visible={matrixModalOpen}
                onSubmit={async (values) => {
                    console.log('Submitted values:', values);
                }}
                onCancel={() => setMatrixModalOpen(false)}
                context="individual" // Added context prop
            />
        </div>
    );
};

export default ComplianceDocumentTable;
