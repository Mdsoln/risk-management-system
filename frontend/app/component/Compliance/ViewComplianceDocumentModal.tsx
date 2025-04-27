import React, { useState, useEffect } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button, Skeleton } from 'antd';
import { ComplianceDocumentPojo } from '@/app/types/api';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComplianceDocumentInfo from './ComplianceDocumentInfo';

interface ViewComplianceDocumentModalProps {
    visible: boolean;
    data: ComplianceDocumentPojo | null;
    onClose: () => void;
}

const ViewComplianceDocumentModal: React.FC<ViewComplianceDocumentModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    // Add loading state
    const [loading, setLoading] = useState<boolean>(true);

    // Simulate loading behavior
    useEffect(() => {
        if (data) {
            setLoading(false); // Mark loading as false once data is available
        } else {
            setLoading(true); // Keep loading if no data
        }
    }, [data]);

    // Modal Footer
    const customFooter = (
        <div key="footer" className="modal-footer">
            <Button key="close" onClick={onClose}>
                Close
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={`Compliance Document Details`}
            onCancel={onClose}
            footer={customFooter}
            width="85%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={<InfoCircleOutlined />}
            modalType={{ lineOne: 'Compliance Document', lineTwo: 'Details' }}
        >
            {loading ? (
                <Skeleton active />
            ) : (
                <ComplianceDocumentInfo data={data!} loading={loading} />
            )}
        </CustomModal>
    );
};

export default ViewComplianceDocumentModal;
