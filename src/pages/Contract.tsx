import axios from 'axios'; // Chắc chắn cần axios nếu bạn muốn gọi API
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import CheckboxInput from '../components/form/CheckboxInput';
import DateTimeInput from '../components/form/DateTimeInput';
import NumberInput from '../components/form/NumberInput';
import SelectInput from '../components/form/SelectInput';
import TextareaInput from '../components/form/TextareaInput';
import TextInput from '../components/form/TextInput';
import { defaultContractFormData } from '../data/contracts';
import { ContractFormData } from '../types/contracts';

const ContractPage: React.FC = () => {
  const [form, setForm] = useState<ContractFormData>(defaultContractFormData);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Lưu lỗi nếu có

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading

    // Kiểm tra tính hợp lệ trước khi gửi (validation)
    if (!form.contractNumber || !form.contractName || !form.startDate || !form.endDate || Number(form.totalAmount) <= 0) {
      setError('Vui lòng điền đầy đủ thông tin hợp lệ.');
      setLoading(false);
      return;
    }

    try {
      // Thực hiện gọi API
      const response = await axios.post('/api/contract', form); // Giả sử endpoint API của bạn là '/api/contract'
      toast.success('Hợp đồng đã được lưu thành công!');
      setLoading(false);
      // Reset form hoặc chuyển hướng nếu cần
      setForm(defaultContractFormData);
    } catch (error) {
      setError('Đã có lỗi xảy ra khi lưu hợp đồng.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý hợp đồng</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 mb-4 p-3 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Mã hợp đồng" name="contractNumber" value={form.contractNumber} onChange={handleChange} required />
            <TextInput label="Tên hợp đồng" name="contractName" value={form.contractName} onChange={handleChange} required />
          </div>

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
              { label: 'EXPIRED', value: 'EXPIRED' },
            ]}
          />

          <TextareaInput label="Mô tả" name="description" value={form.description} onChange={handleChange} />

          <CheckboxInput label="Còn hiệu lực" name="yukoFlag" checked={form.yukoFlag} onChange={handleChange} />

          <div className="flex justify-between gap-4">
            <button
              type="reset"
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              onClick={() => setForm(defaultContractFormData)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition-colors`}
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Lưu hợp đồng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractPage;
