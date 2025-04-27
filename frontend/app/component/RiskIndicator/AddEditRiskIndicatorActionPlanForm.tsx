import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button, Select, Skeleton, message, Row, Col, Modal } from 'antd';
import { RiskIndicatorActionPlanDto, ErrorState, Department, Directorate, RiskIndicatorDto } from '@/app/types/api';
import { getRiskOwners } from '@/app/services/api/departmentOwner';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

const { Option, OptGroup } = Select;

interface AddEditRiskIndicatorActionPlanFormProps {
    initialValues?: Partial<RiskIndicatorActionPlanDto>;
    onSubmit: (values: Partial<RiskIndicatorActionPlanDto>) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
    context: 'table' | 'individual';
}

const AddEditRiskIndicatorActionPlanForm: React.ForwardRefRenderFunction<any, AddEditRiskIndicatorActionPlanFormProps> = ({ initialValues, onSubmit, onCancel, loading, showActionButtons, context }, ref) => {
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [directorates, setDirectorates] = useState<Directorate[]>([]);
    const [description, setDescription] = useState(initialValues?.description || '');
    const [selectedRiskIndicatorId, setSelectedRiskIndicatorId] = useState<string | undefined>(initialValues?.riskIndicatorId);

    useEffect(() => {
        clearForm();
        fetchDepartments();

        if (initialValues) {
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                departmentId: initialValues.departmentId,
                riskIndicatorId: initialValues.riskIndicatorId,
                description: initialValues.description || '',
            });
            setDescription(initialValues.description || '');
            setSelectedRiskIndicatorId(initialValues.riskIndicatorId);
            setFetching(false);
        } else {
            form.resetFields();
            setDescription('');
        }
    }, [initialValues, form]);

    const fetchDepartments = async () => {
        try {
            const data = await getRiskOwners();
            setDirectorates(data);
        } catch (error) {
            message.error('Failed to fetch departments');
        }
    };

    const handleFinish = async (values: Partial<RiskIndicatorActionPlanDto>) => {
        setErrorState(null);
        try {
            const sanitizedValues: Omit<RiskIndicatorActionPlanDto, 'id'> = {
                name: values.name!,
                description: description,
                departmentId: values.departmentId!,
                startDatetime: values.startDatetime!,
                endDatetime: values.endDatetime!,
                riskIndicatorId: values.riskIndicatorId!,
                riskIndicatorActionPlanMonitoring: values.riskIndicatorActionPlanMonitoring || [],
            };

            await onSubmit(sanitizedValues);
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Unexpected error occurred while saving Action Plan');
        }
    };

    const clearForm = () => {
        form.resetFields();
        setDescription('');
        setErrorState(null);
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
                        clearForm();
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
                    name="add_edit_action_plan_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

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
                        <Input.TextArea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="departmentId"
                                label="Responsible Department"
                                rules={[{ required: true, message: 'Please select a department!' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a department"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
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
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="riskIndicatorId"
                                label="Risk Indicator"
                                rules={context === 'table' ? [] : [{ required: true, message: 'Please select a risk indicator!' }]}
                            >
                                <Select
                                    placeholder="Select risk indicator"
                                    disabled={context === 'table'}
                                    value={selectedRiskIndicatorId}
                                >
                                    {selectedRiskIndicatorId && (
                                        <Option key={selectedRiskIndicatorId} value={selectedRiskIndicatorId}>
                                            {selectedRiskIndicatorId}
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="startDatetime"
                                label="Start Date"
                                rules={[{ required: true, message: 'Please select the start date!' }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="endDatetime"
                                label="End Date"
                                rules={[{ required: true, message: 'Please select the end date!' }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues?.id ? 'Update Action Plan' : 'Add Action Plan'}
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

export default forwardRef(AddEditRiskIndicatorActionPlanForm);
