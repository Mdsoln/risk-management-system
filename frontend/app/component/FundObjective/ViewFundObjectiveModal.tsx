import React from 'react';
import { Button, Descriptions, Space } from 'antd';
import { FundObjectivePojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewFundObjectiveModalProps {
    visible: boolean;
    data: FundObjectivePojo | null;
    onClose: () => void;
}

const ViewFundObjectiveModal: React.FC<ViewFundObjectiveModalProps> = ({ visible, data, onClose }) => {
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
            title={`Fund Objective Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Fund Objective', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                <Descriptions.Item label="Start Date and Time">{data.startDateTime}</Descriptions.Item>
                <Descriptions.Item label="End Date and Time">{data.endDateTime}</Descriptions.Item>
                {/* <Descriptions.Item label="Created At">{data.createdAt || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{data.updatedAt || 'N/A'}</Descriptions.Item> */}
            </Descriptions>
        </CustomModal>
    );
};

export default ViewFundObjectiveModal;
