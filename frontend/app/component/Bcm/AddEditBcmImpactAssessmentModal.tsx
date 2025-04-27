import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal'; // Assuming CustomModal is used for modal structure
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmImpactAssessmentDTO } from '@/app/types/api';
import AddEditBcmImpactAssessmentForm from './AddEditBcmImpactAssessmentForm';

interface AddEditBcmImpactAssessmentModalProps {
    visible: boolean;
    initialValues?: Partial<BcmImpactAssessmentDTO>;
    onSubmit: (values: BcmImpactAssessmentDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmImpactAssessmentModal: React.FC<AddEditBcmImpactAssessmentModalProps> = ({
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
                {initialValues ? 'Update Impact Assessment' : 'Save New Impact Assessment'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Impact Assessment' : 'Add New Impact Assessment'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Impact Assessment', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmImpactAssessmentForm
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

export default AddEditBcmImpactAssessmentModal;
