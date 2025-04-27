import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { RiskIndicatorActionPlanDto } from '@/app/types/api';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import AddEditRiskIndicatorActionPlanForm from './AddEditRiskIndicatorActionPlanForm';

interface AddEditRiskIndicatorActionPlanFormModalProps {
    visible: boolean;
    initialValues?: Partial<RiskIndicatorActionPlanDto>;
    onSubmit: (values: Partial<RiskIndicatorActionPlanDto>) => Promise<void>;
    onCancel: () => void;
    width: string;
    height: string;
    context?: "table" | "individual";  // Fix the type here
}

const AddEditRiskIndicatorActionPlanFormModal: React.FC<AddEditRiskIndicatorActionPlanFormModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
    width,
    height,
    context = "individual",  // Ensure context is either "table" or "individual"
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
            title={initialValues ? 'Edit Action Plan' : 'Add Action Plan'}
            onCancel={handleCancel}
            footer={customFooter}
            width={width}
            height={height}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Action Plan', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditRiskIndicatorActionPlanForm
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    showActionButtons={false}
                    context={context}  // Pass the fixed context
                />
            </div>
        </CustomModal>
    );
};

export default AddEditRiskIndicatorActionPlanFormModal;
