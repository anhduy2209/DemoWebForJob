import React, { useEffect, useState } from 'react';
import { createContract, getAllContracts } from '../api/contractApi';
import CheckboxInput from '../components/form/CheckboxInput';
import DateTimeInput from '../components/form/DateTimeInput';
import NumberInput from '../components/form/NumberInput';
import SelectInput from '../components/form/SelectInput';
import TextareaInput from '../components/form/TextareaInput';
import TextInput from '../components/form/TextInput';
import { defaultContractFormData } from '../data/contracts';
import { Contract, ContractFormData } from '../types/contracts';

const ContractPage: React.FC = () => {
  const [form, setForm] = useState<ContractFormData>(defaultContractFormData);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch contracts when the component mounts
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
      setForm(defaultContractFormData); // Reset form
      setContracts((prev) => [...prev, response]); // Thêm hợp đồng mới vào danh sách
    } catch (error) {
      console.error('Lỗi khi tạo hợp đồng:', error);
      alert('Đã xảy ra lỗi khi lưu hợp đồng.');
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý hợp đồng</h1>
      </div>

      {/* Hiển thị danh sách hợp đồng */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6 mb-6">
        {loading && <p>Đang tải danh sách hợp đồng...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Mã hợp đồng</th>
                <th className="border border-gray-300 px-4 py-2">Tên hợp đồng</th>
                <th className="border border-gray-300 px-4 py-2">Khách hàng</th>
                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                <th className="border border-gray-300 px-4 py-2">Tổng số tiền</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length > 0 ? (
                contracts.map((contract) => (
                  <tr key={contract.contractId || `${contract.contractNumber}-${Math.random()}`}>
                    <td className="border border-gray-300 px-4 py-2">{contract.contractNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{contract.contractName}</td>
                    <td className="border border-gray-300 px-4 py-2">{contract.customerId}</td>
                    <td className="border border-gray-300 px-4 py-2">{contract.status}</td>
                    <td className="border border-gray-300 px-4 py-2">{contract.totalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">
                    Không có hợp đồng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

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

