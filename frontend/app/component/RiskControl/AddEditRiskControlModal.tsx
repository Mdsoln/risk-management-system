// AddEditRiskControlModal.tsx

import React from 'react';
import { Modal } from 'antd';
import { RiskControlDto } from '@/app/types/api';
import AddEditRiskControlForm from './AddEditRiskControlForm';

interface AddEditRiskControlModalProps {
    visible: boolean;
    initialValues?: Partial<RiskControlDto>;
    riskId: string;
    onSubmit: (values: Partial<RiskControlDto>) => Promise<void>;
    onCancel: () => void;
    context: 'individual' | 'table';
}

const AddEditRiskControlModal: React.FC<AddEditRiskControlModalProps> = ({
    visible,
    initialValues,
    riskId,
    onSubmit,
    onCancel,
    context,
}) => {
    return (
        <Modal
            open={visible}
            title={initialValues ? 'Edit Risk Control' : 'Add Risk Control'}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <AddEditRiskControlForm
                initialValues={{ ...initialValues, riskId }}
                onSubmit={onSubmit}
                onCancel={onCancel}
                context={context}  // Pass the context prop here
            />
        </Modal>
    );
};

export default AddEditRiskControlModal;
