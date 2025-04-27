import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FieldError, useFormContext } from 'react-hook-form';
import CustomTextarea from '../Form/CustomTextarea';
import './EditableTextarea.css';

interface EditableTextareaProps {
    label: string;
    name: string;
    value: string;
    rules?: object;
    onSave: () => void;
    onCancel: () => void;
    onChange: (value: string) => void;
    isEditingAll: boolean;
    isEditing: boolean;
    isEditable: boolean;
    onEdit: () => void;
}

const EditableTextarea: React.FC<EditableTextareaProps> = ({
    label, name, value, rules, onSave, onCancel, onChange, isEditingAll, isEditing, isEditable, onEdit
}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="editable-textarea">
            <div className="editable-textarea-label">
                {label && <strong>{label}</strong>}
            </div>
            <div className="editable-textarea-input-container">
                {isEditing || isEditingAll ? (
                    <>
                        <CustomTextarea
                            name={name}
                            label={label}
                            rules={rules}
                            className="editable-textarea-input"
                            showLabel={false}
                            onChange={onChange}
                            defaultValue={value}
                        />
                        {!isEditingAll && (
                            <>
                                <Button type="primary" onClick={onSave} className="editable-textarea-button">Save</Button>
                                <Button onClick={onCancel} className="editable-textarea-button">Cancel</Button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <span>{value}</span>
                        {isEditable && (
                            <EditOutlined onClick={onEdit} className="action-icon" />
                        )}
                    </>
                )}
            </div>
            {errors[name] && <span className="error-message">{(errors[name] as FieldError)?.message}</span>}
        </div>
    );
};

export default EditableTextarea;
