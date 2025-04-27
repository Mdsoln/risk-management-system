import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { FundObjectiveDTO } from '@/app/types/api';
import AddEditFundObjectiveForm from './AddEditFundObjectiveForm';

interface AddEditFundObjectiveModalProps {
    visible: boolean;
    initialValues?: Partial<FundObjectiveDTO>;
    onSubmit: (values: FundObjectiveDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

const AddEditFundObjectiveModal: React.FC<AddEditFundObjectiveModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
    loading = false,
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
                loading={loading}
                style={{ marginLeft: '8px' }}
            >
                {initialValues ? 'Update Objective' : 'Save New Objective'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Fund Objective' : 'Add New Fund Objective'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Fund Objective', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditFundObjectiveForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    loading={loading}
                    showActionButtons={false} // Hide form action buttons inside modal
                />
            </div>
        </CustomModal>
    );
};

export default AddEditFundObjectiveModal;
