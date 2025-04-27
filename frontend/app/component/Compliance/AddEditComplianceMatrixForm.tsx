import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Modal, Card } from 'antd';
import {
    RegulatoryComplianceMatrixDTO,
    RegulatoryComplianceMatrixSectionDTO,
    ComplianceStatusDTO,
    Department,
    ErrorState,
} from '@/app/types/api';
import { getDepartments } from '@/app/services/api/departmentApi';
import {
    addComplianceDocument,
    updateComplianceDocument,
} from '@/app/services/api/complianceDocumentApi';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import ComplianceMatrixSectionListTable from './ComplianceMatrixSectionListTable';

interface AddEditComplianceMatrixFormProps {
    initialValues?: Partial<RegulatoryComplianceMatrixDTO>;
    onSubmit: (values: Partial<RegulatoryComplianceMatrixDTO>) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    context: 'individual' | 'table'; // Added context
}

const AddEditComplianceMatrixForm = forwardRef<any, AddEditComplianceMatrixFormProps>(
    ({ initialValues, onSubmit, onCancel, loading = false, context }, ref) => {
        const [form] = Form.useForm();
        const [errorState, setErrorState] = useState<ErrorState | null>(null);
        const [departments, setDepartments] = useState<Department[]>([]);
        const [fetching, setFetching] = useState(false);

        // State for sections
        const [sections, setSections] = useState<RegulatoryComplianceMatrixSectionDTO[]>(
            initialValues?.sections || []
        );

        // Fetch dropdown data for departments
        const fetchDropdownData = async () => {
            try {
                setFetching(true);
                const deptData = await getDepartments(); // Fetch departments
                setDepartments(deptData);
            } catch (error) {
                message.error('Failed to fetch dropdown data!');
            } finally {
                setFetching(false);
            }
        };

        // Initialize dropdown data
        useEffect(() => {
            fetchDropdownData();
        }, []);

        // Reset form values when initialValues change
        useEffect(() => {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        }, [initialValues, form]);

        // Handle form submission
        const handleFinish = async (values: Partial<RegulatoryComplianceMatrixDTO>) => {
            setErrorState(null);
            try {
                const updatedValues: Partial<RegulatoryComplianceMatrixDTO> = {
                    ...values,
                    sections: sections.map(section => ({
                        ...section,
                        matrixId: initialValues?.id || '',
                    })),
                };

                console.log(initialValues)
                console.log(context)

                // Context-based submission logic
                if (context === 'individual') {
                    if (initialValues?.id) {
                        // Update existing document
                        await updateComplianceDocument(initialValues.id, updatedValues);
                        message.success('Compliance Matrix updated successfully!');
                    } else {
                        // Add new document
                        await addComplianceDocument(updatedValues as any); // Cast to ComplianceDocumentDTO
                        message.success('Compliance Matrix added successfully!');
                    }
                } else {
                    // Submit via table
                    await onSubmit(updatedValues);
                }
            } catch (error) {
                handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
                message.error('Error saving compliance matrix!');
            }
        };

        // Handle Cancel
        const handleCancel = () => {
            if (form.isFieldsTouched()) {
                Modal.confirm({
                    title: 'Discard Changes?',
                    content: 'You have unsaved changes. Are you sure you want to close the form?',
                    okText: 'Yes',
                    cancelText: 'No',
                    onOk: onCancel,
                });
            } else {
                onCancel();
            }
        };

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            submit: () => form.submit(),
            handleCancel: () => handleCancel(),
        }));

        return (
            <>
                {fetching ? (
                    <Skeleton active />
                ) : (
                    <Form
                        layout="vertical"
                        form={form}
                        initialValues={initialValues}
                        name="add_edit_compliance_matrix_form"
                        onFinish={handleFinish}
                    >
                        {/* Error Display */}
                        {errorState && (
                            <ErrorDisplayAlert
                                errorState={errorState}
                                onClose={() => setErrorState(null)}
                            />
                        )}

                        {/* Form Fields */}
                        <Form.Item
                            name="itemNumber"
                            label="Item Number"
                            rules={[{ required: true, message: 'Item Number is required!' }]}
                        >
                            <Input placeholder="Enter item number" />
                        </Form.Item>

                        <Form.Item
                            name="details"
                            label="Details"
                            rules={[{ required: true, message: 'Details are required!' }]}
                        >
                            <Input.TextArea placeholder="Enter details" rows={4} />
                        </Form.Item>

                        <Form.Item
                            name="departmentId"
                            label="Department"
                            rules={[{ required: true, message: 'Department is required!' }]}
                        >
                            <Select placeholder="Select a department">
                                {departments.map((dept) => (
                                    <Select.Option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Card size="small" title="Sections">
                            <ComplianceMatrixSectionListTable
                                matrixId={initialValues?.id || ''}
                                sections={sections}
                                onChange={setSections}
                            />
                        </Card>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues?.id ? 'Update Matrix' : 'Add Matrix'}
                            </Button>
                            <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </>
        );
    }
);

export default AddEditComplianceMatrixForm;