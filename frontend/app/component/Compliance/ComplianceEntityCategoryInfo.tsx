import React from 'react';
import { Descriptions, Card, Divider } from 'antd';
import { ComplianceEntityCategoryPojo } from '@/app/types/api';

interface ComplianceEntityCategoryInfoProps {
    data: ComplianceEntityCategoryPojo;
}

const ComplianceEntityCategoryInfo: React.FC<ComplianceEntityCategoryInfoProps> = ({ data }) => {
    return (
        <div>
            <Card title="Category Details">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Code">{data.code}</Descriptions.Item>
                    <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {new Date(data.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {new Date(data.updatedAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Divider />
        </div>
    );
};

export default ComplianceEntityCategoryInfo;
