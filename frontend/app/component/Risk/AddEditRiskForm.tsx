import { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Row, Col, Card, Slider, Modal } from 'antd';
import dynamic from 'next/dynamic';
import { addRisk, updateRisk } from '../../services/api/riskApi';
import { getRiskAreas } from '../../services/api/riskAreaApi';
import { searchBusinessProcessesByName } from '../../services/api/businessProcessApi';
import { getImpacts } from '../../services/api/impactApi';
import { Risk, ErrorState, RiskArea, BusinessProcess, Likelihood, Impact, RiskDto, RiskIndicatorDto, RiskIndicator, MonitoringFrequency, Measurement, RiskControlDto, RiskControl, FieldError, Directorate, RiskActionPlanDto } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, checkForErrors, handleFormErrors } from '@/app/utils/errorHandler';
import { getLikelihoods } from '@/app/services/api/likelihoodApi';
import './AddEditRiskForm.css'; // Import the CSS file
import RiskIndicatorListTable from '../RiskIndicator/RiskIndicatorListTable';
import { getRiskOwners } from '@/app/services/api/departmentOwner';
import { getMonitoringFrequencies } from '@/app/services/api/monitoringFrequencyApi';
import { getMeasurements } from '@/app/services/api/measurementApi';
import { CheckCircleOutlined } from '@ant-design/icons';
import RiskControlTable from '../RiskControl/RiskControlTable'; // Import the RiskControlTable
import RiskActionPlanListTable from './RiskActionPlanListTable';

// Load ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const { Option, OptGroup } = Select;

const formatLikelihoods = (likelihoods: Likelihood[]): { id: string; score: number; name: string }[] => {
    return likelihoods.map(likelihood => ({
        id: likelihood.id,
        score: likelihood.score,
        name: likelihood.likelihoodCategory
    }));
};

const formatImpacts = (impacts: Impact[]): { id: string; score: number; name: string }[] => {
    return impacts.map(impact => ({
        id: impact.id,
        score: impact.score,
        name: impact.severityRanking
    }));
};

const convertToRiskIndicatorDto = (indicator: RiskIndicator): RiskIndicatorDto => ({
    id: indicator.id,
    indicator: indicator.indicator,
    description: indicator.description,
    purpose: indicator.purpose,
    riskId: indicator.risk.id,
    monitoringFrequencyId: indicator.monitoringFrequency.id,
    measurementId: indicator.measurement.id,
    riskIndicatorThresholds: indicator.riskIndicatorThresholds.map(riskIndicatorThreshold => ({
        thresholdCategoryId: riskIndicatorThreshold.thresholdCategory.id,
        comparisonConditions: riskIndicatorThreshold.comparisonConditions.map(condition => ({
            comparisonOperatorId: condition.comparisonOperator.id,
            bound: condition.bound,
        })),
    })),
});

const convertToRiskControlDto = (control: RiskControl): RiskControlDto => ({
    id: control.id,
    name: control.name,
    description: control.description,
    purpose: control.purpose,
    riskId: control.risk.id,
    departmentId: control.department.id,
    controlIndicators: control.controlIndicators.map(indicator => ({
        id: indicator.id,
        keyControlIndicator: indicator.keyControlIndicator,
        description: indicator.description,
        purpose: indicator.purpose,
        riskControlId: indicator.riskControl.id,
        monitoringFrequencyId: indicator.monitoringFrequency.id,
        measurementId: indicator.measurement.id,
        controlIndicatorThresholds: indicator.controlIndicatorThresholds.map(threshold => ({
            id: threshold.id,
            thresholdCategoryId: threshold.thresholdCategory.id,
            comparisonConditions: threshold.comparisonConditions.map(condition => ({
                id: condition.id,
                comparisonOperatorId: condition.comparisonOperator.id,
                bound: condition.bound,
            })),
        })),
    })),
});

interface AddEditRiskFormProps {
    initialValues?: Partial<Risk>;
    onSubmit: (values: Partial<RiskDto>) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;

}

const AddEditRiskForm: React.ForwardRefRenderFunction<any, AddEditRiskFormProps> = ({ initialValues, onSubmit, onCancel, loading, showActionButtons }, ref) => {
    const [form] = Form.useForm();

    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [riskAreas, setRiskAreas] = useState<RiskArea[]>([]);
    const [businessProcesses, setBusinessProcesses] = useState<BusinessProcess[]>([]);
    const [directorates, setDirectorates] = useState<Directorate[]>([]);
    const [likelihoods, setLikelihoods] = useState<Likelihood[]>([]);
    const [impacts, setImpacts] = useState<Impact[]>([]);
    const [monitoringFrequencies, setMonitoringFrequencies] = useState<MonitoringFrequency[]>([]);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [selectedBusinessProcess, setSelectedBusinessProcess] = useState<{ id: string, name: string } | undefined>(initialValues?.businessProcess ? { id: initialValues.businessProcess.id, name: initialValues.businessProcess.name } : undefined);

    const [riskIndicators, setRiskIndicators] = useState<RiskIndicatorDto[]>(
        initialValues?.riskIndicators ? initialValues.riskIndicators.map(convertToRiskIndicatorDto) : []
    );

    const [riskControls, setRiskControls] = useState<RiskControlDto[]>(
        initialValues?.riskControls ? initialValues.riskControls.map(convertToRiskControlDto) : []
    );

    const [riskActionPlans, setRiskActionPlans] = useState<RiskActionPlanDto[]>(
        initialValues?.riskActionPlans?.map(plan => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            startDatetime: plan.startDatetime,
            endDatetime: plan.endDatetime,
            riskId: initialValues?.id || '',  // Assuming initialValues contains the risk with the id
            riskActionPlanMonitoring: plan.riskActionPlanMonitoring.map(monitoring => ({
                id: monitoring.id,
                comment: monitoring.comment,
                monitoringDatetime: monitoring.monitoringDatetime,
                riskActionPlanId: plan.id || ''  // Use the plan ID or an empty string
            }))
        })) || []
    );

    const clearForm = useCallback(() => {
        form.resetFields();
        setDescription(''); // Reset the description state
        setErrorState(null); // Clear errors on component start
    }, [form])

    useEffect(() => {
        // form.resetFields();
        // setDescription(''); // Reset the description state
        // setErrorState(null); // Clear errors on component start

        clearForm(); // clear form data and Errors
        fetchRiskAreas();
        fetchDepartments();
        fetchLikelihoods();
        fetchImpacts();
        fetchMonitoringFrequencies();
        fetchMeasurements();

        if (initialValues) {
            console.log("initialValues.department?.id:" + initialValues.department?.id)
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                riskAreaId: initialValues.riskArea?.id,
                businessProcessId: initialValues.businessProcess?.id,
                departmentId: initialValues.department?.id,
                inherentRiskLikelihoodScore: initialValues.inherentRisk?.likelihood.score,
                inherentRiskImpactScore: initialValues.inherentRisk?.impact.score,
                residualRiskLikelihoodScore: initialValues.residualRisk?.likelihood.score,
                residualRiskImpactScore: initialValues.residualRisk?.impact.score,
                description: initialValues.description || '',
            });
            setDescription(initialValues.description || '');
            if (initialValues.businessProcess) {
                setSearchKeyword(initialValues.businessProcess.name);
                setSelectedBusinessProcess({ id: initialValues.businessProcess.id, name: initialValues.businessProcess.name });
            }
            setFetching(false);
        } else {
            form.resetFields(); // Clear the form fields when there are no initial values
            setDescription(''); // Clear the description field
        }
    }, [initialValues, form, clearForm]);


    useEffect(() => {
        if (searchKeyword) {
            searchBusinessProcesses(searchKeyword);
        }
    }, [searchKeyword]);



    const fetchRiskAreas = async () => {
        try {
            const data = await getRiskAreas();
            setRiskAreas(data);
        } catch (error) {
            message.error('Failed to fetch risk areas');
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await getRiskOwners();
            setDirectorates(data);
        } catch (error) {
            message.error('Failed to fetch Process/Risk Owners');
        }
    };

    const fetchLikelihoods = async () => {
        try {
            const data = await getLikelihoods();
            setLikelihoods(data);
        } catch (error) {
            message.error('Failed to fetch likelihoods');
        }
    };

    const fetchImpacts = async () => {
        try {
            const data = await getImpacts();
            setImpacts(data);
        } catch (error) {
            message.error('Failed to fetch impacts');
        }
    };

    const fetchMonitoringFrequencies = async () => {
        try {
            const data = await getMonitoringFrequencies();
            setMonitoringFrequencies(data);
        } catch (error) {
            message.error('Failed to fetch monitoring frequencies');
        }
    };

    const fetchMeasurements = async () => {
        try {
            const data = await getMeasurements();
            setMeasurements(data);
        } catch (error) {
            message.error('Failed to fetch measurements');
        }
    };

    const searchBusinessProcesses = async (keyword: string) => {
        try {
            const data = await searchBusinessProcessesByName(keyword);
            setBusinessProcesses(data);
        } catch (error) {
            message.error('Failed to search business processes');
        }
    };

    const handleFinish = async (values: Partial<RiskDto & { inherentRiskLikelihoodScore: number; inherentRiskImpactScore: number; residualRiskLikelihoodScore: number; residualRiskImpactScore: number; }>) => {
        setErrorState(null);
        try {
            const sanitizedValues: Omit<RiskDto, 'id'> = {
                name: values.name!,
                description: description, // Use state for description
                riskAreaId: values.riskAreaId!,
                businessProcessId: selectedBusinessProcess?.id!,
                departmentId: values.departmentId!,
                inherentRiskLikelihoodId: getLikelihoodIdByScore(values.inherentRiskLikelihoodScore!),
                inherentRiskImpactId: getImpactIdByScore(values.inherentRiskImpactScore!),
                residualRiskLikelihoodId: getLikelihoodIdByScore(values.residualRiskLikelihoodScore!),
                residualRiskImpactId: getImpactIdByScore(values.residualRiskImpactScore!),
                riskIndicators: riskIndicators,
                riskControls: riskControls,
                riskCauses: values.riskCauses || [],
                riskOpportunities: values.riskOpportunities || [],
                riskActionPlans: riskActionPlans,
            };

            console.log("sanitizedValues: ", sanitizedValues)

            let response;
            if (initialValues?.id) {
                response = await updateRisk(initialValues.id, sanitizedValues);
            } else {
                response = await addRisk(sanitizedValues);
            }

            const result = checkForErrors(response, setErrorState);
            if (result) {
                await onSubmit(sanitizedValues); // Ensure sanitizedValues includes riskActionPlans
                message.success('Risk saved successfully');
                clearForm(); // clear form data and Errors
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Unexpected error occurred while saving Risk');
        }
    };

    const handleCloseErrorAlert = () => {
        setErrorState(null);
    };

    const filterOption = (input: string, option?: { children: React.ReactNode }) => {
        if (option?.children) {
            const childrenText = option.children.toString();
            return childrenText.toLowerCase().includes(input.toLowerCase());
        }
        return false;
    };

    const getLikelihoodIdByScore = (score: number): string => {
        const likelihood = likelihoods.find(l => l.score === score);
        return likelihood ? likelihood.id : '';
    };

    const getImpactIdByScore = (score: number): string => {
        const impact = impacts.find(i => i.score === score);
        return impact ? impact.id : '';
    };

    const handleSelectBusinessProcess = (value: string, option: any) => {
        setSelectedBusinessProcess({ id: value, name: option.children });
        form.setFieldsValue({ businessProcessId: value });
    };

    const getSliderTrackColor = (score: number, list: { score: number; color: string }[]) => {
        const item = list.find(l => l.score === score);
        return item ? item.color : 'gray';
    };



    const getTooltipContainer = () => {
        return document.getElementById('slider-tooltip-container') || document.body;
    };

    const renderMark = (text: string, color: string) => (
        <div style={{ display: 'flex', alignItems: 'center', color, padding: '0px' }}>
            {/* <CheckCircleOutlined style={{ marginRight: 4 }} /> */}
            <span style={{ fontSize: '12px', backgroundColor: 'gray', padding: '2px 10px 2px 10px' }}>{text}</span>
        </div>
    );


    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        }
    }));

    const handleFinishOnSubmit = async (values: Partial<RiskDto>) => {
        await handleFinish(values);
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
                        // form.resetFields();
                        // setDescription('');
                        clearForm(); // clear form data and Errors
                        onCancel();
                    },
                });
            } else {
                onCancel();
            }
        }
    }));

    const handleFinishFailed = (errorInfo: any) => {
        const errors: FieldError[] = errorInfo.errorFields.map((errorField: any) => ({
            field: errorField.name[0], // Assuming single-level field names
            message: errorField.errors[0], // Take the first error message
        }));

        const clientErrorState: ErrorState = {
            message: 'Validation Error',
            description: 'Please correct the errors below.',
            errors: errors,
            refId: null, // Set to null or some default if you don't have a refId for client-side errors
            details: null,
            stack: null,
        };

        setErrorState(clientErrorState);
    };



    return (
        <>
            {fetching ? (
                <Skeleton active />
            ) : (

                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    // initialValues={{
                    //     ...initialValues,
                    //     departmentId: initialValues?.department?.id,  // Set the initial department
                    // }}
                    name="add_edit_risk_form"
                    onFinish={handleFinishOnSubmit}
                    onFinishFailed={handleFinishFailed} // To handle client-side validation errors


                >
                    {errorState && (
                        <div className="error-display-container">
                            <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />
                        </div>
                    )}

                    <div className='form-content'>

                        <Form.Item
                            name="businessProcessId"
                            label="Business Process"
                            rules={[{ required: true, message: 'Please select the business process!' }]}
                        // className="form-item"
                        >
                            <Select
                                showSearch
                                placeholder="Search and select a business process"
                                onSearch={setSearchKeyword}
                                onSelect={handleSelectBusinessProcess}
                                filterOption={filterOption}
                                value={selectedBusinessProcess?.id ? selectedBusinessProcess.name : undefined}
                            >
                                {businessProcesses.reduce((acc, process) => {
                                    const department = process.businessProcessOwnerDepartment;
                                    let group = acc.find(g => g.key === department.id);
                                    if (!group) {
                                        group = { key: department.id, label: department.name, options: [] };
                                        acc.push(group);
                                    }
                                    group.options.push(
                                        <Option key={process.id} value={process.id}>
                                            {process.name}
                                        </Option>
                                    );
                                    return acc;
                                }, [] as { key: string; label: string; options: JSX.Element[] }[]).map(group => (
                                    <OptGroup key={group.key} label={group.label}>
                                        {group.options}
                                    </OptGroup>
                                ))}
                            </Select>
                        </Form.Item>



                        {/* <Card size="small" title="Risk Basic Details" className="form-card"> */}
                        <Form.Item
                            name="name"
                            label="Risk Name/Title"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        // className="form-item"
                        >
                            <Input placeholder="Enter risk name" />
                        </Form.Item>



                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="riskAreaId"
                                    label="Risk Category"
                                    rules={[{ required: true, message: 'Please select the risk area!' }]}
                                // className="form-item"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a risk Category"
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                    >
                                        {riskAreas.reduce((acc, riskArea) => {
                                            const category = riskArea.riskAreaCategory;
                                            let group = acc.find(g => g.key === category.id);
                                            if (!group) {
                                                group = { key: category.id, label: category.name, options: [] };
                                                acc.push(group);
                                            }
                                            group.options.push(
                                                <Option key={riskArea.id} value={riskArea.id}>
                                                    {riskArea.name}
                                                </Option>
                                            );
                                            return acc;
                                        }, [] as { key: string; label: string; options: JSX.Element[] }[]).map(group => (
                                            <OptGroup key={group.key} label={group.label}>
                                                {group.options}
                                            </OptGroup>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                            </Col>



                        </Row>


                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <div className="quill-editor-container">
                                <ReactQuill
                                    className="quill-editor"
                                    value={description}
                                    onChange={(value) => {
                                        setDescription(value);
                                        form.setFieldsValue({ description: value });
                                    }}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="departmentId"
                            label="Process/Risk Owner"
                            rules={[{ required: true, message: 'Please select the Process/Risk Owner!' }]}
                            initialValue={initialValues?.department?.id}  // Set the initial value for the department
                        >
                            <Select
                                showSearch
                                placeholder="Select a Process/Risk Owner"
                                optionFilterProp="children"
                                filterOption={filterOption}
                                defaultValue={initialValues?.department?.id} // Default value for the Select component
                            >
                                {directorates.reduce((acc, directorate) => {
                                    let group = acc.find(g => g.key === directorate.id);
                                    if (!group) {
                                        group = { key: directorate.id, label: directorate.name, options: [] };
                                        acc.push(group);
                                    }
                                    if (directorate.departments) {
                                        directorate.departments.forEach((department, departmentIndex) => {
                                            group.options.push(
                                                <Option
                                                    key={`${directorate.id}-${department.id}-${departmentIndex}`}
                                                    value={department.id}>
                                                    {`(DIR: ${directorate.code}) `}
                                                    {`(DEP: ${department.name}) `}
                                                </Option>
                                            );
                                        });
                                    }
                                    return acc;
                                }, [] as { key: string; label: string; options: JSX.Element[] }[]).map(group => (
                                    <OptGroup key={group.key} label={group.label}>
                                        {group.options}
                                    </OptGroup>
                                ))}
                            </Select>
                        </Form.Item>


                        {/* </Card> */}

                        <Card size="small" title="Inherent Risk" className="form-card">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="inherentRiskLikelihoodScore"
                                        label="Inherent Risk Likelihood"
                                        rules={[{ required: true, message: 'Please select the inherent risk likelihood!' }]}
                                    >
                                        <Slider
                                            min={0}
                                            max={Math.max(...likelihoods.map(l => l.score))}
                                            marks={{
                                                0: "",
                                                ...likelihoods.reduce((acc, likelihood) => {
                                                    acc[likelihood.score] = renderMark(likelihood.likelihoodCategory, likelihood.color);
                                                    return acc;
                                                }, {} as Record<number, React.ReactNode>)
                                            }}
                                            value={form.getFieldValue('inherentRiskLikelihoodScore')}
                                            onChange={(value) => form.setFieldsValue({ inherentRiskLikelihoodScore: value })}
                                            step={null}
                                            railStyle={{
                                                background: `linear-gradient(to right, ${likelihoods.map(l => l.color).join(', ')})`
                                            }}
                                            tooltip={{ open: false, getTooltipContainer }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="inherentRiskImpactScore"
                                        label="Inherent Risk Impact"
                                        rules={[{ required: true, message: 'Please select the inherent risk impact!' }]}
                                    >
                                        <Slider
                                            min={0}
                                            max={Math.max(...impacts.map(i => i.score))}
                                            marks={{
                                                0: "",
                                                ...impacts.reduce((acc, impact) => {
                                                    acc[impact.score] = renderMark(impact.severityRanking, impact.color);
                                                    return acc;
                                                }, {} as Record<number, React.ReactNode>)
                                            }}
                                            value={form.getFieldValue('inherentRiskImpactScore')}
                                            onChange={(value) => form.setFieldsValue({ inherentRiskImpactScore: value })}
                                            step={null}
                                            railStyle={{
                                                background: `linear-gradient(to right, ${impacts.map(i => i.color).join(', ')})`
                                            }}
                                            tooltip={{ open: false, getTooltipContainer }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>


                        <Card size="small" title="Risk Indicators" className="form-card">
                            <RiskIndicatorListTable
                                riskIndicators={riskIndicators}
                                monitoringFrequencies={monitoringFrequencies}
                                measurements={measurements}
                                onChange={setRiskIndicators}
                            />
                        </Card>

                        <Card size="small" title="Risk Controls" className="form-card">
                            <RiskControlTable
                                riskControls={riskControls}
                                monitoringFrequencies={monitoringFrequencies}
                                measurements={measurements}
                                onChange={setRiskControls}
                            />
                        </Card>

                        <Card size="small" title="Residual Risk" className="form-card">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="residualRiskLikelihoodScore"
                                        label="Residual Risk Likelihood"
                                        rules={[{ required: true, message: 'Please select the residual risk likelihood!' }]}
                                    >
                                        <Slider
                                            min={0}
                                            max={Math.max(...likelihoods.map(l => l.score))}
                                            marks={{
                                                0: "None",
                                                ...likelihoods.reduce((acc, likelihood) => {
                                                    acc[likelihood.score] = renderMark(likelihood.likelihoodCategory, likelihood.color);
                                                    return acc;
                                                }, {} as Record<number, React.ReactNode>)
                                            }}
                                            value={form.getFieldValue('residualRiskLikelihoodScore')}
                                            onChange={(value) => form.setFieldsValue({ residualRiskLikelihoodScore: value })}
                                            step={null}
                                            railStyle={{
                                                background: `linear-gradient(to right, ${likelihoods.map(l => l.color).join(', ')})`
                                            }}
                                            tooltip={{ open: false, getTooltipContainer }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="residualRiskImpactScore"
                                        label="Residual Risk Impact"
                                        rules={[{ required: true, message: 'Please select the residual risk impact!' }]}
                                    >
                                        <Slider
                                            min={0}
                                            max={Math.max(...impacts.map(i => i.score))}
                                            marks={{
                                                0: "None",
                                                ...impacts.reduce((acc, impact) => {
                                                    acc[impact.score] = renderMark(impact.severityRanking, impact.color);
                                                    return acc;
                                                }, {} as Record<number, React.ReactNode>)
                                            }}
                                            value={form.getFieldValue('residualRiskImpactScore')}
                                            onChange={(value) => form.setFieldsValue({ residualRiskImpactScore: value })}
                                            step={null}
                                            railStyle={{
                                                background: `linear-gradient(to right, ${impacts.map(i => i.color).join(', ')})`
                                            }}
                                            tooltip={{ open: false, getTooltipContainer }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card size="small" title="Risk Action Plans" className="form-card">
                            <Card size="small" title="Risk Action Plans" className="form-card">
                                <RiskActionPlanListTable
                                    actionPlans={riskActionPlans}
                                    onChange={setRiskActionPlans} // Use onChange instead of onEdit
                                />
                            </Card>


                        </Card>


                        {showActionButtons && ( // Add this condition
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    {initialValues ? 'Update Risk' : 'Add New Risk'}
                                </Button>
                                <Button onClick={onCancel} style={{ marginLeft: '8px' }}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        )}

                    </div>
                </Form>
            )}
        </>
    );
};




export default forwardRef(AddEditRiskForm);
