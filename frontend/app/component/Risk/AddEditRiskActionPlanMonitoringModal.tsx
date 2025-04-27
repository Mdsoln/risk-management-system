import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import { RiskActionPlanMonitoringDto } from '@/app/types/api';
import AddEditRiskActionPlanMonitoringForm from './AddEditRiskActionPlanMonitoringForm';

interface AddEditRiskActionPlanMonitoringModalProps {
    visible: boolean;
    initialValues?: Partial<RiskActionPlanMonitoringDto>;
    onSubmit: (values: Partial<RiskActionPlanMonitoringDto>) => void;
    onCancel: () => void;
}

const AddEditRiskActionPlanMonitoringModal: React.FC<AddEditRiskActionPlanMonitoringModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const formRef = useRef<any>(null);

    const handleOk = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const handleCancel = () => {
        if (formRef.current) {
            formRef.current.handleCancel();
        }
    };

    return (
        <Modal
            visible={visible}
            title={initialValues?.id ? 'Edit Risk Action Plan Monitoring' : 'Add Risk Action Plan Monitoring'}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {initialValues?.id ? 'Update' : 'Add'}
                </Button>,
            ]}
        >
            <AddEditRiskActionPlanMonitoringForm
                ref={formRef}
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </Modal>
    );
};

export default AddEditRiskActionPlanMonitoringModal;
