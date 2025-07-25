'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined, MonitorOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';
import RegistriesTable from '@/app/component/Registry/RegistriesTable';

// Dynamically import the components
const RiskActionPlanMonitoringListForm = dynamic(() => import('../../component/Risk/RiskActionPlanMonitoringListForm'), { ssr: false });

const RiskPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);

    const handleTabChange = (key: string) => {
        if (key === '3') {
            // Trigger a reload by updating the reloadKey state
            setReloadKey(prevKey => prevKey + 1);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="globalFlexIconWithText">
                    <TableOutlined className="globalFlexIcon" />
                    Risk Register
                </span>
            ),
             children: <RegistriesTable />,
        },
        {
            key: '2',
            label: (
                <span className="globalFlexIconWithText">
                    <MonitorOutlined className="globalFlexIcon" />
                    Risk Action Plan Monitoring
                </span>
            ),
            children: <RiskActionPlanMonitoringListForm key={reloadKey} />,
        },
    ];

    return (
        <MainLayout>
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} onChange={handleTabChange} />
        </MainLayout>
    );
};

export default RiskPage;
