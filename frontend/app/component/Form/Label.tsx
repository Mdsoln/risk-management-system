import React from 'react';
import './Label.css';

interface LabelProps {
    text: string;
    htmlFor?: string;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className }) => {
    return (
        <label htmlFor={htmlFor} className={`custom-label ${className}`}>
            {text}
        </label>
    );
};

export default Label;
