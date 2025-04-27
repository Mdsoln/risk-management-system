import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Modal } from 'antd';
import {
    RegulatoryComplianceMatrixSectionDTO,
    ComplianceStatusDTO,
    ErrorState,
} from '@/app/types/api';
import { getComplianceStatuses } from '@/app/services/api/ComplianceStatusApi';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditComplianceMatrixSectionFormProps {
    initialValues?: Partial<RegulatoryComplianceMatrixSectionDTO>;
    matrixId: string; // Required for automatic association
    onSubmit: (values: RegulatoryComplianceMatrixSectionDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

const AddEditComplianceMatrixSectionForm: React.FC<AddEditComplianceMatrixSectionFormProps> = ({
    initialValues,
    matrixId,
    onSubmit,
    onCancel,
    loading,
}) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [statuses, setStatuses] = useState<ComplianceStatusDTO[]>([]);
    const [fetching, setFetching] = useState(false);

    // Fetch compliance statuses
    const fetchDropdownData = async () => {
        try {
            setFetching(true);
            const statusData = await getComplianceStatuses();
            setStatuses(statusData);
        } catch (error) {
            message.error('Failed to fetch compliance statuses!');
        } finally {
            setFetching(false);
        }
    };

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
    const handleFinish = async (values: RegulatoryComplianceMatrixSectionDTO) => {
        setErrorState(null);
        try {
            const updatedValues: RegulatoryComplianceMatrixSectionDTO = {
                ...values,
                matrixId, // Automatically associate matrix ID
            };
            await onSubmit(updatedValues);
            message.success('Section saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Error saving section!');
        }
    };

    // Close modal with confirmation for unsaved changes
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

    return (
        <>
            {fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_compliance_matrix_section_form"
                    onFinish={handleFinish}
                >
                    {/* Error Display */}
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />}

                    {/* Form Fields */}
                    <Form.Item
                        name="itemNumber"
                        label="Item Number"
                        rules={[
                            { required: true, message: 'Item Number is required!' },
                            { min: 1, max: 50, message: 'Item number must be between 1 and 50 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter item number" />
                    </Form.Item>

                    <Form.Item
                        name="details"
                        label="Details"
                        rules={[
                            { required: true, message: 'Details are required!' },
                            { min: 10, max: 5000, message: 'Details must be between 10 and 5000 characters!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter details" rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="complianceStatusId"
                        label="Compliance Status"
                        rules={[{ required: true, message: 'Compliance Status is required!' }]}
                    >
                        <Select placeholder="Select a compliance status">
                            {statuses.map((status) => (
                                <Select.Option key={status.id} value={status.id}>
                                    {status.statusName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ max: 5000, message: 'Comment cannot exceed 5000 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter comments (optional)" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="recommendation"
                        label="Recommendation"
                        rules={[{ max: 5000, message: 'Recommendation cannot exceed 5000 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter recommendations (optional)" rows={3} />
                    </Form.Item>

                    {/* Hidden field for matrixId */}
                    <Form.Item name="matrixId" hidden initialValue={matrixId}>
                        <Input />
                    </Form.Item>

                    {/* Action Buttons */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {initialValues?.id ? 'Update Section' : 'Add Section'}
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default AddEditComplianceMatrixSectionForm;
