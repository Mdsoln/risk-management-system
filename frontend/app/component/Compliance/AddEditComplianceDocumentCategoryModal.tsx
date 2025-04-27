import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { ComplianceDocumentCategoryDTO } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditComplianceDocumentCategoryForm from './AddEditComplianceDocumentCategoryForm';

interface AddEditComplianceDocumentCategoryModalProps {
    visible: boolean;
    initialValues?: Partial<ComplianceDocumentCategoryDTO>;
    onSubmit: (values: ComplianceDocumentCategoryDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditComplianceDocumentCategoryModal: React.FC<AddEditComplianceDocumentCategoryModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Submit Form
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Cancel Modal
    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Modal Footer Actions
    const customFooter = (
        <div key="footer" className="modal-footer">
            <Button
                key="cancel"
                onClick={handleModalCancel}
                icon={<CloseCircleOutlined />}
                style={{ marginRight: '8px' }}
            >
                Close
            </Button>
            <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                icon={initialValues ? <EditFilled /> : <FileAddFilled />}
                style={{ marginLeft: '8px' }}
            >
                {initialValues ? 'Update Category' : 'Save New Category'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Compliance Document Category' : 'Add New Compliance Document Category'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Compliance Document Category', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditComplianceDocumentCategoryForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide form action buttons inside the modal
                />
            </div>
        </CustomModal>
    );
};

export default AddEditComplianceDocumentCategoryModal;
