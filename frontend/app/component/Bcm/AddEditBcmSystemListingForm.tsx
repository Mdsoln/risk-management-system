import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, Skeleton, message, Modal } from 'antd';
import { BcmSystemListingDTO } from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

interface AddEditBcmSystemListingFormProps {
    initialValues?: Partial<BcmSystemListingDTO>;
    onSubmit: (values: BcmSystemListingDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditBcmSystemListingForm: React.ForwardRefRenderFunction<any, AddEditBcmSystemListingFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);

    // Reset form fields when initial values change
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    // Submit form
    const handleFinish = async (values: BcmSystemListingDTO) => {
        setErrorState(null);
        try {
            await onSubmit(values);
            message.success('System listing saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving system listing.');
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
                    name="add_edit_bcm_system_listing_form"
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
                        name="businessArea"
                        label="Business Area"
                        rules={[
                            { required: true, message: 'Business Area is required!' },
                            { max: 255, message: 'Cannot exceed 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter business area" />
                    </Form.Item>

                    <Form.Item
                        name="applicationsAndDatabase"
                        label="Applications and Database"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter applications and database" />
                    </Form.Item>

                    <Form.Item
                        name="telephones"
                        label="Telephones"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter telephones" />
                    </Form.Item>

                    <Form.Item
                        name="mobilePhones"
                        label="Mobile Phones"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter mobile phones" />
                    </Form.Item>

                    <Form.Item
                        name="modem"
                        label="Modem"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter modem details" />
                    </Form.Item>

                    <Form.Item
                        name="fax"
                        label="Fax"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter fax details" />
                    </Form.Item>

                    <Form.Item
                        name="laserPrinter"
                        label="Laser Printer"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter laser printer details" />
                    </Form.Item>

                    <Form.Item
                        name="photocopier"
                        label="Photocopier"
                        rules={[{ max: 255, message: 'Cannot exceed 255 characters!' }]}
                    >
                        <Input placeholder="Enter photocopier details" />
                    </Form.Item>

                    <Form.Item
                        name="others"
                        label="Others"
                        rules={[{ max: 500, message: 'Cannot exceed 500 characters!' }]}
                    >
                        <Input.TextArea placeholder="Enter other details" rows={4} />
                    </Form.Item>

                    {/* Action Buttons */}
                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Listing' : 'Add New Listing'}
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

export default forwardRef(AddEditBcmSystemListingForm);
