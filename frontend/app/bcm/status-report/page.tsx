'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import components
const StatusReportTable = dynamic(() => import('../../component/Bcm/StatusReportTable'), { ssr: false });
const AddEditStatusReportForm = dynamic(() => import('../../component/Bcm/AddEditStatusReportForm'), { ssr: false });

const StatusReportPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    // Handle tab change to reload form when switching tabs
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
                    List Reports
                </span>
            ),
            children: <StatusReportTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Add/Update Report
                </span>
            ),
            children: (
                <AddEditStatusReportForm
                    key={reloadKey}
                    onSubmit={async () => setReloadKey(prevKey => prevKey + 1)}
                    onCancel={() => console.log('Cancelled')}
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

export default StatusReportPage;
