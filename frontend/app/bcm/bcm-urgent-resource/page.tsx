'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const BcmUrgentResourceTable = dynamic(
    () => import('../../component/Bcm/BcmUrgentResourceTable'),
    { ssr: false }
);
const AddEditBcmUrgentResourceForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmUrgentResourceForm'),
    { ssr: false }
);

const BcmUrgentResourcePage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle tab change and reload
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
                    List Urgent Resources
                </span>
            ),
            children: <BcmUrgentResourceTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Resource
                </span>
            ),
            children: <AddEditBcmUrgentResourceForm key={reloadKey} onSubmit={async () => { }} onCancel={() => { }} />,
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

export default BcmUrgentResourcePage;
