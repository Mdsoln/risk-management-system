import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmDamageAssessmentDTO } from '@/app/types/api';
import AddEditBcmDamageAssessmentForm from './AddEditBcmDamageAssessmentForm';

interface AddEditBcmDamageAssessmentModalProps {
    visible: boolean;
    initialValues?: Partial<BcmDamageAssessmentDTO>;
    onSubmit: (values: BcmDamageAssessmentDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmDamageAssessmentModal: React.FC<AddEditBcmDamageAssessmentModalProps> = ({
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
                {initialValues ? 'Update Assessment' : 'Save New Assessment'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Damage Assessment' : 'Add New Damage Assessment'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Damage Assessment', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmDamageAssessmentForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide form action buttons inside modal
                />
            </div>
        </CustomModal>
    );
};

export default AddEditBcmDamageAssessmentModal;
