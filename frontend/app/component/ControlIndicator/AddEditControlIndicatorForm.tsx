import React, { useState, useEffect, ReactNode } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import { addControlIndicator, updateControlIndicator } from '../../services/api/controlIndicatorApi';
import { getMonitoringFrequencies } from '../../services/api/monitoringFrequencyApi';
import { getMeasurements } from '../../services/api/measurementApi';
import { getThresholdCategories } from '../../services/api/thresholdCategoryApi';
import { getComparisonOperators } from '../../services/api/comparisonOperatorApi';
import { ControlIndicatorDto, ErrorState, MonitoringFrequency, Measurement, ControlIndicatorThresholdDto, ComparisonConditionDto, ThresholdCategory, ComparisonOperator } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { checkForErrors, handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

const { Option } = Select;

interface AddEditControlIndicatorFormProps {
    initialValues?: Partial<ControlIndicatorDto>;
    onSubmit: (values: Partial<ControlIndicatorDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
}

const AddEditControlIndicatorForm: React.FC<AddEditControlIndicatorFormProps> = ({ initialValues, onSubmit, onCancel, context, loading }) => {
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [frequencies, setFrequencies] = useState<MonitoringFrequency[]>([]);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [thresholdCategories, setThresholdCategories] = useState<ThresholdCategory[]>([]);
    const [comparisonOperators, setComparisonOperators] = useState<ComparisonOperator[]>([]);
    const [description, setDescription] = useState(initialValues?.description || '');
    const [purpose, setPurpose] = useState(initialValues?.purpose || '');
    const [selectedMeasurement, setSelectedMeasurement] = useState<string | undefined>(initialValues?.measurementId);
    const [controlIndicatorThresholds, setControlIndicatorThresholds] = useState<ControlIndicatorThresholdDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [frequenciesData, measurementsData, thresholdCategoriesData, comparisonOperatorsData] = await Promise.all([
                    getMonitoringFrequencies(),
                    getMeasurements(),
                    getThresholdCategories(),
                    getComparisonOperators(),
                ]);
                setFrequencies(frequenciesData);
                setMeasurements(measurementsData);
                const filteredCategories = thresholdCategoriesData.filter(category => category.code === 'H' || category.code === 'L');
                setThresholdCategories(filteredCategories);
                setComparisonOperators(comparisonOperatorsData);

                if (initialValues) {
                    setControlIndicatorThresholds(
                        (initialValues.controlIndicatorThresholds || []).filter(threshold =>
                            filteredCategories.some(category => category.id === threshold.thresholdCategoryId)
                        )
                    );
                }
            } catch (error) {
                message.error('Failed to fetch data');
            }
        };

        fetchData();
    }, [initialValues]);

    useEffect(() => {
        if (initialValues) {
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                description: initialValues.description,
                purpose: initialValues.purpose,
            });
            setSelectedMeasurement(initialValues.measurementId);
            setFetching(false);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Partial<ControlIndicatorDto>) => {
        console.log("AddEditControlIndicatorForm handleFinish values:", values)
        setErrorState(null);
        try {
            if (
                !values.keyControlIndicator ||
                !description ||
                !purpose ||
                (context === 'individual' && !initialValues?.riskControlId) ||
                !values.monitoringFrequencyId ||
                !selectedMeasurement
            ) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: Omit<ControlIndicatorDto, 'id'> = {
                keyControlIndicator: values.keyControlIndicator!,
                description: description,
                purpose: purpose,
                riskControlId: initialValues?.riskControlId!,
                monitoringFrequencyId: values.monitoringFrequencyId!,
                measurementId: selectedMeasurement!,
                controlIndicatorThresholds: controlIndicatorThresholds.map(threshold => ({
                    ...threshold,
                    comparisonConditions: threshold.comparisonConditions.map(condition => ({
                        ...condition,
                        bound: condition.bound.toString(),
                    }))
                })),
            };

            let response;
            if (context === 'individual') {
                if (initialValues?.id) {
                    response = await updateControlIndicator(initialValues.id, sanitizedValues);
                } else {
                    response = await addControlIndicator(sanitizedValues);
                }

                const result = checkForErrors(response, setErrorState);
                if (result) {
                    await onSubmit(sanitizedValues);
                    message.success('Control Indicator saved successfully');
                }
            } else {
                console.log("AddEditControlIndicatorForm onSubmit sanitizedValues:", sanitizedValues)

                await onSubmit(sanitizedValues);
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Unexpected error occurred while saving Control Indicator');
        }
    };

    const handleCloseErrorAlert = () => {
        setErrorState(null);
    };

    const handleMeasurementChange = (value: string) => {
        setSelectedMeasurement(value);
        setControlIndicatorThresholds(
            thresholdCategories.map(category => ({
                thresholdCategoryId: category.id,
                comparisonConditions: [{ comparisonOperatorId: '', bound: '' }]
            }))
        );
    };

    const handleControlIndicatorThresholdChange = (index: number, value: Partial<ControlIndicatorThresholdDto>) => {
        const newControlIndicatorThresholds = controlIndicatorThresholds.map((controlIndicatorThreshold, i) => (i === index ? { ...controlIndicatorThreshold, ...value } : controlIndicatorThreshold));
        setControlIndicatorThresholds(newControlIndicatorThresholds);
    };

    const handleComparisonConditionChange = (tIndex: number, cIndex: number, value: Partial<ComparisonConditionDto>) => {
        const newControlIndicatorThresholds = controlIndicatorThresholds.map((controlIndicatorThreshold, i) => {
            if (i === tIndex) {
                const newConditions = controlIndicatorThreshold.comparisonConditions.map((condition, j) => (j === cIndex ? { ...condition, ...value } : condition));
                return { ...controlIndicatorThreshold, comparisonConditions: newConditions };
            }
            return controlIndicatorThreshold;
        });
        setControlIndicatorThresholds(newControlIndicatorThresholds);
    };

    const filterOption = (input: string, option?: { children: ReactNode }) => {
        if (option?.children) {
            const childrenText = option.children.toString();
            return childrenText.toLowerCase().includes(input.toLowerCase());
        }
        return false;
    };

    const renderBoundInput = (measurementCode: string, value: string, onChange: (value: string) => void) => {
        switch (measurementCode) {
            case 'COUNT':
            case 'MEMBERS':
            case 'AGE':
            case 'MONEY':
            case 'YEARS':
            case 'AMOUNT':
            case 'DAYS':
            case 'MONTHS':
            case 'QUANTITY':
                return (
                    <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
                );
            case 'RATIO':
                return (
                    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="x:y" />
                );
            case 'PERCENTAGE':
                return (
                    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="%" />
                );
            case 'DATETIME':
                return (
                    <Input type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} />
                );
            case 'DATE':
                return (
                    <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
                );
            default:
                return (
                    <Input value={value} onChange={(e) => onChange(e.target.value)} />
                );
        }
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
                    name="add_edit_control_indicator_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

                    <Form.Item
                        name="keyControlIndicator"
                        label="Key Control Indicator"
                        rules={[{ required: true, message: 'Please input the key control indicator!' }]}
                        className="form-item"
                    >
                        <Input placeholder="Enter key control indicator" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="purpose"
                        label="Purpose"
                        rules={[{ required: true, message: 'Please input the purpose!' }]}
                        className="form-item"
                    >
                        <Input.TextArea value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="monitoringFrequencyId"
                        label="Frequency"
                        rules={[{ required: true, message: 'Please select the frequency!' }]}
                        className="form-item"
                    >
                        <Select
                            showSearch
                            placeholder="Select a frequency"
                            optionFilterProp="children"
                            filterOption={filterOption}
                        >
                            {frequencies.map(frequency => (
                                <Option key={frequency.id} value={frequency.id}>
                                    {frequency.frequency}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="measurementId"
                        label="Measurement"
                        rules={[{ required: true, message: 'Please select the measurement!' }]}
                        className="form-item"
                    >
                        <Select
                            showSearch
                            placeholder="Select a measurement"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            onChange={handleMeasurementChange}
                            value={selectedMeasurement}
                        >
                            {measurements.map(measurement => (
                                <Option key={measurement.id} value={measurement.id}>
                                    {measurement.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Row gutter={16}>
                        {selectedMeasurement && controlIndicatorThresholds.map((threshold, index) => (
                            <Col span={12} key={`controlIndicatorThreshold-${index}`}>
                                <div className="form-item-container">
                                    <Form.Item
                                        name={`thresholdCategory-${index}`}
                                        label={`Control Indicator Threshold Category ${index + 1}`}
                                        initialValue={threshold.thresholdCategoryId}
                                        className="form-item"
                                    >
                                        <Select
                                            value={threshold.thresholdCategoryId}
                                            showSearch
                                            placeholder="Select a control indicator threshold category"
                                            optionFilterProp="children"
                                            filterOption={filterOption}
                                            disabled
                                        >
                                            {thresholdCategories.map(category => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.name} - ({category.code})
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {threshold.comparisonConditions.map((condition, cIndex) => (
                                        <div key={`condition-${index}-${cIndex}`} >
                                            <Form.Item
                                                name={`comparisonOperator-${index}-${cIndex}`}
                                                label={`Comparison Operator ${cIndex + 1}`}
                                                rules={[{ required: true, message: 'Please select a comparison operator!' }]}
                                                initialValue={condition.comparisonOperatorId}
                                                className="form-item"
                                            >
                                                <Select
                                                    value={condition.comparisonOperatorId}
                                                    onChange={(value) => handleComparisonConditionChange(index, cIndex, { comparisonOperatorId: value })}
                                                    showSearch
                                                    placeholder="Select a comparison operator"
                                                    optionFilterProp="children"
                                                    filterOption={filterOption}
                                                >
                                                    {comparisonOperators.map(operator => (
                                                        <Option key={operator.id} value={operator.id}>
                                                            {operator.name} - ({operator.symbol})
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name={`bound-${index}-${cIndex}`}
                                                label={`Bound ${cIndex + 1}`}
                                                rules={[{ required: true, message: 'Please input the bound!' }]}
                                                initialValue={condition.bound}
                                                className="form-item"
                                            >
                                                {renderBoundInput(measurements.find(m => m.id === selectedMeasurement)?.code || '', condition.bound, (value) => handleComparisonConditionChange(index, cIndex, { bound: value }))}
                                            </Form.Item>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        ))}
                    </Row>

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

export default AddEditControlIndicatorForm;
