import React from 'react';
import { Button, Descriptions, Modal, Space, Tag } from 'antd';
import { BcmPhoneListPojo } from '@/app/types/api';
import CustomModal from '../Modal/CustomModal'; // Import CustomModal
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewBcmPhoneListModalProps {
    visible: boolean;
    data: BcmPhoneListPojo | null;
    onClose: () => void;
}

const ViewBcmPhoneListModal: React.FC<ViewBcmPhoneListModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    if (!data) {
        return null;
    }

    // Custom modal footer
    const customFooter = (
        <Space>
            <Button onClick={onClose}>Close</Button>
        </Space>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Phone List Details - ${data.roleOrName}`}
            onCancel={onClose}
            footer={customFooter}
            width="50%"
            height="50vh"
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Phone List', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Role/Name">{data.roleOrName}</Descriptions.Item>
                <Descriptions.Item label="Phones Required">{data.phonesRequired}</Descriptions.Item>
                <Descriptions.Item label="ISD Access">
                    <Tag color={data.isdAccess ? 'green' : 'volcano'}>
                        {data.isdAccess ? 'Yes' : 'No'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Installed">
                    <Tag color={data.installedOk ? 'green' : 'volcano'}>
                        {data.installedOk ? 'Yes' : 'No'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Tested">
                    <Tag color={data.testedOk ? 'green' : 'volcano'}>
                        {data.testedOk ? 'Yes' : 'No'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Comments">{data.comments || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmPhoneListModal;
