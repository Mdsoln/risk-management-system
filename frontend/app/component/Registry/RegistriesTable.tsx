'use client';

import React from 'react';
import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import RegistriesTable from '../RiskRegistry/RegistriesTable';

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
            children: <RegistriesTable />,
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
     
            <Tabs defaultActiveKey="1" style={{ margin: '24px' }} items={items} />
    );
};

export default RegistryPage;
