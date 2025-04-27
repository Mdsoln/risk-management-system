// /app/bcm/bcm-dependency/page.tsx

'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';
import dynamic from 'next/dynamic';

// Dynamically import the dependency table (and optionally, the form if needed)
const BcmDependencyTable = dynamic(
    () => import('@/app/component/Bcm/BcmDependencyTable'),
    { ssr: false }
);
// If you have a separate AddEditBcmDependencyForm component, you could import it here if needed.

const BcmDependencyPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // If you want to refresh or reload data when switching tabs, handle it here
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey((prevKey) => prevKey + 1);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Dependencies
                </span>
            ),
            children: <BcmDependencyTable key={reloadKey} />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Dependency
                </span>
            ),
            // Option A: Show the same table for demonstration:
            children: <BcmDependencyTable />,
            // Option B: If you had a separate form, you could load it here instead:
            // children: <AddEditBcmDependencyForm key={reloadKey} />
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

export default BcmDependencyPage;
