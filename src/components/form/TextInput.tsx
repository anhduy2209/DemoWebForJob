import React from 'react';

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange, required = false }) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded"
        />
    </div>
);

export default TextInput;
