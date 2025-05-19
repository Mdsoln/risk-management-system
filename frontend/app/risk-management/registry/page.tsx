'use client';

import React from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';
// import '@/styles/global.css'; // Ensure the path is correct

const RegistryTable = dynamic(() => import('../../component/Registry/RegistriesTable'), { ssr: false });

const RegistryPage: React.FC = () => {
    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List of Registries
                </span>
            ),
            children: <RegistryTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Others
                </span>
            ),
            children: <h1>Test</h1>,
        },
    ];

    return (
        <MainLayout>
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} />
        </MainLayout>
    );
};

export default RegistryPage;
