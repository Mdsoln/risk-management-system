// import React, { useState, useImperativeHandle, forwardRef } from 'react';
// import { Form, Input, Button, message, Modal, Skeleton } from 'antd';
// import {
//     ComplianceEntityCategoryDTO,
//     ComplianceEntityCategoryPojo,
// } from '@/app/types/api';
// import {
//     addComplianceEntityCategory,
//     updateComplianceEntityCategory,
// } from '@/app/services/api/complianceEntityCategoryApi';
// import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
// import { handleErrorResponse, handleFormErrors } from '@/app/utils/errorHandler';

// interface AddEditComplianceEntityCategoryFormProps {
//     initialValues?: Partial<ComplianceEntityCategoryPojo>;
//     onCancel: () => void;
//     loading?: boolean;
//     showActionButtons?: boolean;
// }

// const AddEditComplianceEntityCategoryForm: React.ForwardRefRenderFunction<
//     any,
//     AddEditComplianceEntityCategoryFormProps
// > = ({ initialValues, onCancel, loading = false, showActionButtons = true }, ref) => {
//     const [form] = Form.useForm();
//     const [errorState, setErrorState] = useState<any>(null);

//     // Reset form when initial values change
//     React.useEffect(() => {
//         if (initialValues) {
//             form.setFieldsValue(initialValues);
//         } else {
//             form.resetFields();
//         }
//     }, [initialValues, form]);

//     // Form submit handler
//     const handleFinish = async (values: ComplianceEntityCategoryDTO) => {
//         setErrorState(null); // Clear previous errors

//         console.log(
//             "###################################"
//         )
//         console.log(
//             "###################################"
//         )
//         console.log(
//             "###################################"
//         )


//         try {
//             if (initialValues?.id) {
//                 // Update existing category
//                 await updateComplianceEntityCategory(initialValues.id, values);
//                 message.success('Category updated successfully!');
//             } else {
//                 // Add new category
//                 await addComplianceEntityCategory(values);
//                 message.success('Category added successfully!');
//             }

//             onCancel(); // Close the modal or form after success
//         } catch (error) {
//             handleErrorResponse(error, setErrorState, (errors) => handleFormErrors(errors, form), form);
//             message.error('An error occurred while saving the category.');
//         }
//     };

//     // Handle cancel
//     const handleCancel = () => {
//         if (form.isFieldsTouched()) {
//             Modal.confirm({
//                 title: 'Discard Changes?',
//                 content: 'You have unsaved changes. Are you sure you want to close the form? Your data will be lost.',
//                 okText: 'Yes',
//                 cancelText: 'No',
//                 onOk: () => {
//                     form.resetFields();
//                     onCancel();
//                 },
//             });
//         } else {
//             onCancel();
//         }
//     };

//     // Imperative handle for parent components
//     useImperativeHandle(ref, () => ({
//         submit: () => {
//             form.submit();
//         },
//         handleCancel: () => {
//             handleCancel();
//         },
//     }));

//     return (
//         <>
//             {loading ? (
//                 <Skeleton active />
//             ) : (
//                 <Form
//                     layout="vertical"
//                     form={form}
//                     initialValues={initialValues}
//                     name="add_edit_compliance_entity_category_form"
//                     onFinish={handleFinish}
//                 >
//                     {/* Error Display */}
//                     {errorState && (
//                         <div className="error-display-container">
//                             <ErrorDisplayAlert errorState={errorState} onClose={() => setErrorState(null)} />
//                         </div>
//                     )}

//                     {/* Form Fields */}
//                     <Form.Item
//                         name="code"
//                         label="Code"
//                         rules={[
//                             { required: true, message: 'Code is required!' },
//                             { min: 3, max: 50, message: 'Code must be between 3 and 50 characters!' },
//                         ]}
//                     >
//                         <Input placeholder="Enter category code" />
//                     </Form.Item>

//                     <Form.Item
//                         name="name"
//                         label="Name"
//                         rules={[
//                             { required: true, message: 'Name is required!' },
//                             { min: 3, max: 255, message: 'Name must be between 3 and 255 characters!' },
//                         ]}
//                     >
//                         <Input placeholder="Enter category name" />
//                     </Form.Item>

//                     <Form.Item
//                         name="description"
//                         label="Description"
//                         rules={[
//                             { required: true, message: 'Description is required!' },
//                             { min: 10, max: 5000, message: 'Description must be between 10 and 5000 characters!' },
//                         ]}
//                     >
//                         <Input.TextArea placeholder="Enter category description" rows={4} />
//                     </Form.Item>

//                     {/* Action Buttons */}
//                     {showActionButtons && (
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" loading={loading}>
//                                 {initialValues ? 'Update Category' : 'Add New Category'}
//                             </Button>
//                             <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
//                                 Cancel
//                             </Button>
//                         </Form.Item>
//                     )}
//                 </Form>
//             )}
//         </>
//     );
// };

// export default forwardRef(AddEditComplianceEntityCategoryForm);
