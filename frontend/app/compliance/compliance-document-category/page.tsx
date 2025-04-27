'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const ComplianceDocumentCategoryTable = dynamic(
    () => import('../../component/Compliance/ComplianceDocumentCategoryTable'),
    { ssr: false }
);
const ComplianceDocumentCategoryForm = dynamic(
    () => import('../../component/Compliance/AddEditComplianceDocumentCategoryForm'),
    { ssr: false }
);

const ComplianceDocumentCategoryPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0); // Used to reload data when switching tabs

    // Handle tab change to reload form
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey(prevKey => prevKey + 1); // Force reload for the form tab
        }
    };

    // Tab Items
    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List of Document Categories
                </span>
            ),
            children: <ComplianceDocumentCategoryTable key={reloadKey} />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Document Category
                </span>
            ),
            children: <ComplianceDocumentCategoryTable key={reloadKey} />,
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

export default ComplianceDocumentCategoryPage;
