import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RegulatoryComplianceMatrixSectionDTO } from '@/app/types/api';
import AddEditComplianceMatrixSectionForm from './AddEditComplianceMatrixSectionForm';

interface ComplianceMatrixSectionListTableProps {
    sections: RegulatoryComplianceMatrixSectionDTO[];
    matrixId: string; // Pass matrixId to associate sections with the matrix
    onChange: (sections: RegulatoryComplianceMatrixSectionDTO[]) => void;
}

const ComplianceMatrixSectionListTable: React.FC<ComplianceMatrixSectionListTableProps> = ({
    sections,
    matrixId,
    onChange,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSection, setEditingSection] = useState<RegulatoryComplianceMatrixSectionDTO | null>(null);

    // Open modal for adding a new section
    const handleAdd = () => {
        setEditingSection(null);
        setIsModalVisible(true);
    };

    // Open modal for editing an existing section
    const handleEdit = (record: RegulatoryComplianceMatrixSectionDTO) => {
        setEditingSection(record);
        setIsModalVisible(true);
    };

    // Delete a section from the list
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this section?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                const updatedSections = sections.filter((item) => item.id !== id);
                onChange(updatedSections);
                message.success('Section deleted successfully.');
            },
        });
    };

    // Handle form submission for add/edit
    const handleModalOk = async (values: RegulatoryComplianceMatrixSectionDTO) => {
        if (editingSection) {
            // Update existing section
            const updatedSections = sections.map((item) =>
                item.id === editingSection.id ? { ...editingSection, ...values } : item
            );
            onChange(updatedSections);
        } else {
            // Add new section with matrixId
            const newSection = { ...values, id: `${Date.now()}`, matrixId }; // Include matrixId
            onChange([...sections, newSection]);
        }

        setIsModalVisible(false);
    };

    // Close the modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    // Table Columns (fixed to match DTO fields)
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
            title: 'Compliance Status',
            dataIndex: ['complianceStatus', 'statusName'], // Display compliance status name
            key: 'complianceStatus',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RegulatoryComplianceMatrixSectionDTO) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id!)}
                        danger
                    />
                </>
            ),
        },
    ];

    return (
        <>
            {/* Add Section Button */}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Add Section
            </Button>

            {/* Table to list sections */}
            <Table
                columns={columns}
                dataSource={sections}
                rowKey="id"
                pagination={false}
            />

            {/* Modal for Add/Edit Section */}
            <Modal
                title={editingSection ? 'Edit Section' : 'Add Section'}
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <AddEditComplianceMatrixSectionForm
                    initialValues={editingSection || {}}
                    matrixId={matrixId} // Pass matrixId for association
                    onSubmit={handleModalOk}
                    onCancel={handleModalCancel}
                />
            </Modal>
        </>
    );
};

export default ComplianceMatrixSectionListTable;
