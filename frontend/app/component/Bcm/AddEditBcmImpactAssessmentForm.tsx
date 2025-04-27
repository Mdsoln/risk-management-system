import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Button, Select, InputNumber, Skeleton, message } from 'antd';
import { BcmImpactAssessmentDTO } from '@/app/types/api';
import { getBcmProcessList } from '@/app/services/api/BcmProcessApi'; // API to fetch processes
import { getBcmSubProcessList } from '@/app/services/api/BcmSubProcessApi'; // API to fetch sub-processes
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert'; // To display errors

interface AddEditBcmImpactAssessmentFormProps {
    initialValues?: Partial<BcmImpactAssessmentDTO>;
    onSubmit: (values: BcmImpactAssessmentDTO) => Promise<void>;
    onCancel: () => void;
    showActionButtons?: boolean;
    loading?: boolean;
}

const AddEditBcmImpactAssessmentForm: React.ForwardRefRenderFunction<any, AddEditBcmImpactAssessmentFormProps> = (
    { initialValues, onSubmit, onCancel, showActionButtons = true, loading },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = React.useState<any>(null);
    const [processes, setProcesses] = React.useState<any[]>([]); // Array for processes
    const [subProcesses, setSubProcesses] = React.useState<any[]>([]); // Array for sub-processes
    const [fetching, setFetching] = React.useState(false);

    // Fetch dropdown data (processes and sub-processes)
    const fetchDropdownData = async () => {
        try {
            setFetching(true);
            const [processesData, subProcessesData] = await Promise.all([
                getBcmProcessList(),
                getBcmSubProcessList(),
            ]);
            setProcesses(processesData.items); // Extract 'items' array from PaginationResult
            setSubProcesses(subProcessesData.items); // Extract 'items' array from PaginationResult
        } catch (error) {
            message.error('Error fetching process data');
        } finally {
            setFetching(false);
        }
    };

    // Initialize data when the form is first mounted or initialValues change
    useEffect(() => {
        fetchDropdownData();
    }, []);

    // Reset form fields when initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit handler
    const handleFinish = async (values: BcmImpactAssessmentDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Impact assessment saved successfully!');
        } catch (error) {
            setErrorState({
                message: 'Error saving the impact assessment.',
                description: 'Please ensure all fields are correctly filled.',
                errors: [],
                refId: null,
            });
        }
    };

    // Imperative handle for parent components to trigger submit and cancel
    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        handleCancel: () => {
            handleCancel();
        },
    }));

    // Cancel handler
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            const confirm = window.confirm('You have unsaved changes. Are you sure you want to discard?');
            if (confirm) {
                form.resetFields();
                onCancel();
            }
        } else {
            onCancel();
        }
    };

    return (
        <>
            {loading || fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_bcm_impact_assessment_form"
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
                        name="impactType"
                        label="Impact Type"
                        rules={[
                            { required: true, message: 'Impact type is required!' },
                            { min: 3, max: 255, message: 'Impact type must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter impact type" />
                    </Form.Item>

                    <Form.Item
                        name="severityLevel"
                        label="Severity Level"
                        rules={[
                            { required: true, message: 'Severity level is required!' },
                            { type: 'number', min: 1, max: 10, message: 'Severity level must be between 1 and 10!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter severity level (1-10)" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="timeToRecover"
                        label="Time to Recover"
                        rules={[
                            { required: true, message: 'Time to recover is required!' },
                            { max: 255, message: 'Time to recover cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter time to recover" />
                    </Form.Item>

                    <Form.Item
                        name="processId"
                        label="Process"
                        rules={[{ required: true, message: 'Process is required!' }]}
                    >
                        <Select placeholder="Select a process">
                            {processes.map((process) => (
                                <Select.Option key={process.id} value={process.id}>
                                    {process.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="subProcessId"
                        label="Sub-Process"
                    >
                        <Select placeholder="Select a sub-process" allowClear>
                            {subProcesses.map((subProcess) => (
                                <Select.Option key={subProcess.id} value={subProcess.id}>
                                    {subProcess.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Impact Assessment' : 'Add New Impact Assessment'}
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

export default forwardRef(AddEditBcmImpactAssessmentForm);
