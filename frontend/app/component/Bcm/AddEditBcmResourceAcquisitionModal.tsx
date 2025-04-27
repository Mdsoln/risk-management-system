import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { BcmResourceAcquisitionDTO } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditBcmResourceAcquisitionForm from './AddEditBcmResourceAcquisitionForm';

interface AddEditBcmResourceAcquisitionModalProps {
    visible: boolean;
    initialValues?: Partial<BcmResourceAcquisitionDTO>;
    onSubmit: (values: BcmResourceAcquisitionDTO) => Promise<void>;
    onCancel: () => void;
}

const AddEditBcmResourceAcquisitionModal: React.FC<AddEditBcmResourceAcquisitionModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    // Handle Submit
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Handle Cancel
    const handleModalCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Custom Footer
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
                {initialValues ? 'Update Resource' : 'Save New Resource'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Resource Acquisition' : 'Add New Resource Acquisition'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Resource Acquisition', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBcmResourceAcquisitionForm
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

export default AddEditBcmResourceAcquisitionModal;
