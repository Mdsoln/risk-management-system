import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Skeleton, message, Modal, Select } from 'antd';
import { StatusReportDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import dayjs from 'dayjs';
import { getDepartments } from '@/app/services/api/departmentApi';

interface AddEditStatusReportFormProps {
    initialValues?: Partial<StatusReportDTO>;
    onSubmit: (values: StatusReportDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditStatusReportForm: React.ForwardRefRenderFunction<any, AddEditStatusReportFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons = true },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);
    const [departments, setDepartments] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    // Fetch departments for dropdown
    const fetchDepartments = async () => {
        try {
            setFetching(true);
            const response = await getDepartments(); // Fetch departments API
            setDepartments(response);
        } catch (error) {
            message.error('Error fetching departments.');
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Reset form when initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                reportDate: initialValues.reportDate ? dayjs(initialValues.reportDate) : undefined,
                reportTime: initialValues.reportTime ? dayjs(initialValues.reportTime, 'HH:mm') : undefined,
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit handler
    const handleFinish = async (values: any) => {
        setErrorState(null);

        try {
            // Format date and time
            const formattedValues: StatusReportDTO = {
                ...values,
                reportDate: values.reportDate.format('YYYY-MM-DD'),
                reportTime: values.reportTime.format('HH:mm'),
            };
            await onSubmit(formattedValues);
            message.success('Status report saved successfully!');
        } catch (error) {
            setErrorState({
                message: 'Error saving the status report.',
                description: 'Please ensure all fields are correctly filled.',
                errors: [],
                refId: null,
            });
            message.error('Error saving status report.');
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

    // Expose methods to parent components
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
            {loading || fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_status_report_form"
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
                        name="departmentId" // Updated field
                        label="Department"
                        rules={[{ required: true, message: 'Department is required!' }]}
                    >
                        <Select placeholder="Select department" loading={fetching}>
                            {departments.map((dept) => (
                                <Select.Option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="reportDate"
                        label="Report Date"
                        rules={[{ required: true, message: 'Report date is required!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Select report date" />
                    </Form.Item>

                    <Form.Item
                        name="reportTime"
                        label="Report Time"
                        rules={[{ required: true, message: 'Report time is required!' }]}
                    >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} placeholder="Select report time" />
                    </Form.Item>

                    <Form.Item name="staff" label="Staff">
                        <Input placeholder="Enter staff details" />
                    </Form.Item>

                    <Form.Item name="customers" label="Customers">
                        <Input placeholder="Enter customer details" />
                    </Form.Item>

                    <Form.Item name="workInProgress" label="Work In Progress">
                        <Input placeholder="Enter work in progress details" />
                    </Form.Item>

                    <Form.Item name="financialImpact" label="Financial Impact">
                        <Input placeholder="Enter financial impact details" />
                    </Form.Item>

                    <Form.Item name="operatingConditions" label="Operating Conditions">
                        <Input placeholder="Enter operating conditions" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Report' : 'Add New Report'}
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

export default forwardRef(AddEditStatusReportForm);
