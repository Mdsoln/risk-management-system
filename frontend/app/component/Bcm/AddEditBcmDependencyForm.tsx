// AddEditBcmDependencyForm.tsx

import React, {
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState,
} from 'react';
import { Form, Input, Button, message, Modal, Skeleton } from 'antd';
import { BcmDependencyDTO, ErrorState } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';

interface AddEditBcmDependencyFormProps {
    initialValues?: Partial<BcmDependencyDTO>;
    onSubmit: (values: BcmDependencyDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmDependencyForm = forwardRef<any, AddEditBcmDependencyFormProps>(
    ({ initialValues, onSubmit, onCancel, loading, showActionButtons }, ref) => {
        const [form] = Form.useForm();
        const [errorState, setErrorState] = useState<ErrorState | null>(null);

        // Populate or reset form fields on initialValues change
        useEffect(() => {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        }, [initialValues, form]);

        // Expose form actions to parent
        useImperativeHandle(ref, () => ({
            submit: () => {
                form.submit();
            },
            handleCancel: () => {
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
            },
        }));

        // Handle form submission
        const handleFinish = async (values: BcmDependencyDTO) => {
            try {
                setErrorState(null);
                await onSubmit(values);
                message.success('Dependency saved successfully!');
            } catch (error: any) {
                setErrorState({
                    message: 'Error saving dependency.',
                    description: error?.message || '',
                    errors: [],
                    refId: null,
                });
            }
        };

        return (
            <>
                {loading ? (
                    <Skeleton active />
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        name="add_edit_bcm_dependency_form"
                        onFinish={handleFinish}
                    >
                        {/* Error Alert */}
                        {errorState && (
                            <ErrorDisplayAlert
                                errorState={errorState}
                                onClose={() => setErrorState(null)}
                            />
                        )}

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please enter the dependency name!' },
                                { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                            ]}
                        >
                            <Input placeholder="Dependency Name" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ max: 500, message: 'Description cannot exceed 500 characters!' }]}
                        >
                            <Input.TextArea placeholder="Dependency Description" rows={4} />
                        </Form.Item>

                        {showActionButtons && (
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {initialValues?.name ? 'Update Dependency' : 'Save Dependency'}
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        )}
                    </Form>
                )}
            </>
        );
    }
);

AddEditBcmDependencyForm.displayName = 'AddEditBcmDependencyForm';

export default AddEditBcmDependencyForm;
