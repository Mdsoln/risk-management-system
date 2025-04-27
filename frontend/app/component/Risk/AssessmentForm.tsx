import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Form, Select, Input, Button, Space, Alert, message } from 'antd';
import { getRiskStatusesByType } from '@/app/services/api/RiskAssessmentApi';
import { departmentOwnerReviewRisk } from '@/app/services/api/riskApi';
import { handleErrorResponse, ErrorState, checkForErrors, handleFormErrors } from '@/app/utils/errorHandler';
import { RiskAssessmentHistoryDto, RiskStatus } from '@/app/types/api';

interface AssessmentFormProps {
    onSubmit: (values: RiskAssessmentHistoryDto) => void;
    visible: boolean;
    riskId: string;
    showActionButtons?: boolean;
    formId?: string;
}

const AssessmentForm: React.ForwardRefRenderFunction<any, AssessmentFormProps> = (
    { onSubmit, visible, riskId, showActionButtons = true, formId },
    ref
) => {
    const [form] = Form.useForm();
    const [riskStatuses, setRiskStatuses] = useState<RiskStatus[]>([]);
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    useEffect(() => {
        const fetchRiskStatuses = async () => {
            try {
                const statuses = await getRiskStatusesByType('OWNER');
                setRiskStatuses(statuses);
            } catch (error) {
                console.error('Error fetching risk statuses:', error);
                setErrorState({ message: 'Error fetching risk statuses.', description: '', errors: [], refId: null });
            }
        };

        fetchRiskStatuses();
    }, []);

    useEffect(() => {
        if (visible) {
            form.resetFields();
            setErrorState(null); // Reset the error state when the form is reopened
        }
    }, [visible]);

    const handleFinish = async (values: RiskAssessmentHistoryDto) => {
        setErrorState(null);
        try {
            const response = await departmentOwnerReviewRisk(riskId, {
                riskStatusId: values.riskStatusId,
                comment: values.comment
            });

            const result = checkForErrors(response, setErrorState);
            console.log("result: ", result)
            if (result) {
                onSubmit(values);
                form.resetFields(); // Clear form fields on submit
                message.success('Assessment submitted successfully');
            }
        } catch (error: any) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);

            message.error('Unexpected error occurred while submitting assessment');
        }
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        }
    }));

    return (
        <Form form={form} onFinish={handleFinish} layout="horizontal" id={formId}>
            {errorState && (
                <Form.Item>
                    <Alert
                        message={errorState.message}
                        description={errorState.description}
                        type="error"
                        showIcon
                    />
                </Form.Item>
            )}
            <Form.Item
                name="riskStatusId"
                label="Risk Status"
                rules={[{ required: true, message: 'Please select a status' }]}
            >
                <Select>
                    {riskStatuses.map((status) => (
                        <Select.Option key={status.id} value={status.id}>
                            {status.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="comment"
                label="Comment"
                rules={[{ required: true, message: 'Please add a comment' }]}
            >
                <Input.TextArea rows={10} />
            </Form.Item>
            {showActionButtons && (
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit Assessment
                        </Button>
                        <Button onClick={() => form.resetFields()}>Reset</Button>
                    </Space>
                </Form.Item>
            )}
        </Form>
    );
};

export default forwardRef(AssessmentForm);
