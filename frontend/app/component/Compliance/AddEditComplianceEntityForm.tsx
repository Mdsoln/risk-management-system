import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button, Select, message, Modal, Skeleton } from 'antd';
import { ComplianceEntityDTO, ComplianceEntityCategoryPojo } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { getComplianceEntityCategories } from '../../services/api/complianceEntityCategoryApi';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditComplianceEntityFormProps {
    initialValues?: Partial<ComplianceEntityDTO>;
    onSubmit: (values: ComplianceEntityDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditComplianceEntityForm: React.ForwardRefRenderFunction<any, AddEditComplianceEntityFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);
    const [categories, setCategories] = useState<ComplianceEntityCategoryPojo[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);

    // Fetch categories for dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getComplianceEntityCategories(0, 100); // Fetch all categories
                setCategories(response.items);
            } catch (error) {
                message.error('Failed to fetch categories.');
            } finally {
                setFetching(false);
            }
        };

        fetchCategories();
    }, []);

    // Reset form when initial values change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form
    const handleFinish = async (values: ComplianceEntityDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('Compliance Entity saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('An error occurred while saving the compliance entity.');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            Modal.confirm({
                title: 'Discard Changes?',
                content: 'You have unsaved changes. Are you sure you want to close the form? Your data will be lost.',
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
            {fetching || loading ? (
                <Skeleton active />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={initialValues}
                    name="add_edit_compliance_entity_form"
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
                        label="Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter entity name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Description is required!' },
                            { min: 10, max: 5000, message: 'Description must be between 10 and 5000 characters!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter entity description" rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[{ required: true, message: 'Category is required!' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map(category => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Entity' : 'Add New Entity'}
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

export default forwardRef(AddEditComplianceEntityForm);
