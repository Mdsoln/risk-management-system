'use client';

import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined, MonitorOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';

// Dynamically import the components
const RiskTable = dynamic(() => import('../../component/Risk/RiskTable'), { ssr: false });

const NewRiskPage: React.FC = () => {
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
                    <UnorderedListOutlined className="globalFlexIcon" />
                    List of Risks
                </span>
            ),
            children: <RiskTable />,
            //children: <div>RiskTable Area - Test Content</div>,
        }
    ];

    return (
        <MainLayout>
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} onChange={handleTabChange} />
        </MainLayout>
    );
};

export default NewRiskPage;
