'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components for Compliance Documents
const ComplianceDocumentTable = dynamic(
    () => import('../../component/Compliance/ComplianceDocumentTable'),
    { ssr: false }
);
const AddEditComplianceDocumentForm = dynamic(
    () => import('../../component/Compliance/AddEditComplianceDocumentForm'),
    { ssr: false }
);

const ComplianceDocumentPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle Tab Change to trigger reload
    const handleTabChange = (key: string) => {
        if (key === '2') {
            // Reload form when switching to Add/Update tab
            setReloadKey(prevKey => prevKey + 1);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Documents
                </span>
            ),
            children: <ComplianceDocumentTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Document
                </span>
            ),
            children: <ComplianceDocumentTable />,
        },
    ];

    return (
        <MainLayout>
            <Tabs
                defaultActiveKey="1"
                style={{ margin: '24px' }}
                items={items}
                onChange={handleTabChange}
            />
        </MainLayout>
    );
};

export default ComplianceDocumentPage;
