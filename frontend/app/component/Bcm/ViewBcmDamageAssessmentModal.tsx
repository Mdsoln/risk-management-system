import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button, Descriptions } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BcmDamageAssessmentPojo } from '@/app/types/api';

interface ViewBcmDamageAssessmentModalProps {
    visible: boolean;
    data: BcmDamageAssessmentPojo | null;
    onClose: () => void;
}

const ViewBcmDamageAssessmentModal: React.FC<ViewBcmDamageAssessmentModalProps> = ({ visible, data, onClose }) => {
    if (!data) return null; // Return null if no data is provided

    return (
        <CustomModal
            visible={visible}
            title="Damage Assessment Details"
            onCancel={onClose}
            footer={
                <Button key="close" onClick={onClose}>
                    Close
                </Button>
            }
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Damage Assessment', lineTwo: 'Details' }}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Supplier">{data.supplier}</Descriptions.Item>
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Work Phone">{data.phoneWork || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Home Phone">{data.phoneHome || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Mobile Phone">{data.phoneMobile || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </CustomModal>
    );
};

export default ViewBcmDamageAssessmentModal;
