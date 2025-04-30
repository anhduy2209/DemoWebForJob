import React, { useEffect, useState } from 'react';
import { createContract, getAllContracts } from '../api/contractApi';
import ContractFilterPanel from '../components/contract/ContractFilter';
import ContractForm from '../components/contract/ContractForm';
import ContractList from '../components/contract/ContractList';
import { defaultContractFormData } from '../data/contracts';
import { Contract, ContractFormData } from '../types/contracts';

const ContractPage: React.FC = () => {
  const [form, setForm] = useState<ContractFormData>(defaultContractFormData);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    contractNumber: '',
    contractName: '',
    status: '',
  });

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          setError('Bạn chưa đăng nhập!');
          setLoading(false);
          return;
        }

        const data = await getAllContracts(authToken);
        setContracts(data?.Data || []);
        setLoading(false);
      } catch (err: any) {
        setError('Không thể tải danh sách hợp đồng.');
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await createContract(form, authToken || '');
      setContracts((prev) => [...prev, response]);
      setForm(defaultContractFormData);
    } catch (error) {
      console.error('Lỗi khi tạo hợp đồng:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    // Lọc danh sách hợp đồng
    const filteredContracts = contracts.filter((contract) =>
      (filters.contractNumber ? contract.contractNumber.includes(filters.contractNumber) : true) &&
      (filters.contractName ? contract.contractName.includes(filters.contractName) : true) &&
      (filters.status ? contract.status === filters.status : true)
    );
    setContracts(filteredContracts);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý hợp đồng</h1>
      <ContractFilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onReset={() => setFilters({ contractNumber: '', contractName: '', status: '' })}
        onConfirm={handleConfirm}
      />
      <ContractList contracts={contracts} loading={loading} error={error} />
      <ContractForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default ContractPage;
