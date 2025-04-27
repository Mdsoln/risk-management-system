import React, { useRef } from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined, FileAddFilled, EditFilled } from '@ant-design/icons';
import CustomModal from '../Modal/CustomModal';
import { BcmPhoneListDTO } from '@/app/types/api';
import AddEditBcmPhoneListForm from './AddEditBcmPhoneListForm';

interface AddEditBcmPhoneListModalProps {
    visible: boolean;
    initialValues?: Partial<BcmPhoneListDTO>;
    onSubmit: (values: BcmPhoneListDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmPhoneListModal: React.FC<AddEditBcmPhoneListModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Submit form
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Cancel modal
    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Modal footer
    const customFooter = (
        <div>
            <Button key="cancel" onClick={handleModalCancel} icon={<CloseCircleOutlined />}>
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
            title={initialValues ? 'Edit Phone List Entry' : 'Add New Phone List Entry'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="50%"
            height="60vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Phone List', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <AddEditBcmPhoneListForm
                ref={formRef}
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                showActionButtons={false}
            />
        </CustomModal>
    );
};

export default AddEditBcmPhoneListModal;
