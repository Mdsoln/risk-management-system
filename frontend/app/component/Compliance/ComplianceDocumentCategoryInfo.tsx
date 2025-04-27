import React from 'react';
import { Card, Descriptions } from 'antd';
import { ComplianceDocumentCategoryPojo } from '@/app/types/api';

interface ComplianceDocumentCategoryInfoProps {
    data: ComplianceDocumentCategoryPojo;
}

const ComplianceDocumentCategoryInfo: React.FC<ComplianceDocumentCategoryInfoProps> = ({ data }) => {
    return (
        <Card title="Compliance Document Category Details" bordered>
            <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
                <Descriptions.Item label="Code">{data.code}</Descriptions.Item>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ComplianceDocumentCategoryInfo;
