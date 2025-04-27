import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { ComplianceDocumentDTO } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditComplianceDocumentForm from './AddEditComplianceDocumentForm';

interface AddEditComplianceDocumentModalProps {
    visible: boolean;
    initialValues?: Partial<ComplianceDocumentDTO>;
    onSubmit: (values: ComplianceDocumentDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditComplianceDocumentModal: React.FC<AddEditComplianceDocumentModalProps> = ({
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
                {initialValues ? 'Update Document' : 'Save New Document'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Compliance Document' : 'Add New Compliance Document'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Compliance Document', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditComplianceDocumentForm
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

export default AddEditComplianceDocumentModal;
