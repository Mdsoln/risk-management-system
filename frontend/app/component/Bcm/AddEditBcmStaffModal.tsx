import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmStaffDTO } from '@/app/types/api';
import AddEditBcmStaffForm from './AddEditBcmStaffForm';

interface AddEditBcmStaffModalProps {
    visible: boolean;
    initialValues?: Partial<BcmStaffDTO>;
    onSubmit: (values: BcmStaffDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmStaffModal: React.FC<AddEditBcmStaffModalProps> = ({
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
                {initialValues ? 'Update Staff' : 'Save New Staff'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Staff' : 'Add New Staff'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Staff', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmStaffForm
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

export default AddEditBcmStaffModal;
