import React from 'react';
import { Modal, Button } from 'antd';
import { ComplianceEntityCategoryPojo } from '@/app/types/api';
import ComplianceEntityCategoryInfo from './ComplianceEntityCategoryInfo';
import CustomModal from '../Modal/CustomModal';
import { InfoCircleOutlined } from '@ant-design/icons';

interface ViewComplianceEntityCategoryModalProps {
    visible: boolean;
    data: ComplianceEntityCategoryPojo | null;
    onClose: () => void;
}

const ViewComplianceEntityCategoryModal: React.FC<ViewComplianceEntityCategoryModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    // Custom Modal Footer
    const customFooter = (
        <div>
            <Button key="close" onClick={onClose}>
                Close
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Category Details - ${data ? data.name : ''}`}
            onCancel={onClose}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Compliance Category', lineTwo: 'View Details' }}
        >
            {data ? (
                <ComplianceEntityCategoryInfo data={data} />
            ) : (
                <p>No details available</p>
            )}
        </CustomModal>
    );
};

export default ViewComplianceEntityCategoryModal;
