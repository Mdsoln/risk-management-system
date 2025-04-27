import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Skeleton, message, Modal } from 'antd';
import { BcmUrgentResourceDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmUrgentResourceFormProps {
    initialValues?: Partial<BcmUrgentResourceDTO>;
    onSubmit: (values: BcmUrgentResourceDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmUrgentResourceForm: React.ForwardRefRenderFunction<any, AddEditBcmUrgentResourceFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form on initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form
    const handleFinish = async (values: BcmUrgentResourceDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Resource saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving the resource.');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            Modal.confirm({
                title: 'Discard Changes?',
                content: 'You have unsaved changes. Are you sure you want to close the form?',
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

    // Expose form actions
    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        handleCancel: () => {
            handleCancel();
        },
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
                    name="add_edit_bcm_urgent_resource_form"
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
                        name="resourceName"
                        label="Resource Name"
                        rules={[
                            { required: true, message: 'Resource Name is required!' },
                            { min: 3, max: 255, message: 'Resource Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter resource name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ max: 500, message: 'Description cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter description" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            { required: true, message: 'Quantity is required!' },
                            { type: 'number', min: 1, message: 'Quantity must be at least 1!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                            { required: true, message: 'Category is required!' },
                            { max: 100, message: 'Category cannot exceed 100 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter category" />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[
                            { required: true, message: 'Location is required!' },
                            { max: 255, message: 'Location cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter location" />
                    </Form.Item>

                    <Form.Item
                        name="responsiblePerson"
                        label="Responsible Person"
                        rules={[{ max: 255, message: 'Responsible Person cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter responsible person" />
                    </Form.Item>

                    <Form.Item
                        name="contactNumber"
                        label="Contact Number"
                        rules={[{ max: 15, message: 'Contact number cannot exceed 15 characters!' }]}
                    >
                        <Input placeholder="Enter contact number" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Resource' : 'Add New Resource'}
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

export default forwardRef(AddEditBcmUrgentResourceForm);
