import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Form, Input, Button, Skeleton, Modal, message } from 'antd';
import { ComplianceDocumentCategoryDTO } from '@/app/types/api';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

interface AddEditComplianceDocumentCategoryFormProps {
    initialValues?: Partial<ComplianceDocumentCategoryDTO>;
    onSubmit: (values: ComplianceDocumentCategoryDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditComplianceDocumentCategoryForm: React.ForwardRefRenderFunction<any, AddEditComplianceDocumentCategoryFormProps> = (
    { initialValues, onSubmit, onCancel, loading = false, showActionButtons = true },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form when initial values change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Form submit handler
    const handleFinish = async (values: ComplianceDocumentCategoryDTO) => {
        setErrorState(null); // Clear errors
        try {
            await onSubmit(values); // Submit data
            message.success('Document category saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the document category.');
        }
    };

    // Cancel handler
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            Modal.confirm({
                title: 'Discard Changes?',
                content: 'You have unsaved changes. Are you sure you want to close the form? Your data will be lost.',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    form.resetFields();
                    onCancel();
                },
            });
        } else {
            onCancel();
        }
    };

    // Imperative handle for parent components
    useImperativeHandle(ref, () => ({
        submit: () => form.submit(),
        handleCancel: () => handleCancel(),
    }));

    return (
        <>
            {loading ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_compliance_document_category_form"
                    onFinish={handleFinish}
                >
                    {/* Error Display */}
                    {errorState && (
                        <div className="error-display-container">
                            <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />
                        </div>
                    )}

                    {/* Form Fields */}
                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[
                            { required: true, message: 'Code is required!' },
                            { min: 3, max: 50, message: 'Code must be between 3 and 50 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter category code" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter category name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Description is required!' },
                            { min: 10, max: 5000, message: 'Description must be between 10 and 5000 characters!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter category description" rows={4} />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Category' : 'Add New Category'}
                            </Button>
                            <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            )}
        </>
    );
};

export default forwardRef(AddEditComplianceDocumentCategoryForm);
