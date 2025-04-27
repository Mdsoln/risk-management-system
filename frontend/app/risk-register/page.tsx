
// export default RiskRegister;
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout, Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from '../../styles/Home.module.css';
import SideNav from '../component/SideNav/SideNav';
import RegistriesTable from '../component/Registry/RegistriesTable';
// import ListRiskRegister from '../component/RiskRegistry/ListRiskRegister';

const { Sider, Content } = Layout;

const MyTable = dynamic(() => import('../component/MyTable'), { ssr: false });

const RiskRegister: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isReversed, setIsReversed] = useState(false);

    const toggleDarkMode = () => {
        console.log(isDarkMode)
        setIsDarkMode(!isDarkMode);
    };

    const toggleArrangement = () => {
        console.log(isReversed)
        setIsReversed(!isReversed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
            <Layout className={styles.layout}>
                <Content style={{ padding: '24px', minHeight: '100vh' }}>
                    <Tabs defaultActiveKey="1" style={{ margin: '24px' }}>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <UnorderedListOutlined />
                                    List Risk Register
                                </span>
                            }
                            key="1"
                        >
                            <RegistriesTable />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <TableOutlined />
                                    My Table
                                </span>
                            }
                            key="2"
                        >
                            <MyTable />
                        </Tabs.TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    );
};

export default RiskRegister;
