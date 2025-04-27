import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { ComplianceEntityDTO } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditComplianceEntityForm from './AddEditComplianceEntityForm';

interface AddEditComplianceEntityModalProps {
    visible: boolean;
    initialValues?: Partial<ComplianceEntityDTO>;
    onSubmit: (values: ComplianceEntityDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditComplianceEntityModal: React.FC<AddEditComplianceEntityModalProps> = ({
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
                {initialValues ? 'Update Entity' : 'Save New Entity'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Compliance Entity' : 'Add New Compliance Entity'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Compliance Entity', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditComplianceEntityForm
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

export default AddEditComplianceEntityModal;
