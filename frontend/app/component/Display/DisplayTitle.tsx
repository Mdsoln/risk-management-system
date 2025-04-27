import React from 'react';
import { Divider, Typography } from 'antd';
import './DisplayTitle.css';

const { Title } = Typography;

interface DisplayTitleProps {
    text: string;
    icon?: React.ReactNode;
    level?: 4 | 5;
    style?: React.CSSProperties;
}

const DisplayTitle: React.FC<DisplayTitleProps> = ({ text, icon, level = 4, style }) => (
    <Divider orientation="left" orientationMargin="0" className="display-title-divider" style={style}>
        <Title level={level} className="display-title">
            {icon && <span className="display-title-icon">{icon}</span>}
            {text}
        </Title>
    </Divider>
);

export default DisplayTitle;
