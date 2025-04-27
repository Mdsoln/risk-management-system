import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, DatePicker, Button, Skeleton, message, Modal } from 'antd';
import { FundObjectiveDTO } from '@/app/types/api';
import dayjs from 'dayjs';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditFundObjectiveFormProps {
    initialValues?: Partial<FundObjectiveDTO>;
    onSubmit: (values: FundObjectiveDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditFundObjectiveForm: React.ForwardRefRenderFunction<any, AddEditFundObjectiveFormProps> = (
    { initialValues, onSubmit, onCancel, loading = false, showActionButtons = true },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form fields when initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                startDateTime: initialValues.startDateTime ? dayjs(initialValues.startDateTime) : undefined,
                endDateTime: initialValues.endDateTime ? dayjs(initialValues.endDateTime) : undefined,
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit handler
    const handleFinish = async (values: any) => {
        setErrorState(null);
        try {
            // Format and submit date values
            const formattedValues: FundObjectiveDTO = {
                ...values,
                startDateTime: values.startDateTime?.format('YYYY-MM-DD HH:mm:ss'),
                endDateTime: values.endDateTime?.format('YYYY-MM-DD HH:mm:ss'),
            };
            await onSubmit(formattedValues);
            message.success('Fund Objective saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving Fund Objective.');
        }
    };

    // Cancel handler with confirmation
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

    // Expose submit and cancel methods for parent components
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
                    name="add_edit_fund_objective_form"
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
                            { max: 255, message: 'Name cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Description is required!' },
                            { min: 3, message: 'Description must be at least 3 characters long!' },
                            { max: 5000, message: 'Description cannot exceed 5000 characters!' },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter description" />
                    </Form.Item>

                    <Form.Item
                        name="startDateTime"
                        label="Start Date and Time"
                        rules={[{ required: true, message: 'Start Date and Time is required!' }]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                            placeholder="Select start date and time"
                        />
                    </Form.Item>

                    <Form.Item
                        name="endDateTime"
                        label="End Date and Time"
                        rules={[
                            { required: true, message: 'End Date and Time is required!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.isAfter(getFieldValue('startDateTime'))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('End Date must be after Start Date!'));
                                },
                            }),
                        ]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                            placeholder="Select end date and time"
                        />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                                {initialValues ? 'Update Objective' : 'Add New Objective'}
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

export default forwardRef(AddEditFundObjectiveForm);
