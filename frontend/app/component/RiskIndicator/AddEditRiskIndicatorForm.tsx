import React, { useState, useEffect, ReactNode } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Row, Col, Modal } from 'antd';
import dynamic from 'next/dynamic';
import { addRiskIndicator, updateRiskIndicator } from '../../services/api/riskIndicatorApi';
import { getMonitoringFrequencies } from '../../services/api/monitoringFrequencyApi';
import { getMeasurements } from '../../services/api/measurementApi';
import { getThresholdCategories } from '../../services/api/thresholdCategoryApi';
import { getComparisonOperators } from '../../services/api/comparisonOperatorApi';
import { RiskIndicatorDto, ErrorState, MonitoringFrequency, Measurement, RiskIndicatorThresholdDto, ComparisonConditionDto, ThresholdCategory, ComparisonOperator } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { checkForErrors, handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
// import 'styles.css'; // Import the CSS file
import { useImperativeHandle, forwardRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

interface AddEditRiskIndicatorFormProps {
    initialValues?: Partial<RiskIndicatorDto>;
    onSubmit: (values: Partial<RiskIndicatorDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
    showActionButtons?: boolean;

}

const AddEditRiskIndicatorForm: React.ForwardRefRenderFunction<any, AddEditRiskIndicatorFormProps> = ({ initialValues, onSubmit, onCancel, context, loading, showActionButtons }, ref) => {
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
    const [riskIndicatorThresholds, setRiskIndicatorThresholds] = useState<RiskIndicatorThresholdDto[]>([]);

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
                    setRiskIndicatorThresholds(
                        (initialValues.riskIndicatorThresholds || []).filter(threshold =>
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

    const handleFinish = async (values: Partial<RiskIndicatorDto>) => {
        setErrorState(null);
        try {
            if (
                !values.indicator ||
                !description ||
                !purpose ||
                (context === 'individual' && !initialValues?.riskId) ||
                !values.monitoringFrequencyId ||
                !selectedMeasurement
            ) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: Omit<RiskIndicatorDto, 'id'> = {
                indicator: values.indicator!,
                description: description,
                purpose: purpose,
                riskId: initialValues?.riskId!,
                monitoringFrequencyId: values.monitoringFrequencyId!,
                measurementId: selectedMeasurement!,
                riskIndicatorThresholds: riskIndicatorThresholds.map(threshold => ({
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
                    response = await updateRiskIndicator(initialValues.id, sanitizedValues);
                } else {
                    response = await addRiskIndicator(sanitizedValues);
                }

                const result = checkForErrors(response, setErrorState);
                if (result) {
                    await onSubmit(sanitizedValues);
                    message.success('Risk Indicator saved successfully');
                }
            } else {
                await onSubmit(sanitizedValues);
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (error));
            message.error('Unexpected error occurred while saving Risk Indicator');
        }
    };

    const handleCloseErrorAlert = () => {
        setErrorState(null);
    };

    const handleMeasurementChange = (value: string) => {
        setSelectedMeasurement(value);
        setRiskIndicatorThresholds(
            thresholdCategories.map(category => ({
                thresholdCategoryId: category.id,
                comparisonConditions: [{ comparisonOperatorId: '', bound: '' }]
            }))
        );
    };

    const handleRiskIndicatorThresholdChange = (index: number, value: Partial<RiskIndicatorThresholdDto>) => {
        const newRiskIndicatorThresholds = riskIndicatorThresholds.map((riskIndicatorThreshold, i) => (i === index ? { ...riskIndicatorThreshold, ...value } : riskIndicatorThreshold));
        setRiskIndicatorThresholds(newRiskIndicatorThresholds);
    };

    const handleComparisonConditionChange = (tIndex: number, cIndex: number, value: Partial<ComparisonConditionDto>) => {
        const newRiskIndicatorThresholds = riskIndicatorThresholds.map((riskIndicatorThreshold, i) => {
            if (i === tIndex) {
                const newConditions = riskIndicatorThreshold.comparisonConditions.map((condition, j) => (j === cIndex ? { ...condition, ...value } : condition));
                return { ...riskIndicatorThreshold, comparisonConditions: newConditions };
            }
            return riskIndicatorThreshold;
        });
        setRiskIndicatorThresholds(newRiskIndicatorThresholds);
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

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        handleCancel: () => {
            if (form.isFieldsTouched()) {
                Modal.confirm({
                    title: 'Discard Changes?',
                    content: 'You have unsaved changes. Are you sure you want to close the form? Your data will be lost.',
                    okText: 'Yes',
                    cancelText: 'No',
                    onOk: () => {
                        form.resetFields();
                        setDescription('');
                        setPurpose('');
                        onCancel();
                    },
                });
            } else {
                onCancel();
            }
        }
    }));

    return (
        <>
            {fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    form={form}
                    initialValues={initialValues}
                    layout="vertical"
                    name="add_edit_risk_indicator_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

                    <Form.Item
                        name="indicator"
                        label="Indicator"
                        rules={[{ required: true, message: 'Please input the indicator!' }]}
                        className="form-item"
                    >
                        <Input placeholder="Enter indicator" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <ReactQuill value={description} onChange={setDescription} />
                    </Form.Item>
                    <Form.Item
                        name="purpose"
                        label="Purpose"
                        rules={[{ required: true, message: 'Please input the purpose!' }]}
                        className="form-item"
                    >
                        <ReactQuill value={purpose} onChange={setPurpose} />
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
                        {selectedMeasurement && riskIndicatorThresholds.map((threshold, index) => (
                            <Col span={12} key={`riskIndicatorThreshold-${index}`}>
                                <div className="form-item-container">
                                    <Form.Item
                                        name={`thresholdCategory-${index}`}
                                        label={`Risk Indicator Threshold Category ${index + 1}`}
                                        initialValue={threshold.thresholdCategoryId}
                                        className="form-item"
                                    >
                                        <Select
                                            value={threshold.thresholdCategoryId}
                                            showSearch
                                            placeholder="Select a risk indicator threshold category"
                                            optionFilterProp="children"
                                            filterOption={filterOption}
                                            disabled
                                        >
                                            {thresholdCategories.map(category => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.name} - ({category.code}) - {category.description}
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

                    {showActionButtons && ( // Add this condition
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues?.id ? 'Update' : 'Add'}
                            </Button>
                            <Button onClick={onCancel} style={{ marginLeft: '8px' }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    )}


                </Form>
            )}
        </>
    );
};

export default forwardRef(AddEditRiskIndicatorForm);
