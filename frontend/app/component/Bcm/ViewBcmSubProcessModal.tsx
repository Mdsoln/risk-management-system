import React from 'react';
import { Button, Descriptions, Space } from 'antd';
import { BcmSubProcessPojo } from '@/app/types/api';
import { InfoCircleOutlined } from '@ant-design/icons';
import CustomModal from '../Modal/CustomModal'; // CustomModal is assumed to be used

interface ViewBcmSubProcessModalProps {
    visible: boolean;
    data: BcmSubProcessPojo | null;
    onClose: () => void;
}

const ViewBcmSubProcessModal: React.FC<ViewBcmSubProcessModalProps> = ({ visible, data, onClose }) => {
    if (!data) {
        return null;
    }

    const customFooter = (
        <Space>
            <Button onClick={onClose}>Close</Button>
        </Space>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Sub-Process Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Sub-Process', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Priority Ranking">{data.priorityRanking}</Descriptions.Item>
                <Descriptions.Item label="RTO">{data.rto}</Descriptions.Item>
                <Descriptions.Item label="RPO">{data.rpo}</Descriptions.Item>
                <Descriptions.Item label="Dependencies">{data.dependencies || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Responsible Parties">{data.responsibleParties || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Quantitative Impact">{data.quantitativeImpact || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Process Name">{data.process.name}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmSubProcessModal;
