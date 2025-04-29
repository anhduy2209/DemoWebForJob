import React, { useEffect, useState } from 'react';

interface NumberInputProps {
    label: string;
    name: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const formatNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const unformatNumber = (value: string) => {
    return value.replace(/\./g, '');
};

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    name,
    value,
    onChange,
    required = false,
}) => {

    const [displayValue, setDisplayValue] = useState<string>(value ? formatNumber(String(value)) : "0");


    useEffect(() => {
        setDisplayValue(value ? formatNumber(String(value)) : "0");
    }, [value]);

    const handleFocus = () => {
        if (displayValue === "0") {
            setDisplayValue("");
        }
    };

    const handleBlur = () => {
        if (!displayValue) {
            setDisplayValue("0");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const numeric = unformatNumber(raw);
        setDisplayValue(formatNumber(numeric));


        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                name,
                value: numeric,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
            <input
                type="text"
                name={name}
                value={displayValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                required={required}
                inputMode="numeric"
                className="w-full px-4 py-2 border border-gray-300 rounded"
            />
        </div>
    );
};

export default NumberInput;
