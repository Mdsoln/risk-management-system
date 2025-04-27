// AddEditBcmDependencyModal.tsx

import React, { useRef } from 'react';
import { Button } from 'antd';
import CustomModal from '../Modal/CustomModal';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmDependencyDTO } from '@/app/types/api';
import AddEditBcmDependencyForm from './AddEditBcmDependencyForm';

interface AddEditBcmDependencyModalProps {
    visible: boolean;
    initialValues?: Partial<BcmDependencyDTO>;
    onSubmit: (values: BcmDependencyDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmDependencyModal: React.FC<AddEditBcmDependencyModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    const isEdit = !!initialValues?.id;

    const customFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleModalCancel} icon={<CloseCircleOutlined />}>
                Close
            </Button>
            <Button
                type="primary"
                onClick={handleSubmit}
                icon={isEdit ? <EditFilled /> : <FileAddFilled />}
                style={{ marginLeft: '8px' }}
            >
                {isEdit ? 'Update Dependency' : 'Save New Dependency'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={isEdit ? 'Edit BCM Dependency' : 'Add New BCM Dependency'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="50%"
            height="50vh"
            icon={isEdit ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'BCM Dependency', lineTwo: isEdit ? 'Edit' : 'Add' }}
        >
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <AddEditBcmDependencyForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false}
                />
            </div>
        </CustomModal>
    );
};

export default AddEditBcmDependencyModal;
