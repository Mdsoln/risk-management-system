import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Card } from 'antd';
import dynamic from 'next/dynamic';
import { addRiskControl, updateRiskControl } from '../../services/api/riskControlApi';
import { getRiskOwners } from '@/app/services/api/departmentOwner';
import { ControlIndicatorDto, ErrorState, RiskControlDto, Directorate } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { checkForErrors, handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import ControlIndicatorListTable from '../ControlIndicator/ControlIndicatorListTable';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const { Option, OptGroup } = Select;

interface AddEditRiskControlFormProps {
    initialValues?: Partial<RiskControlDto>;
    onSubmit: (values: Partial<RiskControlDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
}

const AddEditRiskControlForm: React.FC<AddEditRiskControlFormProps> = ({ initialValues, onSubmit, onCancel, context, loading }) => {
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [directorates, setDirectorates] = useState<Directorate[]>([]);
    const [description, setDescription] = useState(initialValues?.description || '');
    const [purpose, setPurpose] = useState(initialValues?.purpose || '');
    const [controlIndicators, setControlIndicators] = useState<ControlIndicatorDto[]>(initialValues?.controlIndicators || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const directoratesData = await getRiskOwners();
                setDirectorates(directoratesData);
            } catch (error) {
                message.error('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (initialValues) {
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                description: initialValues.description,
                purpose: initialValues.purpose,
            });
            setFetching(false);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Partial<RiskControlDto>) => {
        setErrorState(null);
        try {
            if (!values.name || !description || !purpose || (context === 'individual' && !initialValues?.riskId)) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: RiskControlDto = {
                id: initialValues?.id, // Include the id here
                name: values.name!,
                description: description,
                purpose: purpose,
                riskId: initialValues?.riskId!,
                departmentId: values.departmentId!,
                controlIndicators: controlIndicators,
            };

            let response;
            if (context === 'individual') {
                if (initialValues?.id) {
                    response = await updateRiskControl(initialValues.id, sanitizedValues);
                } else {
                    response = await addRiskControl(sanitizedValues);
                }

                const result = checkForErrors(response, setErrorState);
                if (result) {
                    await onSubmit(sanitizedValues);
                    message.success('Risk Control saved successfully');
                }
            } else {
                await onSubmit(sanitizedValues);
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Unexpected error occurred while saving Risk Control');
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

    return (
        <>
            {fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    form={form}
                    initialValues={initialValues}
                    layout="vertical"
                    name="add_edit_risk_control_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

                    <Form.Item
                        name="name"
                        label="Control Name"
                        rules={[{ required: true, message: 'Please input the control name!' }]}
                        className="form-item"
                    >
                        <Input placeholder="Enter control name" />
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

                    {/* Directorate and Department Selection */}
                    <Form.Item
                        name="departmentId"
                        label="Owner Department"
                        rules={[{ required: true, message: 'Please select the owner department!' }]}
                        className="form-item"
                    >
                        <Select
                            showSearch
                            placeholder="Select a Process/Risk Owner"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            defaultValue={initialValues?.departmentId} // Default value for the Select component
                        >
                            {directorates.reduce((acc, directorate) => {
                                let group = acc.find(g => g.key === directorate.id);
                                if (!group) {
                                    group = { key: directorate.id, label: directorate.name, options: [] };
                                    acc.push(group);
                                }
                                if (directorate.departments) {
                                    directorate.departments.forEach((department) => {
                                        group.options.push(
                                            <Option key={department.id} value={department.id}>
                                                {`(DIR: ${directorate.name}) `}
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

                    <Card size="small" title="Control Indicators" className="form-card">
                        <ControlIndicatorListTable
                            controlIndicators={controlIndicators}
                            onChange={setControlIndicators}
                        />
                    </Card>

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

export default AddEditRiskControlForm;
