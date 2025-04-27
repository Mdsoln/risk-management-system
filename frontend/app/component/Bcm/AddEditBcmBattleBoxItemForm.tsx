import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, DatePicker, Skeleton, Modal, message } from 'antd';
import { BcmBattleBoxItemDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmBattleBoxItemFormProps {
    initialValues?: Partial<BcmBattleBoxItemDTO>;
    onSubmit: (values: BcmBattleBoxItemDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmBattleBoxItemForm: React.ForwardRefRenderFunction<any, AddEditBcmBattleBoxItemFormProps> = (
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
    const handleFinish = async (values: BcmBattleBoxItemDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Battle Box Item saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the item.');
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

    // Expose form actions to parent component
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
                    name="add_edit_battle_box_item_form"
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
                        name="itemName"
                        label="Item Name"
                        rules={[
                            { required: true, message: 'Item Name is required!' },
                            { min: 3, max: 255, message: 'Item Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter item name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ max: 500, message: 'Description cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter description" rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            { required: true, message: 'Quantity is required!' },
                            { type: 'number', min: 1, message: 'Quantity must be at least 1!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter quantity" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ max: 255, message: 'Location cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter location" />
                    </Form.Item>

                    <Form.Item
                        name="lastUpdated"
                        label="Last Updated"
                        rules={[{ required: true, message: 'Last Updated date is required!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="responsiblePerson"
                        label="Responsible Person"
                        rules={[
                            { required: true, message: 'Responsible Person is required!' },
                            { max: 255, message: 'Responsible Person cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter responsible person" />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Item' : 'Add New Item'}
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

export default forwardRef(AddEditBcmBattleBoxItemForm);
