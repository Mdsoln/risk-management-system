import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Skeleton, message } from 'antd';
import { RiskOpportunity, ErrorState, RiskOpportunityDto } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { checkForErrors, handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import { addRiskOpportunity, updateRiskOpportunity } from '@/app/services/api/riskOpportunityApi';

interface AddEditRiskOpportunityFormProps {
    initialValues?: Partial<RiskOpportunity>;
    onSubmit: (values: Partial<RiskOpportunity>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
    loading?: boolean;
}

const AddEditRiskOpportunityForm: React.FC<AddEditRiskOpportunityFormProps> = ({ initialValues, onSubmit, onCancel, context, loading }) => {
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

    const handleFinish = async (values: Partial<RiskOpportunity>) => {
        setErrorState(null);
        try {
            if (!description || (context === 'individual' && !initialValues?.riskId)) {
                message.error('Please fill in all required fields.');
                return;
            }

            const sanitizedValues: Omit<RiskOpportunityDto, 'id'> = {
                description: description,
                riskId: initialValues?.riskId!,
            };

            let response;
            if (context === 'individual') {
                if (initialValues?.id) {
                    response = await updateRiskOpportunity(initialValues.id, sanitizedValues);
                } else {
                    response = await addRiskOpportunity(sanitizedValues);
                }

                const result = checkForErrors(response, setErrorState);
                if (result) {
                    await onSubmit(sanitizedValues);
                    message.success('Risk Opportunity saved successfully');
                }
            } else {
                await onSubmit(sanitizedValues);
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form));
            message.error('Unexpected error occurred while saving Risk Opportunity');
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
                    name="add_edit_risk_opportunity_form"
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

export default AddEditRiskOpportunityForm;
