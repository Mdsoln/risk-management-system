import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { RiskIndicatorActionPlanMonitoringDto, Measurement, ErrorState } from '@/app/types/api';
import { getMeasurements } from '@/app/services/api/measurementApi';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import moment, { Moment } from 'moment';

const { Option } = Select;

interface AddEditRiskIndicatorActionPlanMonitoringFormProps {
    initialValues?: Partial<RiskIndicatorActionPlanMonitoringDto>;
    onSubmit: (values: Partial<RiskIndicatorActionPlanMonitoringDto>) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

const AddEditRiskIndicatorActionPlanMonitoringForm: React.FC<AddEditRiskIndicatorActionPlanMonitoringFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    loading,
}) => {
    const [form] = Form.useForm();
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const measurementsData = await getMeasurements();
                setMeasurements(measurementsData);
            } catch (error) {
                message.error('Failed to fetch measurements');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                startDatetime: initialValues.startDatetime ? moment(initialValues.startDatetime) : null,
                endDatetime: initialValues.endDatetime ? moment(initialValues.endDatetime) : null,
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Partial<RiskIndicatorActionPlanMonitoringDto>) => {
        setErrorState(null);
        try {
            if (!values.measurementId || !values.value || !values.startDatetime || !values.endDatetime) {
                message.error('Please fill in all required fields.');
                return;
            }

            const startDatetime = moment.isMoment(values.startDatetime)
                ? values.startDatetime.format('YYYY-MM-DD HH:mm:ss.SSSSS')
                : values.startDatetime;

            const endDatetime = moment.isMoment(values.endDatetime)
                ? values.endDatetime.format('YYYY-MM-DD HH:mm:ss.SSSSS')
                : values.endDatetime;

            const sanitizedValues: RiskIndicatorActionPlanMonitoringDto = {
                id: initialValues?.id,
                measurementId: values.measurementId!,
                value: values.value!,
                startDatetime: startDatetime as string,
                endDatetime: endDatetime as string,
                riskIndicatorActionPlanId: initialValues?.riskIndicatorActionPlanId!,
            };

            await onSubmit(sanitizedValues);
            message.success('Monitoring record saved successfully');
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Unexpected error occurred while saving monitoring record');
        }
    };

    const handleCloseErrorAlert = () => {
        setErrorState(null);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="add_edit_risk_indicator_action_plan_monitoring_form"
            onFinish={handleFinish}
        >
            <Form.Item
                name="measurementId"
                label="Measurement"
                rules={[{ required: true, message: 'Please select the measurement!' }]}
            >
                <Select placeholder="Select a measurement">
                    {measurements.map((measurement) => (
                        <Option key={measurement.id} value={measurement.id}>
                            {measurement.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="value"
                label="Value"
                rules={[{ required: true, message: 'Please enter the value!' }]}
            >
                <Input placeholder="Enter value" />
            </Form.Item>
            <Form.Item
                name="startDatetime"
                label="Start Datetime"
                rules={[{ required: true, message: 'Please select the start datetime!' }]}
            >
                <DatePicker
                    showTime
                    placeholder="Select start datetime"
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                name="endDatetime"
                label="End Datetime"
                rules={[{ required: true, message: 'Please select the end datetime!' }]}
            >
                <DatePicker
                    showTime
                    placeholder="Select end datetime"
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {initialValues?.id ? 'Update' : 'Add'}
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: '8px' }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEditRiskIndicatorActionPlanMonitoringForm;
