'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import the components
const ComplianceEntityCategoryTable = dynamic(
    () => import('../../component/Compliance/ComplianceEntityCategoryTable'),
    { ssr: false }
);
// const ComplianceEntityCategoryForm = dynamic(
//     () => import('../component/Compliance/ComplianceEntityCategoryForm'),
//     { ssr: false }
// );

const Compliance: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0); // Used for reloading data when switching tabs

    // Handle tab change to reload the form when switching tabs
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey(prevKey => prevKey + 1);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Compliance Categories
                </span>
            ),
            children: <ComplianceEntityCategoryTable key={reloadKey} />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Category
                </span>
            ),
            children: <ComplianceEntityCategoryTable key={reloadKey} />,
        },
    ];

    return (
        <MainLayout>
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} onChange={handleTabChange} />
        </MainLayout>
    );
};

export default Compliance;
