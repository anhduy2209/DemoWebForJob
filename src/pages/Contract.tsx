import React, { useState } from 'react';
import { defaultContractFormData } from '../data/contracts';
import { ContractFormData } from '../types/contracts';
import TextInput from '../components/form/TextInput';
import DateTimeInput from '../components/form/DateTimeInput';
import NumberInput from '../components/form/NumberInput';
import SelectInput from '../components/form/SelectInput';
import TextareaInput from '../components/form/TextareaInput';
import CheckboxInput from '../components/form/CheckboxInput';


const ContractPage: React.FC = () => {
    const [form, setForm] = useState<ContractFormData>(defaultContractFormData);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dữ liệu hợp đồng:', form);
        // TODO: Call API ở đây
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold text-gray-800">Hợp đồng</h2>

            <TextInput label="Mã hợp đồng" name="contractNumber" value={form.contractNumber} onChange={handleChange} required />
            <TextInput label="Tên hợp đồng" name="contractName" value={form.contractName} onChange={handleChange} required />
            <TextInput label="Khách hàng (ID)" name="customerId" value={form.customerId} onChange={handleChange} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateTimeInput label="Ngày bắt đầu" name="startDate" value={form.startDate} onChange={handleChange} required />
                <DateTimeInput label="Ngày kết thúc" name="endDate" value={form.endDate} onChange={handleChange} required />
            </div>

            <NumberInput label="Tổng số tiền" name="totalAmount" value={form.totalAmount} onChange={handleChange} required />

            <SelectInput
                label="Trạng thái"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={[
                    { label: 'ACTIVE', value: 'ACTIVE' },
                    { label: 'PENDING', value: 'PENDING' },
                    { label: 'EXPIRED', value: 'EXPIRED' }
                ]}
            />

            <TextareaInput label="Mô tả" name="description" value={form.description} onChange={handleChange} />

            <CheckboxInput label="Còn hiệu lực" name="yukoFlag" checked={form.yukoFlag} onChange={handleChange} />

            <div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Lưu hợp đồng
                </button>
            </div>
        </form>
    );
};

export default ContractPage;
