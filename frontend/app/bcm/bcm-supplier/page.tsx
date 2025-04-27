'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const BcmSupplierTable = dynamic(
    () => import('../../component/Bcm/BcmSupplierTable'),
    { ssr: false }
);
const AddEditBcmSupplierForm = dynamic(
    () => import('../../component/Bcm/AddEditBcmSupplierForm'),
    { ssr: false }
);

const BcmSupplierPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle tab change to trigger reload
    const handleTabChange = (key: string) => {
        if (key === '2') {
            setReloadKey(prevKey => prevKey + 1); // Reload form when switching tabs
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List Suppliers
                </span>
            ),
            children: <BcmSupplierTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Supplier
                </span>
            ),
            children: (
                <AddEditBcmSupplierForm
                    key={reloadKey}
                    onSubmit={async (values) => {
                        console.log('Submitted values:', values);
                        // Placeholder for API submission logic
                    }}
                    onCancel={() => console.log('Form canceled')}
                    showActionButtons
                />
            ),
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

export default BcmSupplierPage;
