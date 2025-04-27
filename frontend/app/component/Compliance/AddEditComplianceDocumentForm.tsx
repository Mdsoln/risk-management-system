import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Skeleton, message, Modal, Card } from 'antd';
import {
    ComplianceDocumentDTO,
    RegulatoryComplianceMatrixDTO,
    RegulatoryComplianceMatrixSectionDTO,
} from '@/app/types/api';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { getComplianceDocumentCategories } from '@/app/services/api/complianceDocumentCategoryApi';
import { getDepartments } from '@/app/services/api/departmentApi';
import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';
import { getComplianceEntities } from '@/app/services/api/ComplianceEntityApi';
import ComplianceMatrixListTable from './ComplianceMatrixListTable';

interface AddEditComplianceDocumentFormProps {
    initialValues?: Partial<ComplianceDocumentDTO>;
    onSubmit: (values: ComplianceDocumentDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    showActionButtons?: boolean;
}

const AddEditComplianceDocumentForm: React.ForwardRefRenderFunction<any, AddEditComplianceDocumentFormProps> = (
    { initialValues, onSubmit, onCancel, loading, showActionButtons },
    ref
) => {
    const [form] = Form.useForm();
    const [errorState, setErrorState] = useState<any>(null);
    const [entities, setEntities] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    // State for Compliance Matrices with Sections
    const [complianceMatrices, setComplianceMatrices] = useState<RegulatoryComplianceMatrixDTO[]>(
        initialValues?.complianceMatrices || []
    );

    // Fetch dropdown options
    const fetchDropdownData = async () => {
        try {
            setFetching(true);
            const [entitiesData, categoriesData, departmentsData] = await Promise.all([
                getComplianceEntities(0, 100),
                getComplianceDocumentCategories(0, 100),
                getDepartments(),
            ]);
            setEntities(entitiesData.items);
            setCategories(categoriesData.items);
            setDepartments(departmentsData);
            setFetching(false);
        } catch (error) {
            message.error('Error fetching dropdown data.');
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = async (values: ComplianceDocumentDTO) => {
        setErrorState(null);
        try {
            const updatedValues: ComplianceDocumentDTO = {
                ...values,
                complianceMatrices, // Attach matrices with sections here
            };
            await onSubmit(updatedValues);
            message.success('Document saved successfully!');
        } catch (error) {
            handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
            message.error('Error saving the document.');
        }
    };

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
                    name="add_edit_compliance_document_form"
                    onFinish={handleFinish}
                >
                    {errorState && (
                        <div className="error-display-container">
                            <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />
                        </div>
                    )}

                    <Form.Item
                        name="name"
                        label="Document Name"
                        rules={[
                            { required: true, message: 'Name is required!' },
                            { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter document name" />
                    </Form.Item>

                    <Form.Item
                        name="year"
                        label="Year"
                        rules={[
                            { required: true, message: 'Year is required!' },
                            { type: 'number', min: 1900, max: 2100, message: 'Enter a valid year between 1900 and 2100!' },
                        ]}
                    >
                        <InputNumber placeholder="Enter document year" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Description is required!' },
                            { min: 10, max: 5000, message: 'Description must be between 10 and 5000 characters!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter document description" rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="entityId"
                        label="Entity"
                        rules={[{ required: true, message: 'Entity is required!' }]}
                    >
                        <Select placeholder="Select an entity">
                            {entities.map((entity) => (
                                <Select.Option key={entity.id} value={entity.id}>
                                    {entity.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="documentCategoryId"
                        label="Document Category"
                        rules={[{ required: true, message: 'Document Category is required!' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="departmentId"
                        label="Department"
                        rules={[{ required: true, message: 'Department is required!' }]}
                    >
                        <Select placeholder="Select a department">
                            {departments.map((department) => (
                                <Select.Option key={department.id} value={department.id}>
                                    {department.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Compliance Matrices with Sections */}
                    <Card size="small" title="Compliance Matrices" className="form-card">
                        <ComplianceMatrixListTable
                            matrices={complianceMatrices}
                            onChange={setComplianceMatrices}
                        />
                    </Card>

                    {showActionButtons && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {initialValues ? 'Update Document' : 'Add New Document'}
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

export default forwardRef(AddEditComplianceDocumentForm);
