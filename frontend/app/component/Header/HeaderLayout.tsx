'use client';
import React, { useEffect } from 'react';
import {Layout, Menu, Avatar, Dropdown, Badge, List, MenuProps} from 'antd';
import { UserOutlined, SettingOutlined, LockOutlined, LogoutOutlined, DownOutlined, BellOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import styles from './HeaderLayout.module.css';
import ThemeToggle from '../Theme/ThemeToggle';
import UserSwitchModal from '../UserSwitchModal/UserSwitchModal'; // Import the UserSwitchModal component

const { Header } = Layout;

interface Notification {
    id: string;
    message: string;
}

interface HeaderLayoutProps {
    className?: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ className }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const notifications = useSelector((state: RootState) => state.notifications.notifications);

    // Debugging: Log currentUser to see what's being stored
    useEffect(() => {
        console.log('Current User:', user.currentUser);
    }, [user.currentUser]);

    const profileMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];


    // Create a custom render function for the notification menu
    const renderNotificationMenu = () => {
        return (
            <Menu
                items={[
                    {
                        key: 'notifications',
                        label: (
                            <List
                                size="small"
                                dataSource={notifications}
                                renderItem={(item: Notification) => (
                                    <List.Item key={item.id}>
                                        {item.message}
                                    </List.Item>
                                )}
                            />
                        ),
                    },
                ]}
            />
        );
    };

    return (
        <Header className={`${styles.header} ${className}`}>
            <div className={styles.logo}></div>
            <div className={styles.headerRight}>
                <ThemeToggle />
                <Dropdown menu={{ items: [] }} dropdownRender={renderNotificationMenu} trigger={['click']}>
                    <Badge count={notifications.length}>
                        <BellOutlined className={styles.icon} />
                    </Badge>
                </Dropdown>
                <span className={styles.username}>
                    {user.currentUser?.nin || 'Guest'} {/* Ensure currentUser is correctly set */}
                </span>
                <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar icon={<UserOutlined />} shape="circle" className={styles.avatar} /> <DownOutlined />
                    </a>
                </Dropdown>
                <UserSwitchModal /> {/* Add the UserSwitchModal component */}
            </div>
        </Header>
    );
};

export default HeaderLayout;
