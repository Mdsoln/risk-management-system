import React, { useEffect } from 'react';
import { Modal } from 'antd';

interface ErrorModalProps {
    title: string;
    content: string;
    visible: boolean;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ title, content, visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            Modal.error({
                title,
                content,
                onOk: onClose,
            });
        }
    }, [visible, title, content, onClose]);

    return null;
};

export default ErrorModal;
