import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExpandOutlined } from '@ant-design/icons';
import { RegulatoryComplianceMatrixDTO, RegulatoryComplianceMatrixSectionDTO } from '@/app/types/api';
import AddEditComplianceMatrixForm from './AddEditComplianceMatrixForm';
import ComplianceMatrixSectionListTable from './ComplianceMatrixSectionListTable';

interface ComplianceMatrixListTableProps {
    matrices: RegulatoryComplianceMatrixDTO[];
    onChange: (matrices: RegulatoryComplianceMatrixDTO[]) => void;
}

const ComplianceMatrixListTable: React.FC<ComplianceMatrixListTableProps> = ({ matrices, onChange }) => {
    // Matrix modal states
    const [isMatrixModalVisible, setIsMatrixModalVisible] = useState(false);
    const [editingMatrix, setEditingMatrix] = useState<RegulatoryComplianceMatrixDTO | null>(null);

    // Section modal states
    const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
    const [editingSections, setEditingSections] = useState<RegulatoryComplianceMatrixSectionDTO[] | []>([]);
    const [currentMatrixId, setCurrentMatrixId] = useState<string | null>(null);

    // Open modal for adding a new matrix
    const handleAddMatrix = () => {
        setEditingMatrix(null);
        setIsMatrixModalVisible(true);
    };

    // Open modal for editing an existing matrix
    const handleEditMatrix = (record: RegulatoryComplianceMatrixDTO) => {
        setEditingMatrix(record);
        setIsMatrixModalVisible(true);
    };

    // Open modal for managing sections within a matrix
    const handleEditSections = (matrixId: string, sections: RegulatoryComplianceMatrixSectionDTO[]) => {
        setCurrentMatrixId(matrixId);
        setEditingSections(sections || []);
        setIsSectionModalVisible(true);
    };

    // Delete a matrix
    const handleDeleteMatrix = (id: string) => {
        const updatedMatrices = matrices.filter(item => item.id !== id);
        onChange(updatedMatrices);
        message.success('Matrix deleted successfully!');
    };

    // Handle add/edit matrix submission
    const handleMatrixModalOk = async (values: Partial<RegulatoryComplianceMatrixDTO>) => {
        if (editingMatrix) {
            // Update the existing matrix
            const updatedMatrices = matrices.map(item =>
                item.id === editingMatrix.id ? { ...editingMatrix, ...values } : item
            );
            onChange(updatedMatrices);
        } else {
            // Add new matrix with default properties
            const newMatrix: RegulatoryComplianceMatrixDTO = {
                id: `${Date.now()}`, // Generate unique ID
                itemNumber: values.itemNumber || '', // Ensure required fields are present
                details: values.details || '',
                departmentId: values.departmentId || '',
                documentId: values.documentId || '',
                sections: values.sections || [],
            };
            onChange([...matrices, newMatrix]);
        }

        setIsMatrixModalVisible(false);
    };


    // Handle section updates
    const handleSectionsUpdate = (sections: RegulatoryComplianceMatrixSectionDTO[]) => {
        const updatedMatrices = matrices.map(matrix =>
            matrix.id === currentMatrixId ? { ...matrix, sections } : matrix
        );
        onChange(updatedMatrices);
        setIsSectionModalVisible(false);
    };

    // Close modals
    const handleMatrixModalCancel = () => setIsMatrixModalVisible(false);
    const handleSectionsModalCancel = () => setIsSectionModalVisible(false);

    // Table columns (Fixed to match type definitions)
    const columns = [
        {
            title: 'Item Number',
            dataIndex: 'itemNumber',
            key: 'itemNumber',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: 'Sections',
            key: 'sections',
            render: (_: any, record: RegulatoryComplianceMatrixDTO) => (
                <Button
                    icon={<ExpandOutlined />}
                    onClick={() => handleEditSections(record.id!, record.sections || [])}
                >
                    Manage Sections ({record.sections?.length || 0})
                </Button>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RegulatoryComplianceMatrixDTO) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditMatrix(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteMatrix(record.id!)}
                        danger
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddMatrix}
                style={{ marginBottom: 16 }}
            >
                Add Matrix
            </Button>

            <Table
                columns={columns}
                dataSource={matrices}
                rowKey="id"
                pagination={false}
            />

            {/* Add/Edit Matrix Modal */}
            <Modal
                title={editingMatrix ? 'Edit Matrix' : 'Add Matrix'}
                open={isMatrixModalVisible}
                onCancel={handleMatrixModalCancel}
                footer={null}
            >
                <AddEditComplianceMatrixForm
                    initialValues={{
                        itemNumber: editingMatrix?.itemNumber || '',
                        details: editingMatrix?.details || '',
                        departmentId: editingMatrix?.departmentId || '',
                        documentId: editingMatrix?.documentId || '',
                        sections: editingMatrix?.sections || [],
                    }}
                    onSubmit={handleMatrixModalOk}
                    onCancel={handleMatrixModalCancel}
                    context="table" // <-- Change to 'table' if needed
                />

            </Modal>

            {/* Manage Sections Modal */}
            <Modal
                title="Manage Sections"
                open={isSectionModalVisible}
                onCancel={handleSectionsModalCancel}
                footer={null}
            >
                <ComplianceMatrixSectionListTable
                    sections={editingSections}
                    matrixId={currentMatrixId!} // Pass matrixId explicitly
                    onChange={handleSectionsUpdate}
                />
            </Modal>
        </>
    );
};

export default ComplianceMatrixListTable;
