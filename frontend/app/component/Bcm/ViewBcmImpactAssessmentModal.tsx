import React from 'react';
import { Button, Descriptions, Modal, Space } from 'antd';
import { BcmImpactAssessmentPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Assuming CustomModal is used for modal structure
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmImpactAssessmentModalProps {
    visible: boolean;
    data: BcmImpactAssessmentPojo | null;
    onClose: () => void;
}

const ViewBcmImpactAssessmentModal: React.FC<ViewBcmImpactAssessmentModalProps> = ({ visible, data, onClose }) => {
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
            title={`Impact Assessment Details - ${data.impactType}`}
            onCancel={onClose}
            footer={customFooter}
            width="60%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Impact Assessment', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Impact Type">{data.impactType}</Descriptions.Item>
                <Descriptions.Item label="Severity Level">{data.severityLevel}</Descriptions.Item>
                <Descriptions.Item label="Time to Recover">{data.timeToRecover}</Descriptions.Item>
                {/* Conditionally render Process if it exists */}
                {data.process ? (
                    <Descriptions.Item label="Process">{data.process.name}</Descriptions.Item>
                ) : (
                    <Descriptions.Item label="Process">No Process Assigned</Descriptions.Item>
                )}
                {/* Conditionally render Sub-Process if it exists */}
                {data.subProcess ? (
                    <Descriptions.Item label="Sub-Process">{data.subProcess.name}</Descriptions.Item>
                ) : (
                    <Descriptions.Item label="Sub-Process">No Sub-Process Assigned</Descriptions.Item>
                )}
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmImpactAssessmentModal;
