import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Select, Row, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/store/thunks/authThunks';// comment
// import { fetchUsers, login } from '@/store/thunks/authThunks';// uncomment
import { RootState, AppDispatch } from '@/store/store';
import { UserOutlined } from '@ant-design/icons';
import styles from './UserSwitchModal.module.css';
import { User } from '@/app/types/api';
import LoadingComponent from '../Loading/LoadingComponent';

const { Option } = Select;

const UserSwitchModal: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.user.users);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUsers()); // Fetch users when the component mounts
    }, [dispatch]);

    const handleSwitchAccount = async (values: { nin: string; password: string }) => {
        setIsSubmitting(true);
        console.log('Form values:', values); // Debugging log

        try {
            // await dispatch(login(values)).unwrap(); // uncomment
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to switch account:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelect = (value: { value: string; label: React.ReactNode }) => {
        const user = users.find(user => user.nin === value.value);
        setSelectedUser(user || null);
    };

    const renderOptionContent = (user: User) => (
        <div className={styles.optionContent}>
            <strong>{`${user.profileDetails.firstName} ${user.profileDetails.lastName}`}</strong>
            <div>{`NIN: ${user.nin}`}</div>
            <div>{`Department: ${user.department.name}`}</div>
            <div>{`Position: ${user.profileDetails.position}`}</div>
            <div>{`User Type: ${user.userType.name}`}</div>
        </div>
    );

    return (
        <>
            {isSubmitting && <LoadingComponent message="Switching accounts" />}

            <Button icon={<UserOutlined />} onClick={() => setIsModalVisible(true)}>
                Switch Account
            </Button>
            <Modal
                title="Switch Account"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleSwitchAccount} layout="vertical">
                    <Form.Item
                        name="nin"
                        label="Select User"
                        rules={[{ required: true, message: 'Please select a user!' }]}
                    >
                        <Select
                            placeholder="Search and select a user"
                            loading={loading}
                            disabled={loading}
                            showSearch
                            labelInValue
                            optionFilterProp="label"
                            filterOption={(input, option) => {
                                const label = option?.label as string;
                                if (typeof label === 'string') {
                                    return label.toLowerCase().includes(input.toLowerCase());
                                }
                                return false;
                            }}
                            onSelect={handleSelect}
                            optionLabelProp="label"
                        >
                            {users.map(user => (
                                <Option
                                    key={user.nin}
                                    value={user.nin}
                                    label={`${user.profileDetails.firstName} ${user.profileDetails.lastName} - ${user.profileDetails.position}, ${user.department.name}, ${user.userType.name}`}
                                >
                                    {renderOptionContent(user)}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    {selectedUser && (
                        <div className={styles.selectedUser}>
                            {renderOptionContent(selectedUser)}
                        </div>
                    )}

                    <Form.Item>
                        <Row justify="end">
                            <Space>
                                <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: '8px', marginTop: '16px' }}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" disabled={loading || isSubmitting} style={{ marginTop: '16px' }}>
                                    Switch
                                </Button>
                            </Space>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserSwitchModal;
