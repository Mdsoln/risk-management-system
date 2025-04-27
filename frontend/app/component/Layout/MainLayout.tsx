// MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import SideNav from '../../component/SideNav/SideNav';
import HeaderLayout from '../Header/HeaderLayout';
import styles from './MainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Layout className={styles.layout}>
            {/* SideNav should remain fixed on the left side */}
            <Layout.Sider className={styles.sider}>
                <SideNav />
            </Layout.Sider>

            {/* Main layout content on the right side */}
            <Layout className={styles.mainLayout}>
                <HeaderLayout className={styles.header} />
                <Layout.Content className={styles.content}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;