import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { RiskIndicatorDto } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditRiskIndicatorForm from './AddEditRiskIndicatorForm';

interface AddEditRiskIndicatorModalProps {
    visible: boolean;
    initialValues?: Partial<RiskIndicatorDto>;
    onSubmit: (values: Partial<RiskIndicatorDto>) => Promise<void>;
    onCancel: () => void;
    width: string; // Add width prop
    height: string; // Add height prop
    data: { customData: string }; // Add data prop
}

const AddEditRiskIndicatorModal: React.FC<AddEditRiskIndicatorModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
    width,
    height,
    data
}) => {
    const formRef = useRef<any>(null);

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const handleCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        }
    };

    const customFooter = (
        <div key="footer" className="modal-footer">
            <Button key="cancel" onClick={handleCancel} icon={<CloseCircleOutlined />} style={{ marginRight: '8px' }}>
                Close
            </Button>
            <Button key="submit" type="primary" onClick={handleSubmit} icon={initialValues ? <EditFilled /> : <FileAddFilled />} style={{ marginLeft: '8px' }}>
                {initialValues ? 'Update' : 'Add'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Risk Indicator' : 'Add Risk Indicator'}
            onCancel={handleCancel}
            footer={customFooter}
            width={width} // Pass width prop
            height={height} // Pass height prop
            data={data} // Pass data prop
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Risk Indicator', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form"> {/* Wrapper to make form scrollable */}
                <AddEditRiskIndicatorForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false} // Hide form action buttons
                    context="table"
                />
            </div>
        </CustomModal>
    );
};

export default AddEditRiskIndicatorModal;
