import React from 'react';
import { Modal, Divider } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import './CustomModal.css'; // Import the CSS file
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import { ErrorState } from '@/app/types/api';

interface ModalType {
    lineOne: string;
    lineTwo: string;
}

interface CustomModalProps {
    visible: boolean;
    title: string;
    onCancel: () => void;
    onOk?: (data?: any) => void;
    footer?: React.ReactNode;
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
    centered?: boolean;
    data?: any;
    icon?: React.ReactNode;
    errorState?: ErrorState | null;
    modalType?: ModalType;
}

const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    title,
    onCancel,
    onOk,
    footer,
    children,
    width = "50%",
    height = '85vh',
    centered = true,
    data,
    icon,
    errorState,
    modalType = { lineOne: 'Default', lineTwo: 'Title' },
}) => {
    return (
        <Modal
            open={visible}
            title={
                <div className="modal-header">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {icon && (
                            <span className="modal-icon">
                                {icon}
                                <div className="modal-type">
                                    <span>{modalType.lineOne}</span>
                                    <span>{modalType.lineTwo}</span>
                                </div>
                            </span>
                        )}
                        <Divider type="vertical" className="modal-divider" />
                        <span className="modal-title">{title}</span>
                    </div>
                    <CloseCircleOutlined className="modal-close-icon" onClick={onCancel} />
                </div>
            }
            onCancel={onCancel}
            onOk={() => onOk && onOk(data)}
            footer={footer !== undefined ? footer : null}
            width={width}
            centered={centered}
            closeIcon={null}
            className="custom-modal"
            maskClosable={false}
        >
            {errorState && <ErrorDisplayAlert errorState={errorState} onClose={() => { }} />}
            <div className="modal-body" style={{ height: height, overflowY: 'auto' }}>
                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;
