import { Filter } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { createContract, getAllContracts } from '../api/contractApi';
import ContractFilterPanel from '../components/ContractFilter';
import CheckboxInput from '../components/form/CheckboxInput';
import DateTimeInput from '../components/form/DateTimeInput';
import NumberInput from '../components/form/NumberInput';
import SelectInput from '../components/form/SelectInput';
import TextareaInput from '../components/form/TextareaInput';
import TextInput from '../components/form/TextInput';
import Modal from '../components/Modal';
import { defaultContractFormData } from '../data/contracts';
import { Contract, ContractFormData } from '../types/contracts';

const ContractPage: React.FC = () => {
  const [form, setForm] = useState<ContractFormData>(defaultContractFormData);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContracts, setShowContracts] = useState(false); // New: toggle contracts list
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contractNumber: '',
    contractName: '',
    status: '',
    customerId: '',
    minTotalAmount: '',
    maxTotalAmount: '',
    startDate: '',
    endDate: '',
    yukoFlag: '',
  });

  const filterRef = useRef<HTMLDivElement>(null); // Reference to the filter panel container

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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
        console.log('Dữ liệu trả về từ API:', data);

        const normalizedContracts = (data?.Data || []).map((contract: any) => ({
          contractId: contract.ContractId,
          contractNumber: contract.ContractNumber,
          contractName: contract.ContractName,
          customerId: contract.CustomerId,
          status: contract.Status,
          totalAmount: contract.TotalAmount,
          description: contract.Description,
          startDate: contract.StartDate,
          endDate: contract.EndDate,
          yukoFlag: contract.YukoFlag,
          createdAt: contract.CreatedAt,
          updatedAt: contract.UpdatedAt,
          lastUpdate: contract.LastUpdate,
          lastUpdateUser: contract.LastUpdateUser,
          lastUpdateProgram: contract.LastUpdateProgram,
        }));

        setContracts(normalizedContracts);
        setLoading(false);
      } catch (err: any) {
        setError('Không thể tải danh sách hợp đồng.');
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.contractNumber ||
      !form.contractName ||
      !form.startDate ||
      !form.endDate ||
      Number(form.totalAmount) <= 0
    ) {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ.');
      return;
    }

    const formattedForm = {
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      contractPaymentList: form.contractPaymentList || [],
    };
    console.log('Dữ liệu gửi lên API:', formattedForm);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await createContract(formattedForm, authToken || '');
      console.log('Hợp đồng đã được tạo:', response);
      alert('Hợp đồng đã được lưu thành công!');
      setForm(defaultContractFormData);
      setContracts((prev) => [...prev, response]);
    } catch (error) {
      console.error('Lỗi khi tạo hợp đồng:', error);
      alert('Đã xảy ra lỗi khi lưu hợp đồng.');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    // Thực hiện gọi API với các bộ lọc
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Bạn chưa đăng nhập!');
        setLoading(false);
        return;
      }

      const filteredContracts = await getAllContracts(authToken); // API sẽ nhận các filters
      const filteredData = (filteredContracts?.Data || []).filter((contract: any) => {
        // Áp dụng bộ lọc từ state
        return (
          (filters.contractNumber ? contract.ContractNumber.includes(filters.contractNumber) : true) &&
          (filters.contractName ? contract.ContractName.includes(filters.contractName) : true) &&
          (filters.status ? contract.Status === filters.status : true)
        );
      });

      setContracts(filteredData);
      setLoading(false);
    } catch (error) {
      setError('Không thể tải danh sách hợp đồng.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý hợp đồng</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mb-4">
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Bộ lọc

          </button>

          {showFilters && (
            <div
              ref={filterRef}
              className="absolute  z-10"
              style={{ top: '15%', left: '40%' }}
            >
              <ContractFilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={() =>
                  setFilters({
                    contractNumber: '',
                    contractName: '',
                    status: '',
                    customerId: '',
                    minTotalAmount: '',
                    maxTotalAmount: '',
                    startDate: '',
                    endDate: '',
                    yukoFlag: '',
                  })
                }
                onConfirm={handleConfirm}
              />
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >Xem hợp đồng
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Danh sách hợp đồng"
          >
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 max-h-[70vh] overflow-y-auto">
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <div
                      key={contract.contractId || `${contract.contractNumber}-${Math.random()}`}
                      className="border border-gray-300 rounded p-4 shadow-sm"
                    >
                      <h3 className="font-semibold">{contract.contractName}</h3>
                      <p><strong>Mã:</strong> {contract.contractNumber}</p>
                      <p><strong>Khách hàng:</strong> {contract.customerId}</p>
                      <p><strong>Trạng thái:</strong> {contract.status}</p>
                      <p><strong>Tổng tiền:</strong> {formatCurrency(contract.totalAmount)}</p>
                    </div>
                  ))
                ) : (
                  <p>Không có hợp đồng nào.</p>
                )}
              </div>
            )}
          </Modal>
        </div>

      </div>

      {/* Hiển thị danh sách hợp đồng */}
      {/* <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6 mb-6">
        <button
          onClick={() => setShowContracts((prev) => !prev)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {showContracts ? 'Ẩn danh sách hợp đồng' : 'Xem danh sách hợp đồng'}
        </button>

        {loading && <p>Đang tải danh sách hợp đồng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {showContracts && !loading && !error && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <div
                  key={contract.contractId || `${contract.contractNumber}-${Math.random()}`}
                  className="border border-gray-300 rounded p-4 shadow hover:shadow-md transition"
                >
                  <h2 className="font-semibold text-lg mb-2">{contract.contractName}</h2>
                  <p><strong>Mã:</strong> {contract.contractNumber}</p>
                  <p><strong>Khách hàng:</strong> {contract.customerId}</p>
                  <p><strong>Trạng thái:</strong> {contract.status}</p>
                  <p><strong>Tổng tiền:</strong> {contract.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>Không có hợp đồng nào.</p>
            )}
          </div>
        )}
      </div> */}



      {/* Form tạo hợp đồng */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Mã hợp đồng"
              name="contractNumber"
              value={form.contractNumber}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Tên hợp đồng"
              name="contractName"
              value={form.contractName}
              onChange={handleChange}
              required
            />
          </div>

          <TextInput
            label="Khách hàng (ID)"
            name="customerId"
            value={form.customerId.toString()}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateTimeInput
              label="Ngày bắt đầu"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <DateTimeInput
              label="Ngày kết thúc"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <NumberInput
            label="Tổng số tiền"
            name="totalAmount"
            value={form.totalAmount}
            onChange={handleChange}
            required
          />

          <SelectInput
            label="Trạng thái"
            name="status"
            value={form.status}
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <CheckboxInput
            label="Còn hiệu lực"
            name="yukoFlag"
            checked={!!form.yukoFlag}
            onChange={handleChange}
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
      </div>
    </div>
  );
};

export default ContractPage;
