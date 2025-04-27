'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const BcmPhoneListTable = dynamic(
    () => import('../../component/Bcm/BcmPhoneListTable'),
    { ssr: false }
);
const AddEditBcmPhoneListForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmPhoneListForm'),
    { ssr: false }
);

const BcmPhoneListPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle tab changes to trigger reload
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey(prevKey => prevKey + 1); // Increment reload key to reload form
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Phone Entries
                </span>
            ),
            children: <BcmPhoneListTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Phone Entry
                </span>
            ),
            children: <BcmPhoneListTable />,
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

export default BcmPhoneListPage;
