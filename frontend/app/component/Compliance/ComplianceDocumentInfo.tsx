import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Divider, Skeleton, Table } from 'antd';
import {
    ComplianceDocumentPojo,
    RegulatoryComplianceMatrixPojo,
    RegulatoryComplianceMatrixSectionPojo,
} from '@/app/types/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import styles from './ComplianceDocumentInfo.module.css';

interface ComplianceDocumentInfoProps {
    data: ComplianceDocumentPojo | null;
    loading: boolean;
}

const ComplianceDocumentInfo: React.FC<ComplianceDocumentInfoProps> = ({ data, loading }) => {
    const [document, setDocument] = useState<ComplianceDocumentPojo | null>(data);

    useEffect(() => {
        setDocument(data);
    }, [data]);

    if (loading || !document) {
        return <Skeleton active />;
    }

    // Columns for compliance matrices table
    const matrixColumns = [
        { title: 'Item Number', dataIndex: 'itemNumber', key: 'itemNumber' },
        { title: 'Details', dataIndex: 'details', key: 'details' },
        { title: 'Department', dataIndex: ['department', 'name'], key: 'department' },
    ];

    // Columns for compliance matrix sections table
    const sectionColumns = [
        { title: 'Item Number', dataIndex: 'itemNumber', key: 'itemNumber' },
        { title: 'Details', dataIndex: 'details', key: 'details' },
        { title: 'Department', dataIndex: ['department', 'name'], key: 'department' },
        { title: 'Status', dataIndex: ['complianceStatus', 'statusName'], key: 'complianceStatus' },
        { title: 'Comment', dataIndex: 'comment', key: 'comment' },
        { title: 'Recommendation', dataIndex: 'recommendation', key: 'recommendation' },
    ];

    // Render sections for each matrix
    const renderSections = (sections: RegulatoryComplianceMatrixSectionPojo[] | undefined) => {
        if (!sections || sections.length === 0) {
            return <p>No Sections Available</p>;
        }

        return (
            <Table
                dataSource={sections}
                columns={sectionColumns}
                rowKey="id"
                pagination={false}
            />
        );
    };

    return (
        <div>
            {/* Document Details */}
            <Card title="Document Details" bordered>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Name">{document.name}</Descriptions.Item>
                    <Descriptions.Item label="Year">{document.year}</Descriptions.Item>
                    <Descriptions.Item label="Description">
                        <ReactQuill value={document.description} readOnly theme="bubble" />
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            {/* Entity Information */}
            <Card title="Entity Information" bordered>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Entity Name">{document.entity.name}</Descriptions.Item>
                    <Descriptions.Item label="Entity Description">
                        <ReactQuill value={document.entity.description} readOnly theme="bubble" />
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            {/* Document Category Information */}
            <Card title="Document Category Information" bordered>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Category Name">{document.documentCategory.name}</Descriptions.Item>
                    <Descriptions.Item label="Category Code">{document.documentCategory.code}</Descriptions.Item>
                    <Descriptions.Item label="Category Description">
                        <ReactQuill value={document.documentCategory.description} readOnly theme="bubble" />
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            {/* Department Information */}
            <Card title="Department Information" bordered>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Department Name">{document.department.name}</Descriptions.Item>
                    <Descriptions.Item label="Department Code">{document.department.code}</Descriptions.Item>
                    <Descriptions.Item label="Department Description">
                        <ReactQuill value={document.department.description} readOnly theme="bubble" />
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Divider />

            {/* Compliance Matrices */}
            <Card title="Compliance Matrices" bordered>
                {document.complianceMatrices.map((matrix: RegulatoryComplianceMatrixPojo) => (
                    <div key={matrix.id}>
                        <Descriptions title={`Matrix - ${matrix.itemNumber}`} bordered column={1}>
                            <Descriptions.Item label="Details">{matrix.details}</Descriptions.Item>
                            <Descriptions.Item label="Department">{matrix.department.name}</Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <Card title="Sections" bordered>
                            {renderSections(matrix.sections)} {/* Render sections */}
                        </Card>

                        <Divider />
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default ComplianceDocumentInfo;
