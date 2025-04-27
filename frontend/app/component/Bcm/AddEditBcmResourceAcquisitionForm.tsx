import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Checkbox, Skeleton, message, Modal } from 'antd';
import { BcmResourceAcquisitionDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmResourceAcquisitionFormProps {
    initialValues?: Partial<BcmResourceAcquisitionDTO>;
    onSubmit: (values: BcmResourceAcquisitionDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmResourceAcquisitionForm: React.ForwardRefRenderFunction<any, AddEditBcmResourceAcquisitionFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
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

    // Handle form submission
    const handleFinish = async (values: BcmResourceAcquisitionDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Resource Acquisition saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the resource acquisition.');
        }
    };

    // Handle form cancellation
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

    // Expose methods for parent component to call
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
                    name="add_edit_bcm_resource_acquisition_form"
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
                        name="resource"
                        label="Resource Name"
                        rules={[
                            { required: true, message: 'Resource name is required!' },
                            { min: 3, max: 255, message: 'Resource name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter resource name" />
                    </Form.Item>

                    <Form.Item
                        name="qtyNeeded"
                        label="Quantity Needed"
                        rules={[
                            { required: true, message: 'Quantity needed is required!' },
                            { type: 'number', min: 0, message: 'Quantity cannot be negative!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter quantity needed" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="qtyAvailable"
                        label="Quantity Available"
                        rules={[
                            { required: true, message: 'Quantity available is required!' },
                            { type: 'number', min: 0, message: 'Quantity cannot be negative!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter quantity available" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="qtyToGet"
                        label="Quantity To Get"
                        rules={[
                            { required: true, message: 'Quantity to get is required!' },
                            { type: 'number', min: 0, message: 'Quantity cannot be negative!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter quantity to get" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="source"
                        label="Source"
                        rules={[{ max: 255, message: 'Source cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter source (optional)" />
                    </Form.Item>

                    <Form.Item
                        name="done"
                        label="Completed"
                        valuePropName="checked"
                        rules={[{ required: true, message: 'Completion status is required!' }]}
                    >
                        <Checkbox>Mark as Done</Checkbox>
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

export default forwardRef(AddEditBcmResourceAcquisitionForm);
