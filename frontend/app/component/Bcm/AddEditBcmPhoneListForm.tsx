import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button, Checkbox, InputNumber, Skeleton, message, Modal } from 'antd';
import { BcmPhoneListDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmPhoneListFormProps {
    initialValues?: Partial<BcmPhoneListDTO>;
    onSubmit: (values: BcmPhoneListDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmPhoneListForm: React.ForwardRefRenderFunction<any, AddEditBcmPhoneListFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons = true },
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

    // Handle form submission
    const handleFinish = async (values: BcmPhoneListDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Phone list entry saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the phone list entry.');
        }
    };

    // Handle cancel operation
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
            {loading ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_bcm_phone_list_form"
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
                        name="roleOrName"
                        label="Role/Name"
                        rules={[
                            { required: true, message: 'Role/Name is required!' },
                            { min: 3, max: 255, message: 'Role/Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter role or name" />
                    </Form.Item>

                    <Form.Item
                        name="phonesRequired"
                        label="Phones Required"
                        rules={[
                            { required: true, message: 'Number of phones required is mandatory!' },
                            { type: 'number', min: 1, message: 'At least 1 phone is required!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter number of phones required" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="isdAccess"
                        label="ISD Access"
                        valuePropName="checked"
                    >
                        <Checkbox>ISD Access Enabled</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="installedOk"
                        label="Installed OK"
                        valuePropName="checked"
                    >
                        <Checkbox>Installation Verified</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="testedOk"
                        label="Tested OK"
                        valuePropName="checked"
                    >
                        <Checkbox>Testing Successful</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="comments"
                        label="Comments"
                        rules={[{ max: 500, message: 'Comments cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter additional comments" rows={4} />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Entry' : 'Add New Entry'}
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

export default forwardRef(AddEditBcmPhoneListForm);
