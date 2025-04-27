import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { ComplianceEntityPojo } from '@/app/types/api';
import { InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ComplianceEntityInfo from './ComplianceEntityInfo';

interface ViewComplianceEntityModalProps {
    visible: boolean;
    data: ComplianceEntityPojo | null;
    onClose: () => void;
}

const ViewComplianceEntityModal: React.FC<ViewComplianceEntityModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    // Modal Footer
    const customFooter = (
        <div>
            <Button onClick={onClose} icon={<CloseCircleOutlined />}>
                Close
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title="Compliance Entity Details"
            onCancel={onClose}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Compliance Entity', lineTwo: 'Details' }}
        >
            {data ? (
                <ComplianceEntityInfo data={data} />
            ) : (
                <p>No data available.</p>
            )}
        </CustomModal>
    );
};

export default ViewComplianceEntityModal;
