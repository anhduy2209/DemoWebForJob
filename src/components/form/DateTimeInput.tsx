import React from 'react';

interface DateTimeInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: 'date' | 'datetime-local'; 
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
    label,
    name,
    value,
    onChange,
    required = false,
    type = 'datetime-local', 
}) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}  
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded"
        />
    </div>
);

export default DateTimeInput;
