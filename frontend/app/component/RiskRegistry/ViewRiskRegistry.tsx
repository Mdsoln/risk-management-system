import React from 'react';
import { Modal } from 'antd';
import { RiskRegistry } from '../../types/api/RiskRegistry';

interface ViewRiskRegistryProps {
    open: boolean;
    onClose: () => void;
    riskRegistry: RiskRegistry | null;
}

const ViewRiskRegistry: React.FC<ViewRiskRegistryProps> = ({ open, onClose, riskRegistry }) => {
    if (!riskRegistry) return null;

    return (
        <Modal
            open={open}
            title="View Risk Registry"
            onCancel={onClose}
            footer={null}
        >
            <p><strong>ID:</strong> {riskRegistry.id}</p>
            <p><strong>Name:</strong> {riskRegistry.name}</p>
            <p><strong>Description:</strong> {riskRegistry.description}</p>
            <p><strong>Category:</strong> {riskRegistry.category}</p>
            <p><strong>Likelihood:</strong> {riskRegistry.likelihood}</p>
            <p><strong>Impact:</strong> {riskRegistry.impact}</p>
            <p><strong>Status:</strong> {riskRegistry.status}</p>
            <p><strong>Owner:</strong> {riskRegistry.owner}</p>
            <p><strong>Created At:</strong> {new Date(riskRegistry.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(riskRegistry.updatedAt).toLocaleDateString()}</p>
        </Modal>
    );
};

export default ViewRiskRegistry;
