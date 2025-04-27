'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components for BCM Phone Directory
const BcmPhoneDirectoryTable = dynamic(
    () => import('../../component/Bcm/BcmPhoneDirectoryTable'),
    { ssr: false }
);
const AddEditBcmPhoneDirectoryForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmPhoneDirectoryForm'),
    { ssr: false }
);

const BcmPhoneDirectoryPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle Tab Change to reload form
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
                    List Phone Directory
                </span>
            ),
            children: <BcmPhoneDirectoryTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Entry
                </span>
            ),
            children: <BcmPhoneDirectoryTable />,
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

export default BcmPhoneDirectoryPage;
