import React from 'react';
import { ContractFormData } from '../../types/contracts';
import CheckboxInput from '../form/CheckboxInput';
import DateTimeInput from '../form/DateTimeInput';
import NumberInput from '../form/NumberInput';
import SelectInput from '../form/SelectInput';
import TextareaInput from '../form/TextareaInput';
import TextInput from '../form/TextInput';

interface ContractFormProps {
    form: ContractFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ form, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                    label="Mã hợp đồng"
                    name="contractNumber"
                    value={form.contractNumber}
                    onChange={onChange}
                    required
                />
                <TextInput
                    label="Tên hợp đồng"
                    name="contractName"
                    value={form.contractName}
                    onChange={onChange}
                    required
                />
            </div>

            <TextInput
                label="Khách hàng (ID)"
                name="customerId"
                value={form.customerId.toString()}
                onChange={onChange}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateTimeInput
                    label="Ngày bắt đầu"
                    name="startDate"
                    value={form.startDate}
                    onChange={onChange}
                    required
                />
                <DateTimeInput
                    label="Ngày kết thúc"
                    name="endDate"
                    value={form.endDate}
                    onChange={onChange}
                    required
                />
            </div>

            <NumberInput
                label="Tổng số tiền"
                name="totalAmount"
                value={form.totalAmount}
                onChange={onChange}
                required
            />

            <SelectInput
                label="Trạng thái"
                name="status"
                value={form.status}
                onChange={onChange}
                options={[
                    { label: 'ACTIVE', value: 'ACTIVE' },
                    { label: 'PENDING', value: 'PENDING' },
                    { label: 'EXPIRED', value: 'EXPIRED' },
                ]}
            />

            <TextareaInput
                label="Mô tả"
                name="description"
                value={form.description ?? ''}
                onChange={onChange}
            />

            <CheckboxInput
                label="Còn hiệu lực"
                name="yukoFlag"
                checked={!!form.yukoFlag}
                onChange={onChange}
            />

            <div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Lưu hợp đồng
                </button>
            </div>
        </form>
    );
};

export default ContractForm;