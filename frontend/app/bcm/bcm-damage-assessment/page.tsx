'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components for BCM Damage Assessment
const BcmDamageAssessmentTable = dynamic(
    () => import('../../component/Bcm/BcmDamageAssessmentTable'),
    { ssr: false }
);
const AddEditBcmDamageAssessmentForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmDamageAssessmentForm'),
    { ssr: false }
);

const BcmDamageAssessmentPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle Tab Change to trigger reload
    const handleTabChange = (key: string) => {
        if (key === '2') {
            // Reload form when switching to Add/Update tab
            setReloadKey(prevKey => prevKey + 1);
        }
    };

    // Tabs configuration
    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Damage Assessments
                </span>
            ),
            children: <BcmDamageAssessmentTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Damage Assessment
                </span>
            ),
            children: <BcmDamageAssessmentTable />,
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

export default BcmDamageAssessmentPage;
