import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Skeleton, message, Modal, Select } from 'antd';
import { BcmSubProcessDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import { getBcmProcessList } from '@/app/services/api/BcmProcessApi';

interface AddEditBcmSubProcessFormProps {
    initialValues?: Partial<BcmSubProcessDTO>;
    onSubmit: (values: BcmSubProcessDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmSubProcessForm: React.ForwardRefRenderFunction<any, AddEditBcmSubProcessFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);
    const [processes, setProcesses] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    // Fetch available processes for the select dropdown
    const fetchProcesses = async () => {
        try {
            setFetching(true);
            const processesData = await getBcmProcessList(0, 100); // Fetch available processes
            setProcesses(processesData.items); // Use the items array directly
            setFetching(false);
        } catch (error) {
            message.error('Error fetching processes.');
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchProcesses();
    }, []);

    // Reset form when initialValues change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form
    const handleFinish = async (values: BcmSubProcessDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Sub-process saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving sub-process details.');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            Modal.confirm({
                title: 'Discard Changes?',
                content: 'You have unsaved changes. Are you sure you want to close the form?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    form.resetFields();
                    onCancel();
                },
            });
        } else {
            onCancel();
        }
    };

    // Imperative handle for parent components
    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        },
        handleCancel: () => {
            handleCancel();
        },
    }));

    return (
        <>
            {loading || fetching ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_bcm_sub_process_form"
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
                        name="name"
                        label="Sub-Process Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter sub-process name" />
                    </Form.Item>

                    <Form.Item
                        name="priorityRanking"
                        label="Priority Ranking"
                        rules={[
                            { required: true, message: 'Priority ranking is required!' },
                            { type: 'number', message: 'Priority ranking must be a number!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter priority ranking" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="rto"
                        label="RTO (Recovery Time Objective)"
                        rules={[
                            { required: true, message: 'RTO is required!' },
                            { max: 255, message: 'RTO cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter Recovery Time Objective" />
                    </Form.Item>

                    <Form.Item
                        name="rpo"
                        label="RPO (Recovery Point Objective)"
                        rules={[
                            { required: true, message: 'RPO is required!' },
                            { max: 255, message: 'RPO cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter Recovery Point Objective" />
                    </Form.Item>

                    <Form.Item
                        name="dependencies"
                        label="Dependencies"
                        rules={[{ max: 500, message: 'Dependencies cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter dependencies" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="responsibleParties"
                        label="Responsible Parties"
                        rules={[{ max: 500, message: 'Responsible parties cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter responsible parties" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="quantitativeImpact"
                        label="Quantitative Impact"
                        rules={[{ max: 500, message: 'Quantitative impact cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter quantitative impact" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="processId"
                        label="Parent Process"
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

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Sub-Process' : 'Add New Sub-Process'}
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

export default forwardRef(AddEditBcmSubProcessForm);
