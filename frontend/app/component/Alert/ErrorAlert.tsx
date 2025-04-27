import React from 'react';
import { Alert } from 'antd';

interface ErrorAlertProps {
    message: string;
    visible: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, visible }) => {
    return visible ? <Alert message={message} type="error" showIcon style={{ marginBottom: 16 }} /> : null;
};

export default ErrorAlert;
