import React from 'react';
import { Typography } from 'antd';
import './DisplayDescription.css';

const { Paragraph } = Typography;

interface DisplayDescriptionProps {
    label: string;
    description: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    backgroundColor?: string;
}

const DisplayDescription: React.FC<DisplayDescriptionProps> = ({ label, description, icon, style, backgroundColor }) => (
    <Paragraph className="display-description" style={{ ...style, backgroundColor }}>
        <div className="display-description-label">
            {icon && <span className="display-description-icon">{icon}</span>}
            <strong>{label}:</strong>
        </div>
        <div className="display-description-value">
            {description}
        </div>
    </Paragraph>
);

export default DisplayDescription;
