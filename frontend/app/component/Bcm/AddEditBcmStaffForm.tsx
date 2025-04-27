import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, Skeleton, Modal, message } from 'antd';
import { BcmStaffDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmStaffFormProps {
    initialValues?: Partial<BcmStaffDTO>;
    onSubmit: (values: BcmStaffDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmStaffForm: React.ForwardRefRenderFunction<any, AddEditBcmStaffFormProps> = (
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
    const handleFinish = async (values: BcmStaffDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Staff saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving staff details.');
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

    // Imperative handle for parent components
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
                    name="add_edit_bcm_staff_form"
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
                        label="Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            { required: true, message: 'Role is required!' },
                            { max: 255, message: 'Role cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter role" />
                    </Form.Item>

                    <Form.Item
                        name="mobileNumber"
                        label="Mobile Number"
                        rules={[
                            { required: true, message: 'Mobile number is required!' },
                            { max: 15, message: 'Mobile number cannot exceed 15 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter mobile number" />
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
                        name="alternateContactPerson"
                        label="Alternate Contact Person"
                        rules={[{ max: 255, message: 'Alternate contact cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter alternate contact person" />
                    </Form.Item>

                    <Form.Item
                        name="alternateLocation"
                        label="Alternate Location"
                        rules={[{ max: 255, message: 'Alternate location cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter alternate location" />
                    </Form.Item>

                    <Form.Item
                        name="nextOfKin"
                        label="Next of Kin"
                        rules={[{ max: 255, message: 'Next of kin cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter next of kin" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Staff' : 'Add New Staff'}
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

export default forwardRef(AddEditBcmStaffForm);
