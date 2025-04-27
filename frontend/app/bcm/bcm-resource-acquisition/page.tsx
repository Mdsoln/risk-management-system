'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components for BCM Resource Acquisition
const BcmResourceAcquisitionTable = dynamic(
    () => import('../../component/Bcm/BcmResourceAcquisitionTable'),
    { ssr: false }
);
const AddEditBcmResourceAcquisitionForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmResourceAcquisitionForm'),
    { ssr: false }
);

const BcmResourceAcquisitionPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle Tab Change to trigger reload
    const handleTabChange = (key: string) => {
        if (key === '2') {
            // Reload form when switching to Add/Update tab
            setReloadKey(prevKey => prevKey + 1);
        }
    };

    // Tab Items
    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Resources
                </span>
            ),
            children: <BcmResourceAcquisitionTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Resource
                </span>
            ),
            children: <BcmResourceAcquisitionTable />,
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

export default BcmResourceAcquisitionPage;
