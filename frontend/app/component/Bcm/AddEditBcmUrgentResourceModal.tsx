import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmUrgentResourceDTO } from '@/app/types/api';
import AddEditBcmUrgentResourceForm from './AddEditBcmUrgentResourceForm';

interface AddEditBcmUrgentResourceModalProps {
    visible: boolean;
    initialValues?: Partial<BcmUrgentResourceDTO>;
    onSubmit: (values: BcmUrgentResourceDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmUrgentResourceModal: React.FC<AddEditBcmUrgentResourceModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Handle form submission
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Handle modal cancel
    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Modal footer buttons
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
                {initialValues ? 'Update Resource' : 'Add New Resource'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Urgent Resource' : 'Add New Urgent Resource'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Urgent Resource', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmUrgentResourceForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide form action buttons in modal
                />
            </div>
        </CustomModal>
    );
};

export default AddEditBcmUrgentResourceModal;
