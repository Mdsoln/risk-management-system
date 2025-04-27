import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { StatusReportPojo } from '@/app/types/api';

import { InfoCircleOutlined } from '@ant-design/icons';
import CustomModal from '../Modal/CustomModal';

interface ViewStatusReportModalProps {
    visible: boolean;
    data: StatusReportPojo | null;
    onClose: () => void;
}

const ViewStatusReportModal: React.FC<ViewStatusReportModalProps> = ({ visible, data, onClose }) => {
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
            title={`Report Details - ${data.department.name}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Report', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Department">{data.department.name}</Descriptions.Item> {/* Updated field */}
                <Descriptions.Item label="Report Date">{data.reportDate}</Descriptions.Item>
                <Descriptions.Item label="Report Time">{data.reportTime}</Descriptions.Item>
                <Descriptions.Item label="Staff">{data.staff || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Customers">{data.customers || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Work In Progress">{data.workInProgress || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Financial Impact">{data.financialImpact || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Operating Conditions">{data.operatingConditions || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewStatusReportModal;
