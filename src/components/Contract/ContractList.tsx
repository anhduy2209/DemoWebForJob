import React from 'react';
import { Contract } from '../../types/contracts';

interface ContractListProps {
    contracts: Contract[];
    loading: boolean;
    error: string | null;
}

const ContractList: React.FC<ContractListProps> = ({ contracts, loading, error }) => {
    if (loading) return <p>Đang tải danh sách hợp đồng...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (contracts.length === 0) return <p>Không có hợp đồng nào.</p>;

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {contracts.map((contract) => (
                <div
                    key={contract.contractId}
                    className="border border-gray-300 rounded p-4 shadow hover:shadow-md transition"
                >
                    <h2 className="font-semibold text-lg mb-2">{contract.contractName}</h2>
                    <p><strong>Mã:</strong> {contract.contractNumber}</p>
                    <p><strong>Khách hàng:</strong> {contract.customerId}</p>
                    <p><strong>Trạng thái:</strong> {contract.status}</p>
                    <p><strong>Tổng tiền:</strong> {contract.totalAmount}</p>
                </div>
            ))}
        </div>
    );
};

export default ContractList;