import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Input } from 'antd';

interface CustomInputProps {
    name: string;
    label?: string;
    rules?: object;
    className?: string;
    showLabel?: boolean;
    onChange?: (value: string) => void;
    defaultValue?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, rules, className, showLabel = true, onChange, defaultValue }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className={className}>
            {showLabel && <label htmlFor={name}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <>
                        <Input
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                if (onChange) onChange(e.target.value);
                            }}
                            value={field.value}
                        />
                        {errors[name] && <span className="error-message">{(errors[name] as FieldError)?.message || 'This field is required'}</span>}
                    </>
                )}
            />
        </div>
    );
};

export default CustomInput;
