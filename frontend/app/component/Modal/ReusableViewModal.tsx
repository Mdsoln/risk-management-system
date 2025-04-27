import React from 'react';
import { Modal, Button } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import './ReusableViewModal.css'; // Import custom CSS

interface ReusableViewModalProps {
    open: boolean;
    loading: boolean;
    title: React.ReactNode;
    onCancel: () => void;
    onReload: () => void;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    maskClosable?: boolean;
    children: React.ReactNode;
}

const ReusableViewModal: React.FC<ReusableViewModalProps> = ({
    open,
    loading,
    title,
    onCancel,
    onReload,
    icon,
    footer,
    maskClosable = true,
    children,
}) => {
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    return (
        <Modal
            open={open}
            title={
                <div className="custom-modal-title">
                    {icon && React.cloneElement(icon as React.ReactElement, { style: { marginRight: 8, fontSize: '20px' } })}
                    {title}
                </div>
            }
            onCancel={onCancel}
            footer={
                footer || (
                    <Button type="text" icon={<ReloadOutlined />} onClick={onReload}>
                        Reload
                    </Button>
                )
            }
            maskClosable={maskClosable}
            className="custom-fullscreen-modal" // Apply custom CSS class
            confirmLoading={loading}
            centered
        >
            {loading && (
                <div className="custom-modal-loading">
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                </div>
            )}
            <div className="custom-modal-body">
                {children}
            </div>
        </Modal>
    );
};

export default ReusableViewModal;
