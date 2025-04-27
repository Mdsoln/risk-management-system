import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import AddEditRiskForm from './AddEditRiskForm';
import { Risk, RiskDto } from '@/app/types/api';
import './AddEditRiskModal.css'; // Import custom CSS
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';

interface AddEditRiskModalProps {
    visible: boolean;
    initialValues?: Partial<Risk>;
    onSubmit: (values: Partial<RiskDto>) => Promise<void>;
    onCancel: () => void;
}

const AddEditRiskModal: React.FC<AddEditRiskModalProps> = ({ visible, initialValues, onSubmit, onCancel }) => {
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

    const customFooter = (
        <div key="footer" className="modal-footer">
            <Button key="cancel" onClick={handleModalCancel} icon={<CloseCircleOutlined />} style={{ marginRight: '8px' }}>
                Close
            </Button>
            <Button key="submit" type="primary" onClick={handleSubmit} icon={initialValues ? <EditFilled /> : <FileAddFilled />} style={{ marginLeft: '8px' }}>
                {initialValues ? 'Update Risk Changes' : 'Save New Risk '}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Risk' : 'Add New Risk'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="85%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Risk', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form"> {/* Wrapper to make form scrollable */}
                <AddEditRiskForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide form action buttons
                />
            </div>
        </CustomModal>
    );
};

export default AddEditRiskModal;
