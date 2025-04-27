import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { BcmSystemListingDTO } from '@/app/types/api';
import { EditOutlined, FileAddOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditBcmSystemListingForm from './AddEditBcmSystemListingForm';

interface AddEditBcmSystemListingModalProps {
    visible: boolean;
    initialValues?: Partial<BcmSystemListingDTO>;
    onSubmit: (values: BcmSystemListingDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmSystemListingModal: React.FC<AddEditBcmSystemListingModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Submit form handler
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Cancel modal handler
    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Modal Footer
    const customFooter = (
        <div className="modal-footer">
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
                icon={initialValues ? <EditOutlined /> : <FileAddOutlined />}
            >
                {initialValues ? 'Update Listing' : 'Add Listing'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit System Listing' : 'Add New System Listing'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            icon={initialValues ? <EditOutlined /> : <FileAddOutlined />}
            modalType={{ lineOne: 'System Listing', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmSystemListingForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide action buttons in the form inside the modal
                />
            </div>
        </CustomModal>
    );
};

export default AddEditBcmSystemListingModal;
