import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, Skeleton, message, Modal } from 'antd';
import { BcmDamageAssessmentDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmDamageAssessmentFormProps {
    initialValues?: Partial<BcmDamageAssessmentDTO>;
    onSubmit: (values: BcmDamageAssessmentDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmDamageAssessmentForm: React.ForwardRefRenderFunction<any, AddEditBcmDamageAssessmentFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form when initial values change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form handler
    const handleFinish = async (values: BcmDamageAssessmentDTO) => {
        setErrorState(null); // Clear previous errors
        try {
            await onSubmit(values); // Trigger parent onSubmit
            message.success('Damage Assessment saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the assessment.');
        }
    };

    // Handle cancel and unsaved changes
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

    // Expose imperative handle for parent components
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
            {loading ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_bcm_damage_assessment_form"
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
                        name="supplier"
                        label="Supplier"
                        rules={[
                            { required: true, message: 'Supplier is required!' },
                            { min: 3, max: 255, message: 'Supplier must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter supplier name" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Contact Name"
                        rules={[
                            { required: true, message: 'Contact Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter contact name" />
                    </Form.Item>

                    <Form.Item
                        name="phoneWork"
                        label="Work Phone"
                        rules={[{ max: 15, message: 'Phone number cannot exceed 15 characters!' }]}
                    >
                        <Input placeholder="Enter work phone number" />
                    </Form.Item>

                    <Form.Item
                        name="phoneHome"
                        label="Home Phone"
                        rules={[{ max: 15, message: 'Phone number cannot exceed 15 characters!' }]}
                    >
                        <Input placeholder="Enter home phone number" />
                    </Form.Item>

                    <Form.Item
                        name="phoneMobile"
                        label="Mobile Phone"
                        rules={[{ max: 15, message: 'Phone number cannot exceed 15 characters!' }]}
                    >
                        <Input placeholder="Enter mobile phone number" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Assessment' : 'Add New Assessment'}
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

export default forwardRef(AddEditBcmDamageAssessmentForm);
