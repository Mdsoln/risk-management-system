import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import { RiskActionPlanDto } from '@/app/types/api';
import AddEditRiskActionPlanForm from './AddEditRiskActionPlanForm'; // Import the form component

interface AddEditRiskActionPlanModalProps {
    visible: boolean;
    initialValues: Partial<RiskActionPlanDto>;
    onSubmit: (values: Partial<RiskActionPlanDto>) => Promise<void>;
    onCancel: () => void;
    width: string;  // Set modal width
    height: string;  // Set modal height
    context: 'individual' | 'table';  // Add context prop
}

const AddEditRiskActionPlanModal: React.FC<AddEditRiskActionPlanModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
    width,
    height,
    context,
}) => {
    const formRef = useRef<any>(null);

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    return (
        <Modal
            visible={visible}
            title={initialValues.id ? 'Edit Risk Action Plan' : 'Add Risk Action Plan'}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {initialValues.id ? 'Update' : 'Add'}
                </Button>,
            ]}
            width={width}
            bodyStyle={{ maxHeight: height, overflowY: 'auto' }}  // Set modal body height
        >
            <AddEditRiskActionPlanForm
                ref={formRef}
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                context={context}  // Pass the context to the form
            />
        </Modal>
    );
};

export default AddEditRiskActionPlanModal;
