import React from 'react';
import { Modal, Button, Descriptions, Skeleton } from 'antd';
import { ComplianceEntityCategoryDTO } from '@/app/types/api';

interface ComplianceEntityCategoryViewDetailProps {
    visible: boolean;
    data: ComplianceEntityCategoryDTO | null;
    onClose: () => void;
}

const ComplianceEntityCategoryViewDetail: React.FC<ComplianceEntityCategoryViewDetailProps> = ({
    visible,
    data,
    onClose,
}) => {
    return (
        <Modal
            title={`Category Details: ${data ? data.name : ''}`}
            open={visible} // Ant Design v4+ uses 'open' instead of 'visible'
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {data ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Code">{data.code}</Descriptions.Item>
                    <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                </Descriptions>
            ) : (
                <Skeleton active />
            )}
        </Modal>
    );
};

export default ComplianceEntityCategoryViewDetail;
