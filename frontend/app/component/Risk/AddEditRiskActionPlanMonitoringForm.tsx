import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { RiskActionPlanMonitoringDto } from '@/app/types/api';

interface AddEditRiskActionPlanMonitoringFormProps {
    initialValues?: Partial<RiskActionPlanMonitoringDto>;
    onSubmit: (values: Partial<RiskActionPlanMonitoringDto>) => void;
    onCancel: () => void;
}

const AddEditRiskActionPlanMonitoringForm: React.ForwardRefRenderFunction<any, AddEditRiskActionPlanMonitoringFormProps> = (
    { initialValues, onSubmit, onCancel },
    ref
) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                monitoringDatetime: initialValues.monitoringDatetime ? moment(initialValues.monitoringDatetime) : null,
            });
        }
    }, [initialValues, form]);

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        handleCancel: () => {
            onCancel();
        },
    }));

    const handleFinish = (values: Partial<RiskActionPlanMonitoringDto>) => {
        onSubmit({
            ...values,
            monitoringDatetime: values.monitoringDatetime ? moment(values.monitoringDatetime).toISOString() : undefined,
        });
    };


    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
        >
            <Form.Item
                name="comment"
                label="Comment"
                rules={[{ required: true, message: 'Please input the comment!' }]}
            >
                <Input.TextArea maxLength={5000} placeholder="Enter your comment" />
            </Form.Item>

            <Form.Item
                name="monitoringDatetime"
                label="Monitoring Datetime"
                rules={[{ required: true, message: 'Please select the monitoring datetime!' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues?.id ? 'Update Monitoring' : 'Add Monitoring'}
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: '8px' }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default forwardRef(AddEditRiskActionPlanMonitoringForm);
