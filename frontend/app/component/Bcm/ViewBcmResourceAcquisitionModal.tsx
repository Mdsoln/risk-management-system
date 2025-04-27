import React from 'react';
import { Button, Descriptions, Modal, Space, Tag } from 'antd';
import { BcmResourceAcquisitionPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmResourceAcquisitionModalProps {
    visible: boolean;
    data: BcmResourceAcquisitionPojo | null;
    onClose: () => void;
}

const ViewBcmResourceAcquisitionModal: React.FC<ViewBcmResourceAcquisitionModalProps> = ({
    visible,
    data,
    onClose,
}) => {
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
            title={`Resource Acquisition Details - ${data.resource}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Resource Acquisition', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Resource">{data.resource}</Descriptions.Item>
                <Descriptions.Item label="Quantity Needed">{data.qtyNeeded}</Descriptions.Item>
                <Descriptions.Item label="Quantity Available">{data.qtyAvailable}</Descriptions.Item>
                <Descriptions.Item label="Quantity To Get">{data.qtyToGet}</Descriptions.Item>
                <Descriptions.Item label="Source">{data.source || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={data.done ? 'green' : 'volcano'}>
                        {data.done ? 'Completed' : 'Pending'}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmResourceAcquisitionModal;
