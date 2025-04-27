import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmUrgentResourcePojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmUrgentResourceModalProps {
    visible: boolean;
    data: BcmUrgentResourcePojo | null;
    onClose: () => void;
}

const ViewBcmUrgentResourceModal: React.FC<ViewBcmUrgentResourceModalProps> = ({
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
            title={`Urgent Resource Details - ${data.resourceName}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Urgent Resource', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Resource Name">{data.resourceName}</Descriptions.Item>
                <Descriptions.Item label="Category">{data.category}</Descriptions.Item>
                <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
                <Descriptions.Item label="Quantity">{data.quantity}</Descriptions.Item>
                <Descriptions.Item label="Responsible Person">
                    {data.responsiblePerson || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Number">
                    {data.contactNumber || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {data.description || 'N/A'}
                </Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmUrgentResourceModal;
