"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from 'antd';
import styles from '../../styles/Home.module.css';
import SideNav from '../component/SideNav/SideNav';
import { useRouter } from 'next/router';


const { Sider, Content } = Layout;

// Dynamically import the Counter component
// const Counter = dynamic(() => import('../component/Counter'), { ssr: false });
// const MyTable = dynamic(() => import('../component/MyTable'), { ssr: false });
const Profile: React.FC = () => {

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
            <Layout className={styles.layout}>
                <Content style={{ padding: '24px', minHeight: '100vh' }}>
                    <Content>
                        <h1>Profile</h1>
                    </Content>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;