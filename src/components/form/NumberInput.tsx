import React from 'react';

interface NumberInputProps {
    label: string;
    name: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, value, onChange, required = false }) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded"
        />
    </div>
);

export default NumberInput;
