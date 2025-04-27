import React from 'react';
import { Modal, Button } from 'antd';
import { ComplianceDocumentCategoryPojo } from '@/app/types/api';
import ComplianceDocumentCategoryInfo from './ComplianceDocumentCategoryInfo';

interface ViewComplianceDocumentCategoryModalProps {
    visible: boolean;
    data: ComplianceDocumentCategoryPojo | null;
    onClose: () => void;
}

const ViewComplianceDocumentCategoryModal: React.FC<ViewComplianceDocumentCategoryModalProps> = ({
    visible,
    data,
    onClose,
}) => {
    return (
        <Modal
            title={`Category Details - ${data?.name}`}
            visible={visible}
            onCancel={onClose}
            width={700}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {data ? (
                <ComplianceDocumentCategoryInfo data={data} />
            ) : (
                <p>No data available for this category.</p>
            )}
        </Modal>
    );
};

export default ViewComplianceDocumentCategoryModal;
