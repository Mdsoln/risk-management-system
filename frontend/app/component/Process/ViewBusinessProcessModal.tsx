import React from 'react';
import { Button, Descriptions, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BusinessProcessPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal

interface ViewBusinessProcessModalProps {
    visible: boolean;
    data: BusinessProcessPojo | null;
    onClose: () => void;
}

const ViewBusinessProcessModal: React.FC<ViewBusinessProcessModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    if (!data) {
        return null; // No data, don't render anything
    }

    // Modal Footer
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
                <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                <Descriptions.Item label="Start Date">{data.startDateTime}</Descriptions.Item>
                <Descriptions.Item label="End Date">{data.endDateTime}</Descriptions.Item>
                <Descriptions.Item label="Owner Department">
                    {data.businessProcessOwnerDepartment?.name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Fund Objective">
                    {data.fundObjective?.name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">{data.createdBy}</Descriptions.Item>
                <Descriptions.Item label="Updated By">{data.updatedBy}</Descriptions.Item>
                <Descriptions.Item label="Created At">{data.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{data.updatedAt}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBusinessProcessModal;
