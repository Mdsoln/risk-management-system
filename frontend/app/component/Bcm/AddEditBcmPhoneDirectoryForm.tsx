import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { Form, Input, Button, Modal, message, Skeleton } from 'antd';
import { BcmPhoneDirectoryDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmPhoneDirectoryFormProps {
    initialValues?: Partial<BcmPhoneDirectoryDTO>;
    onSubmit: (values: BcmPhoneDirectoryDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmPhoneDirectoryForm: React.ForwardRefRenderFunction<
    any,
    AddEditBcmPhoneDirectoryFormProps
> = ({ initialValues, onSubmit, onCancel, loading = false, showActionButtons = true }, ref) => {
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

    // Submit handler
    const handleFinish = async (values: BcmPhoneDirectoryDTO) => {
        setErrorState(null); // Clear previous errors
        try {
            await onSubmit(values); // Submit data
            message.success('Phone directory entry saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving phone directory entry.');
        }
    };

    // Cancel handler
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            Modal.confirm({
                title: 'Discard Changes?',
                content: 'You have unsaved changes. Are you sure you want to close?',
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
                    name="add_edit_phone_directory_form"
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
                        name="roleName"
                        label="Role/Name"
                        rules={[
                            { required: true, message: 'Role/Name is required!' },
                            { min: 3, max: 255, message: 'Role/Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter role or name" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            { required: true, message: 'Phone number is required!' },
                            { max: 15, message: 'Phone number cannot exceed 15 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[{ max: 255, message: 'Room cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter room (optional)" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Entry' : 'Add New Entry'}
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

export default forwardRef(AddEditBcmPhoneDirectoryForm);
