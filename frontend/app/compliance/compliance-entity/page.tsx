'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const ComplianceEntityTable = dynamic(
    () => import('@/app/component/Compliance/ComplianceEntityTable'),
    { ssr: false }
);
const ComplianceEntityForm = dynamic(
    () => import('@/app/component/Compliance/AddEditComplianceEntityForm'),
    { ssr: false }
);

const ComplianceEntityPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0); // Key to reload content when switching tabs

    // Handle tab changes
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey(prevKey => prevKey + 1); // Trigger reload when switching to form tab
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List of Compliance Entities
                </span>
            ),
            children: <ComplianceEntityTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Compliance Entity
                </span>
            ),
            children: <ComplianceEntityTable />,
        },
    ];

    return (
        <MainLayout>
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} onChange={handleTabChange} />
        </MainLayout>
    );
};

export default ComplianceEntityPage;
