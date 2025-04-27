import React from 'react';
import { Button, Descriptions, Space } from 'antd';
import { BcmProcessPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmProcessModalProps {
    visible: boolean;
    data: BcmProcessPojo | null;
    onClose: () => void;
}

const ViewBcmProcessModal: React.FC<ViewBcmProcessModalProps> = ({ visible, data, onClose }) => {
    if (!data) {
        return null;
    }

    // Custom modal footer
    const customFooter = (
        <Space>
            <Button onClick={onClose}>Close</Button>
        </Space>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Process Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Process', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Priority Ranking">{data.priorityRanking}</Descriptions.Item>
                <Descriptions.Item label="RTO">{data.rto}</Descriptions.Item>
                <Descriptions.Item label="RPO">{data.rpo}</Descriptions.Item>
                <Descriptions.Item label="Dependencies">{data.dependencies || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Responsible Parties">{data.responsibleParties || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Department">{data.department.name}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmProcessModal;
