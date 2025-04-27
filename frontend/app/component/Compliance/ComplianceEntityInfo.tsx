import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import { ComplianceEntityPojo } from '@/app/types/api';

interface ComplianceEntityInfoProps {
    data: ComplianceEntityPojo;
}

const ComplianceEntityInfo: React.FC<ComplianceEntityInfoProps> = ({ data }) => {
    return (
        <div>
            {/* Compliance Entity Details */}
            <Card title="Compliance Entity Details">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            {/* Compliance Entity Category Details */}
            <Card title="Category Details">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Category ID">{data.category.id}</Descriptions.Item>
                    <Descriptions.Item label="Category Name">{data.category.name}</Descriptions.Item>
                    <Descriptions.Item label="Category Description">{data.category.description}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default ComplianceEntityInfo;
