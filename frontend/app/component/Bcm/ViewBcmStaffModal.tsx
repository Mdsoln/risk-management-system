import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmStaffPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmStaffModalProps {
    visible: boolean;
    data: BcmStaffPojo | null;
    onClose: () => void;
}

const ViewBcmStaffModal: React.FC<ViewBcmStaffModalProps> = ({ visible, data, onClose }) => {
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
            title={`Staff Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Staff', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Role">{data.role}</Descriptions.Item>
                <Descriptions.Item label="Mobile Number">{data.mobileNumber}</Descriptions.Item>
                <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
                <Descriptions.Item label="Alternate Contact Person">{data.alternateContactPerson || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Alternate Location">{data.alternateLocation || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Next of Kin">{data.nextOfKin || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmStaffModal;
