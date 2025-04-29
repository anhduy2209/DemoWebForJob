import React from 'react';

interface TextareaInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

const TextareaInput: React.FC<TextareaInputProps> = ({ label, name, value, onChange, rows = 3 }) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full px-4 py-2 border border-gray-300 rounded"
        />
    </div>
);

export default TextareaInput;
