import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { RiskRegistry } from '../../types/api/RiskRegistry';
import { updateRiskRegistry } from '../../services/api/riskRegistryApi';

interface ApproveRiskRegistryProps {
    open: boolean;
    onClose: () => void;
    riskRegistry: RiskRegistry | null;
    onUpdate: (page: number) => void;
}

const ApproveRiskRegistry: React.FC<ApproveRiskRegistryProps> = ({ open, onClose, riskRegistry, onUpdate }) => {
    const [loading, setLoading] = useState<boolean>(false);

    if (!riskRegistry) return null;

    const handleApprove = async () => {
        setLoading(true);
        try {
            await updateRiskRegistry(`${riskRegistry.id}`, { ...riskRegistry, status: 'Approved' } as any);
            message.success('Risk registry approved successfully');
            onUpdate(1); // Update first page by default
            onClose();
        } catch (error) {
            console.error('Error approving data:', error);
            message.error('Error approving risk registry');
        }
        setLoading(false);
    };

    return (
        <Modal
            open={open}
            title="Approve Risk Registry"
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleApprove}>
                    Approve
                </Button>
            ]}
        >
            <p>Are you sure you want to approve this risk registry?</p>
        </Modal>
    );
};

export default ApproveRiskRegistry;
