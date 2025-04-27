import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { RecordStatus } from '../enum';

// export const renderStatus = (status: RecordStatus): JSX.Element => {
export const renderStatus = (status: any): JSX.Element => {
    let icon, color, text, type;

    switch (status) {
        case 'PENDING':
            icon = <ClockCircleOutlined />;
            color = 'orange';
            text = 'Pending';
            type = 'primary';
            break;
        case 'ACTIVE':
            icon = <CheckCircleOutlined />;
            color = 'green';
            text = 'Active';
            type = 'primary';
            break;
        case 'INACTIVE':
            icon = <CloseCircleOutlined />;
            color = 'grey';
            text = 'Inactive';
            type = 'primary';
            break;
        case 'DELETED':
            icon = <DeleteOutlined />;
            color = 'red';
            text = 'Deleted';
            type = 'primary';
            break;
        default:
            icon = <CloseCircleOutlined />;
            color = 'grey';
            text = 'Unknown';
            type = 'primary';
    }

    return (
        <><Button icon={icon} style={{ color }}>
            {text}
        </Button></>
    );
};
