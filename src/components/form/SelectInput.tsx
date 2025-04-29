import React from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    required?: boolean;
}

const getStatusBgClass = (status: string) => {
    switch (status) {
        case 'ACTIVE':
            return 'bg-green-100 text-green-800';
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        case 'EXPIRED':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-white text-gray-800';
    }
};


const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, onChange, options, required = false }) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full px-4 py-2 rounded transition-colors duration-200 ${getStatusBgClass(value)}`}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>

    </div>
);

export default SelectInput;
