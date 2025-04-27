import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, DatePicker, Button, Skeleton, Select, Modal, message } from 'antd';
import { BusinessProcessDTO, SimplifiedFundObjectivePojo, SimplifiedDepartmentPojo } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import dayjs from 'dayjs';

interface AddEditBusinessProcessFormProps {
    initialValues?: Partial<BusinessProcessDTO>;
    fundObjectives: SimplifiedFundObjectivePojo[]; // Dropdown options for Fund Objectives
    departments: SimplifiedDepartmentPojo[]; // Dropdown options for Departments
    onSubmit: (values: BusinessProcessDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBusinessProcessForm: React.ForwardRefRenderFunction<any, AddEditBusinessProcessFormProps> = (
    { initialValues, fundObjectives, departments, onSubmit, onCancel, loading = false, showActionButtons = true },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form when initialValues change
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
            const formattedValues: BusinessProcessDTO = {
                ...values,
                startDateTime: values.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
                endDateTime: values.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
            };
            await onSubmit(formattedValues);
            message.success('Business Process saved successfully!');
        } catch (error) {
            setErrorState({
                message: 'Error saving Business Process.',
                description: 'Please ensure all fields are correctly filled.',
                errors: [],
            });
            message.error('Error saving Business Process.');
        }
    };

    // Handle cancel with confirmation
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
                    name="add_edit_business_process_form"
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
                        name="fundObjectiveId"
                        label="Fund Objective"
                        rules={[{ required: true, message: 'Fund Objective is required!' }]}
                    >
                        <Select placeholder="Select Fund Objective">
                            {fundObjectives.map((objective) => (
                                <Select.Option key={objective.id} value={objective.id}>
                                    {objective.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="businessProcessOwnerDepartmentId"
                        label="Owner Department"
                        rules={[{ required: true, message: 'Owner Department is required!' }]}
                    >
                        <Select placeholder="Select Department">
                            {departments.map((department) => (
                                <Select.Option key={department.id} value={department.id}>
                                    {department.name}
                                </Select.Option>
                            ))}
                        </Select>
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
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Process' : 'Add New Process'}
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

export default forwardRef(AddEditBusinessProcessForm);
