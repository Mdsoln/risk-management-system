import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal'; // Assuming CustomModal is a reusable modal component
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BcmSubProcessDTO } from '@/app/types/api';
import AddEditBcmSubProcessForm from './AddEditBcmSubProcessForm';

interface AddEditBcmSubProcessModalProps {
    visible: boolean;
    initialValues?: Partial<BcmSubProcessDTO>;
    onSubmit: (values: BcmSubProcessDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmSubProcessModal: React.FC<AddEditBcmSubProcessModalProps> = ({
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
                {initialValues ? 'Update Sub-Process' : 'Save New Sub-Process'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Sub-Process' : 'Add New Sub-Process'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Sub-Process', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmSubProcessForm
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

export default AddEditBcmSubProcessModal;
