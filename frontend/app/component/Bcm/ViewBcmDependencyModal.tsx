// ViewBcmDependencyModal.tsx

import React from 'react';
import { Descriptions, Space, Button } from 'antd';
import CustomModal from '../Modal/CustomModal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BcmDependencyPojo } from '@/app/types/api';

interface ViewBcmDependencyModalProps {
    visible: boolean;
    data: BcmDependencyPojo;
    onClose: () => void;
}

const ViewBcmDependencyModal: React.FC<ViewBcmDependencyModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    if (!data) return null;

    const customFooter = (
        <Space>
            <Button onClick={onClose}>Close</Button>
        </Space>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Dependency Details - ${data.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="50%"
            height="40vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'BCM Dependency', lineTwo: 'Details' }}
        >
            <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmDependencyModal;
