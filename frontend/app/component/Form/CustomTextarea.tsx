import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';

interface CustomTextareaProps {
    name: string;
    label?: string;
    rules?: object;
    className?: string;
    showLabel?: boolean;
    onChange?: (value: string) => void;
    defaultValue?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({ name, label, rules, className, showLabel = true, onChange, defaultValue }) => {
    const { control } = useFormContext();

    return (
        <div className={className}>
            {showLabel && <label htmlFor={name}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Input.TextArea
                        {...field}
                        onChange={(e) => {
                            field.onChange(e.target.value);
                            if (onChange) onChange(e.target.value);
                        }}
                        value={field.value}
                    />
                )}
            />
        </div>
    );
};

export default CustomTextarea;
