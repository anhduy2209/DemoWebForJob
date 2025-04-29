import React from 'react';

interface CheckboxInputProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, checked, onChange }) => (
    <div className="flex items-center space-x-2">
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm text-gray-700">{label}</label>
    </div>
);

export default CheckboxInput;
