import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button, DatePicker, message, Row, Col } from 'antd';
import { RiskActionPlanDto } from '@/app/types/api';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;

interface AddEditRiskActionPlanFormProps {
    initialValues?: Partial<RiskActionPlanDto>;
    onSubmit: (values: Partial<RiskActionPlanDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
}

const AddEditRiskActionPlanForm: React.ForwardRefRenderFunction<any, AddEditRiskActionPlanFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    context,
}, ref) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                dateRange: [
                    initialValues.startDatetime ? moment(initialValues.startDatetime) : null,
                    initialValues.endDatetime ? moment(initialValues.endDatetime) : null,
                ] as [Moment, Moment],
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: any) => {
        setLoading(true);
        const [startDatetime, endDatetime] = values.dateRange || [];
        const updatedValues: Partial<RiskActionPlanDto> = {
            ...values,
            startDatetime: startDatetime ? startDatetime.format('YYYY-MM-DDTHH:mm:ss') : '',
            endDatetime: endDatetime ? endDatetime.format('YYYY-MM-DDTHH:mm:ss') : '',
        };

        try {
            await onSubmit(updatedValues);
            if (context === 'table') {
                message.success('Risk Action Plan saved successfully');
            }
        } catch (error) {
            message.error('Failed to save risk action plan');
            console.error('Error saving Risk Action Plan:', error);
        } finally {
            setLoading(false);
        }
    };


    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
    }));

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
        >
            <Form.Item
                name="name"
                label="Action Plan Name"
                rules={[{ required: true, message: 'Please input the action plan name!' }]}
            >
                <Input placeholder="Enter action plan name" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item
                name="dateRange"
                label="Start and End Date"
                rules={[{ required: true, message: 'Please select the start and end date!' }]}
            >
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Button onClick={onCancel} style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>
                </Col>
                <Col span={12}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {initialValues?.id ? 'Update' : 'Add'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default forwardRef(AddEditRiskActionPlanForm);
