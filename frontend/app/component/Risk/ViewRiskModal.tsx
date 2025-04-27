import React from 'react';
import { Modal, Button } from 'antd';
import { Risk } from '@/app/types/api';
import ViewRiskInfo from './ViewRiskInfo';

interface ViewRiskModalProps {
    visible: boolean;
    data: Risk | null;
    onClose: () => void;
}

const ViewRiskModal: React.FC<ViewRiskModalProps> = ({ visible, data, onClose }) => {
    return (
        <Modal
            title={`RISK DETAIL : ${data ? data.name : ''}`}
            visible={visible}
            onCancel={onClose}
            width={900}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {data ? <ViewRiskInfo data={data} /> : <p>No data to display</p>}
        </Modal>
    );
};

export default ViewRiskModal;
