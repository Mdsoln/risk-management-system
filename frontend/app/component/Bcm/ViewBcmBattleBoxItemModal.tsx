import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmBattleBoxItemPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmBattleBoxItemModalProps {
    visible: boolean;
    data: BcmBattleBoxItemPojo | null;
    onClose: () => void;
}

const ViewBcmBattleBoxItemModal: React.FC<ViewBcmBattleBoxItemModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    if (!data) {
        return null;
    }

    // Modal footer
    const customFooter = (
        <Space>
            <Button onClick={onClose}>Close</Button>
        </Space>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Battle Box Item Details - ${data.itemName}`}
            onCancel={onClose}
            footer={customFooter}
            width="50%"
            height="70vh"

            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Battle Box Item', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Item Name">{data.itemName}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{data.quantity}</Descriptions.Item>
                <Descriptions.Item label="Location">{data.location || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Last Updated">{data.lastUpdated}</Descriptions.Item>
                <Descriptions.Item label="Responsible Person">{data.responsiblePerson}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmBattleBoxItemModal;
