import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmSupplierPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmSupplierModalProps {
    visible: boolean;
    data: BcmSupplierPojo | null;
    onClose: () => void;
}

const ViewBcmSupplierModal: React.FC<ViewBcmSupplierModalProps> = ({ visible, data, onClose }) => {
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
            title={`Supplier Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Supplier', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Work Phone">{data.phoneWork || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Home Phone">{data.phoneHome || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Mobile Phone">{data.phoneMobile || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmSupplierModal;
