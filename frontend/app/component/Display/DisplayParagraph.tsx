import React from 'react';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './DisplayParagraph.css';

interface DisplayParagraphProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    isEditing: boolean;
    isEditable: boolean;
    isEditingAll: boolean;
    style?: React.CSSProperties;
}

const DisplayParagraph: React.FC<DisplayParagraphProps> = ({
    label, value, icon, onEdit, onCancel, onSave, isEditing, isEditable, isEditingAll, style,
}) => {
    console.log(`Render DisplayParagraph - label: ${label}, isEditingAll: ${isEditingAll}, isEditable: ${isEditable}, isEditing: ${isEditing}`);

    return (
        <div className="display-paragraph" style={style}>
            <div className="display-paragraph-label">
                {icon && <span className="display-paragraph-icon">{icon}</span>}
                {label}:
            </div>
            <div className="display-paragraph-value">
                {value}
                {isEditable && !isEditingAll && (
                    isEditing ? (
                        <>
                            <CheckOutlined onClick={onSave} className="action-icon" />
                            <CloseOutlined onClick={onCancel} className="action-icon" />
                        </>
                    ) : (
                        <EditOutlined onClick={onEdit} className="action-icon" />
                    )
                )}
            </div>
        </div>
    );
};

export default DisplayParagraph;
