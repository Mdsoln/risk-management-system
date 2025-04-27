import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button, Descriptions } from 'antd';
import { BcmSystemListingPojo } from '@/app/types/api';
import { EyeOutlined } from '@ant-design/icons';

interface ViewBcmSystemListingModalProps {
    visible: boolean;
    data: BcmSystemListingPojo | null;
    onClose: () => void;
}

const ViewBcmSystemListingModal: React.FC<ViewBcmSystemListingModalProps> = ({ visible, data, onClose }) => {
    if (!data) {
        return null;
    }

    return (
        <CustomModal
            visible={visible}
            title="View System Listing"
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
            width="60%"
            height="60vh"
            icon={<EyeOutlined />}
            modalType={{ lineOne: 'System Listing', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Business Area">{data.businessArea}</Descriptions.Item>
                <Descriptions.Item label="Applications & Database">{data.applicationsAndDatabase}</Descriptions.Item>
                <Descriptions.Item label="Telephones">{data.telephones}</Descriptions.Item>
                <Descriptions.Item label="Mobile Phones">{data.mobilePhones}</Descriptions.Item>
                <Descriptions.Item label="Modem">{data.modem}</Descriptions.Item>
                <Descriptions.Item label="Fax">{data.fax}</Descriptions.Item>
                <Descriptions.Item label="Laser Printer">{data.laserPrinter}</Descriptions.Item>
                <Descriptions.Item label="Photocopier">{data.photocopier}</Descriptions.Item>
                <Descriptions.Item label="Others">{data.others}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmSystemListingModal;
