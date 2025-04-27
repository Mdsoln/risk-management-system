import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import moment from 'moment';

interface CustomDateTimePickerProps {
    name: string;
    label?: string;
    rules?: object;
    className?: string;
    showLabel?: boolean;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
    name, label, rules, className, showLabel = true, defaultValue, onChange
}) => {
    const { control } = useFormContext();

    return (
        <div className={className}>
            {showLabel && <label htmlFor={name}>{label}</label>}
            <Controller
                control={control}
                name={name}
                rules={rules}
                defaultValue={defaultValue ? moment(defaultValue) : undefined}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(date) => {
                            const value = date ? date.format("YYYY-MM-DD HH:mm:ss") : '';
                            field.onChange(value);
                            if (onChange) onChange(value);
                        }}
                        value={field.value ? moment(field.value) : null}
                    />
                )}
            />
        </div>
    );
};

export default CustomDateTimePicker;
