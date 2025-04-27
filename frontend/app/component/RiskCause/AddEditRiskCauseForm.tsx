import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Skeleton, message } from 'antd';
import { RiskCause, ErrorState, RiskCauseDto } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { checkForErrors, handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import { addRiskCause, updateRiskCause } from '@/app/services/api/riskCauseApi';

interface AddEditRiskCauseFormProps {
    initialValues?: Partial<RiskCause>;
    onSubmit: (values: Partial<RiskCause>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
}

const AddEditRiskCauseForm: React.FC<AddEditRiskCauseFormProps> = ({ initialValues, onSubmit, onCancel, context, loading }) => {
    const [form] = Form.useForm();
    const [fetching, setFetching] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);
    const [description, setDescription] = useState(initialValues?.description || '');

    useEffect(() => {
        if (initialValues) {
            setFetching(true);
            form.setFieldsValue({
                ...initialValues,
                description: initialValues.description,
            });
            setFetching(false);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Partial<RiskCause>) => {
        setErrorState(null);
        try {
            if (!description || (context === 'individual' && !initialValues?.riskId)) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: Omit<RiskCauseDto, 'id'> = {
                description: description,
                riskId: initialValues?.riskId!,
            };

            let response;
            if (context === 'individual') {
                if (initialValues?.id) {
                    response = await updateRiskCause(initialValues.id, sanitizedValues);
                } else {
                    response = await addRiskCause(sanitizedValues);
                }

                const result = checkForErrors(response, setErrorState);
                if (result) {
                    await onSubmit(sanitizedValues);
                    message.success('Risk Cause saved successfully');
                }
            } else {
                await onSubmit(sanitizedValues);
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Unexpected error occurred while saving Risk Cause');
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
                    name="add_edit_risk_cause_form"
                    onFinish={handleFinish}
                >
                    {errorState && <ErrorDisplayAlert errorState={errorState} onClose={handleCloseErrorAlert} />}

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default AddEditRiskCauseForm;
