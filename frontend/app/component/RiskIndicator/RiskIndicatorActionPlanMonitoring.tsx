import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Skeleton, message, DatePicker } from 'antd';
import { RiskIndicatorActionPlanMonitoringDto, Measurement, ErrorState } from '@/app/types/api';
import { getMeasurements } from '@/app/services/api/measurementApi';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

const { Option } = Select;

interface AddEditRiskIndicatorActionPlanMonitoringFormProps {
    initialValues?: Partial<RiskIndicatorActionPlanMonitoringDto>;
    onSubmit: (values: Partial<RiskIndicatorActionPlanMonitoringDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
}

const AddEditRiskIndicatorActionPlanMonitoringForm: React.FC<AddEditRiskIndicatorActionPlanMonitoringFormProps> = ({ initialValues, onSubmit, onCancel, context, loading }) => {
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [value, setValue] = useState(initialValues?.value || '');

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
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                startDatetime: initialValues.startDatetime,
                endDatetime: initialValues.endDatetime,
                value: initialValues.value,
                measurementId: initialValues.measurementId,
            });
            setFetching(false);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Partial<RiskIndicatorActionPlanMonitoringDto>) => {
        setErrorState(null);
        try {
            if (!values.startDatetime || !values.endDatetime || !value || !values.measurementId) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: RiskIndicatorActionPlanMonitoringDto = {
                id: initialValues?.id,
                startDatetime: values.startDatetime!,
                endDatetime: values.endDatetime!,
                value: value,
                measurementId: values.measurementId!,
                riskIndicatorActionPlanId: initialValues?.riskIndicatorActionPlanId!,
            };

            await onSubmit(sanitizedValues);
        } catch (error: any) {
            //setErrorState({ message: 'Unexpected error occurred while saving Monitoring entry', errors: [] });
            message.error('Unexpected error occurred while saving Monitoring entry');
        }
    };

    const handleCloseErrorAlert = () => {
        setErrorState(null);
    };

    return (
        <>
            {fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    form={form}
                    initialValues={initialValues}
                    layout="vertical"
                    name="add_edit_risk_indicator_action_plan_monitoring_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

                    <Form.Item
                        name="startDatetime"
                        label="Start Date and Time"
                        rules={[{ required: true, message: 'Please select the start date and time!' }]}
                    >
                        <DatePicker showTime placeholder="Select start date and time" />
                    </Form.Item>

                    <Form.Item
                        name="endDatetime"
                        label="End Date and Time"
                        rules={[{ required: true, message: 'Please select the end date and time!' }]}
                    >
                        <DatePicker showTime placeholder="Select end date and time" />
                    </Form.Item>

                    <Form.Item
                        name="measurementId"
                        label="Measurement"
                        rules={[{ required: true, message: 'Please select the measurement!' }]}
                    >
                        <Select placeholder="Select a measurement">
                            {measurements.map(measurement => (
                                <Option key={measurement.id} value={measurement.id}>
                                    {measurement.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Please enter a value!' }]}
                    >
                        <Input.TextArea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
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
            )}
        </>
    );
};

export default AddEditRiskIndicatorActionPlanMonitoringForm;
