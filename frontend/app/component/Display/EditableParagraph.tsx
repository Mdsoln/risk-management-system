import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useFormContext, FieldError } from 'react-hook-form';
import './EditableParagraph.css';
import CustomInput from '../Form/CustomInput';
import CustomDateTimePicker from '../Form/CustomDateTimePicker';
import CustomTextarea from '../Form/CustomTextarea';

interface EditableParagraphProps {
    label: string;
    name: string;
    value: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    rules?: object;
    onSave: () => void;
    onCancel: () => void;
    isEditingAll: boolean;
    isEditing: boolean;
    isEditable: boolean;
    onEdit: () => void;
    onChange: (value: any) => void;
    type?: 'text' | 'datetime' | 'textarea';
}

const EditableParagraph: React.FC<EditableParagraphProps> = ({
    label, name, value, icon, style, rules, onSave, onCancel, isEditingAll, isEditing, isEditable, onEdit, onChange, type = 'text',
}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="editable-paragraph" style={style}>
            <div className="editable-paragraph-label">
                {icon && <span className="editable-paragraph-icon">{icon}</span>}
                {label && <strong>{label}</strong>}
            </div>
            <div className="editable-paragraph-input-container">
                {isEditing || isEditingAll ? (
                    <>
                        {type === 'text' && (
                            <CustomInput
                                name={name}
                                label={label}
                                rules={rules}
                                className="editable-paragraph-input"
                                showLabel={false}
                                onChange={onChange}
                                defaultValue={value}
                            />
                        )}
                        {type === 'datetime' && (
                            <CustomDateTimePicker
                                name={name}
                                label={label}
                                rules={rules}
                                className="editable-paragraph-input"
                                showLabel={false}
                                defaultValue={value}
                                onChange={onChange}
                            />
                        )}
                        {type === 'textarea' && (
                            <CustomTextarea
                                name={name}
                                label={label}
                                rules={rules}
                                className="editable-textarea-input"
                                showLabel={false}
                                onChange={onChange}
                                defaultValue={value}
                            />
                        )}
                        {!isEditingAll && (
                            <>
                                <Button type="primary" onClick={onSave} className="editable-paragraph-button">Save</Button>
                                <Button onClick={onCancel} className="editable-paragraph-button">Cancel</Button>
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

export default EditableParagraph;
