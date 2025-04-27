import React, { useRef } from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined, FileAddFilled, EditFilled } from '@ant-design/icons';
import CustomModal from '../Modal/CustomModal';
import { BcmPhoneDirectoryDTO } from '@/app/types/api';
import AddEditBcmPhoneDirectoryForm from './AddEditBcmPhoneDirectoryForm';

interface AddEditBcmPhoneDirectoryModalProps {
    visible: boolean;
    initialValues?: Partial<BcmPhoneDirectoryDTO>;
    onSubmit: (values: BcmPhoneDirectoryDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmPhoneDirectoryModal: React.FC<AddEditBcmPhoneDirectoryModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Submit form
    const handleSubmit = () => {
        formRef.current?.submit();
    };

    // Cancel form
    const handleModalCancel = () => {
        formRef.current?.handleCancel();
    };

    const customFooter = (
        <div>
            <Button
                key="cancel"
                onClick={handleModalCancel}
                icon={<CloseCircleOutlined />}
                style={{ marginRight: '8px' }}
            >
                Cancel
            </Button>
            <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            >
                {initialValues ? 'Update Entry' : 'Add New Entry'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Phone Directory Entry' : 'Add New Phone Directory Entry'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="50%"
            height="60vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Phone Directory', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <AddEditBcmPhoneDirectoryForm
                ref={formRef}
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                showActionButtons={false} // Hide buttons in the form; use modal buttons instead
            />
        </CustomModal>
    );
};

export default AddEditBcmPhoneDirectoryModal;
