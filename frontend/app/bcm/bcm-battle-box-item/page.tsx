'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components for BCM Battle Box Items
const BcmBattleBoxItemTable = dynamic(
    () => import('../../component/Bcm/BcmBattleBoxItemTable'),
    { ssr: false }
);
const AddEditBcmBattleBoxItemForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmBattleBoxItemForm'),
    { ssr: false }
);

const BcmBattleBoxItemPage: React.FC = () => {
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
                    List Battle Box Items
                </span>
            ),
            children: <BcmBattleBoxItemTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Item
                </span>
            ),
            children: <BcmBattleBoxItemTable />,
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

export default BcmBattleBoxItemPage;
