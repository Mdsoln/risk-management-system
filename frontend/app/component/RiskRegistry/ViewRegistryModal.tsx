import React from 'react';
import { Modal, Descriptions } from 'antd';
import { RiskRegistryPojo } from '@/app/types/api';

interface ViewRegistryModalProps {
    visible: boolean;
    data: RiskRegistryPojo | null;
    onClose: () => void;
}

const ViewRegistryModal: React.FC<ViewRegistryModalProps> = ({ visible, data, onClose }) => {
    return (
        <Modal
            title="Risk Registry Details"
            visible={visible}
            onCancel={onClose}
            footer={null} // No footer buttons
            width={600}
        >
            {data ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Registry ID">{data.id}</Descriptions.Item>
                    <Descriptions.Item label="Risk ID">{data.riskId}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>No data available.</p>
            )}
        </Modal>
    );
};

export default ViewRegistryModal;
