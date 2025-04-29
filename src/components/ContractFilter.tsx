import React from 'react';
import DateTimeInput from './form/DateTimeInput';
import SelectInput from './form/SelectInput';
import TextInput from './form/TextInput';

type ContractFilterProps = {
    filters: {
        contractNumber: string;
        contractName: string;
        status: string;
        customerId: string;
        minTotalAmount: string;
        maxTotalAmount: string;
        startDate: string;
        endDate: string;
        yukoFlag: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onReset: () => void;
    onConfirm: () => void;
};

const ContractFilterPanel: React.FC<ContractFilterProps> = ({ filters, onChange, onReset, onConfirm }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md w-full max-w-4xl mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Mã hợp đồng" name="contractNumber" value={filters.contractNumber} onChange={onChange} />
                <TextInput label="Tên hợp đồng" name="contractName" value={filters.contractName} onChange={onChange} />
                <TextInput label="Khách hàng (ID)" name="customerId" value={filters.customerId} onChange={onChange} />
                <SelectInput
                    label="Trạng thái"
                    name="status"
                    value={filters.status}
                    onChange={onChange}
                    options={[
                        { label: '--- Tất cả ---', value: '' },
                        { label: 'ACTIVE', value: 'ACTIVE' },
                        { label: 'PENDING', value: 'PENDING' },
                        { label: 'EXPIRED', value: 'EXPIRED' },
                    ]}
                />
                <TextInput label="Từ tổng tiền" name="minTotalAmount" value={filters.minTotalAmount} onChange={onChange} type="number" />
                <TextInput label="Đến tổng tiền" name="maxTotalAmount" value={filters.maxTotalAmount} onChange={onChange} type="number" />
                <DateTimeInput label="Từ ngày" name="startDate" value={filters.startDate} onChange={onChange} />
                <DateTimeInput label="Đến ngày" name="endDate" value={filters.endDate} onChange={onChange} />
                <SelectInput
                    label="Còn hiệu lực"
                    name="yukoFlag"
                    value={filters.yukoFlag}
                    onChange={onChange}
                    options={[
                        { label: '--- Tất cả ---', value: '' },
                        { label: 'Có', value: '1' },
                        { label: 'Không', value: '0' },
                    ]}
                />
            </div>

            <div className="mt-4 flex gap-4">
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
                >
                    Xóa bộ lọc
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default ContractFilterPanel;
