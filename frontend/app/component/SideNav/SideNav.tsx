"use client";
// SideNav.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Layout, Drawer, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    DashboardOutlined,
    UserOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    ContactsOutlined,
    FileDoneOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { RootState, AppDispatch } from '../../../store/store';
import { setSelectedKeys, setOpenKeys } from '../../../store/slices/menuSlice';
import styles from './SideNav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

interface MenuItem {
    key: string;
    label: string;
    iconKey?: string;
    children?: MenuItem[];
}

const iconMap: Record<string, React.ReactNode> = {
    DashboardOutlined: <DashboardOutlined />,
    UserOutlined: <UserOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    ContactsOutlined: <ContactsOutlined />,
    FileDoneOutlined: <FileDoneOutlined />,
    SettingOutlined: <SettingOutlined />,
};

const SideNav: React.FC = () => {
    const menuItems = useSelector((state: RootState) => state.menu.menuItems);
    const selectedKeys = useSelector((state: RootState) => state.menu.selectedKeys);
    const openKeys = useSelector((state: RootState) => state.menu.openKeys);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const onOpenChange = (keys: string[]) => {
        dispatch(setOpenKeys(keys));
    };

    const handleSelect = ({ key }: { key: string }) => {
        dispatch(setSelectedKeys([key]));
    };

    const getMenuItems = (items: MenuItem[]): any[] => {
        return items.map((item) => {
            const icon = item.iconKey ? iconMap[item.iconKey] : null;
            if (item.children) {
                return {
                    key: item.key,
                    label: item.label,
                    icon: icon,
                    children: getMenuItems(item.children),
                };
            }
            return {
                key: item.key,
                label: (
                    <Link href={`/${item.key}`}>
                        {item.label}
                    </Link>
                ),
                icon: icon,
            };
        });
    };

    const findKeysForPath = (items: MenuItem[], pathSegments: string[], keys: string[] = []): string[] => {
        for (const item of items) {
            if (item.key === pathSegments[0]) {
                keys.push(item.key);
                if (item.children && pathSegments.length > 1) {
                    return findKeysForPath(item.children, pathSegments.slice(1), keys);
                }
                return keys;
            }
        }
        return keys;
    };

    const getDefaultSelectedKeysAndOpenKeys = (pathname: string): { selectedKeys: string[], openKeys: string[] } => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const selectedKeys = [pathSegments.join('-')];
        const openKeys = findKeysForPath(menuItems, pathSegments);
        return { selectedKeys, openKeys };
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const { selectedKeys, openKeys } = getDefaultSelectedKeysAndOpenKeys(window.location.pathname);
        dispatch(setSelectedKeys(selectedKeys));
        dispatch(setOpenKeys(openKeys));
    }, [dispatch, menuItems]);

    return (
        <>
            {isMobile && (
                <Button
                    className={styles.menuButton}
                    onClick={toggleDrawer}
                    icon={<MenuUnfoldOutlined />}
                />
            )}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={toggleCollapsed}
                className={styles.sider}
                breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
                width={270}
                style={{ height: '100vh' }}
            >
                <div className={styles.logo}>
                    <div className={styles.logoDiv}>
                        <div className={styles.logoSubDiv}>
                            <img src="/images/logo-white.png" alt="Logo" />
                        </div>
                    </div>

                    <div className={styles.logoTitle}>Risk Management</div>
                </div>
                <Menu
                    mode="inline"
                    className={styles.menuNav}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    onSelect={handleSelect}
                    items={getMenuItems(menuItems)}
                />
            </Sider>
            <Drawer
                title="Menu"
                placement="left"
                onClose={toggleDrawer}
                open={drawerVisible}
                styles={{ body: { padding: 0 } }}
                className={isMobile ? styles.drawer : styles.hiddenDrawer}
            >
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    items={getMenuItems(menuItems)}
                />
            </Drawer>
        </>
    );
};

export default SideNav;
