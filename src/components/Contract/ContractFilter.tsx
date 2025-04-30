import React from 'react';

interface ContractFilterPanelProps {
    filters: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onReset: () => void;
    onConfirm: () => void;
}

const ContractFilterPanel: React.FC<ContractFilterPanelProps> = ({ filters, onChange, onReset, onConfirm }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <h3 className="font-semibold text-lg mb-4">Bộ lọc</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="contractNumber"
                    value={filters.contractNumber}
                    onChange={onChange}
                    placeholder="Mã hợp đồng"
                    className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="contractName"
                    value={filters.contractName}
                    onChange={onChange}
                    placeholder="Tên hợp đồng"
                    className="border border-gray-300 rounded px-4 py-2"
                />
                <select
                    name="status"
                    value={filters.status}
                    onChange={onChange}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="">Trạng thái</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="EXPIRED">EXPIRED</option>
                </select>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition"
                >
                    Đặt lại
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Áp dụng
                </button>
            </div>
        </div>
    );
};

export default ContractFilterPanel;
