import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmPhoneDirectoryPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmPhoneDirectoryModalProps {
    visible: boolean;
    data: BcmPhoneDirectoryPojo | null;
    onClose: () => void;
}

const ViewBcmPhoneDirectoryModal: React.FC<ViewBcmPhoneDirectoryModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    if (!data) {
        return null; // Handle case where data is null
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
            title={`Phone Directory Details - ${data.roleName}`}
            onCancel={onClose}
            footer={customFooter}
            width="50%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Phone Directory', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Role/Name">{data.roleName}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{data.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Room">{data.room || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmPhoneDirectoryModal;
