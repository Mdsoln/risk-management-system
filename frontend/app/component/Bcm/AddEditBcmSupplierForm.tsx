import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, Skeleton, message, Modal } from 'antd';
import { BcmSupplierDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmSupplierFormProps {
    initialValues?: Partial<BcmSupplierDTO>;
    onSubmit: (values: BcmSupplierDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmSupplierForm: React.ForwardRefRenderFunction<any, AddEditBcmSupplierFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form when initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form
    const handleFinish = async (values: BcmSupplierDTO) => {
        setErrorState(null); // Clear previous errors
        try {
            await onSubmit(values); // Call parent submit function
            message.success('Supplier saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the supplier.');
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

    // Expose form actions to parent component
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
                    name="add_edit_bcm_supplier_form"
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
                        name="name"
                        label="Supplier Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter supplier name" />
                    </Form.Item>

                    <Form.Item
                        name="phoneWork"
                        label="Work Phone"
                        rules={[
                            { max: 15, message: 'Phone number cannot exceed 15 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter work phone number" />
                    </Form.Item>

                    <Form.Item
                        name="phoneHome"
                        label="Home Phone"
                        rules={[
                            { max: 15, message: 'Phone number cannot exceed 15 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter home phone number" />
                    </Form.Item>

                    <Form.Item
                        name="phoneMobile"
                        label="Mobile Phone"
                        rules={[
                            { max: 15, message: 'Phone number cannot exceed 15 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter mobile phone number" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { max: 500, message: 'Description cannot exceed 500 characters!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter description" rows={4} />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Supplier' : 'Add New Supplier'}
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

export default forwardRef(AddEditBcmSupplierForm);
