import { Dialog } from "@headlessui/react";
import { useState } from "react";
import TextInput from "../form/TextInput";
import { ChumonFormData } from "../../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onFilter: (filter: Partial<ChumonFormData & { ChumonId?: number }>) => void;
};

const ChumonFilterModal = ({ open, onClose, onFilter }: Props) => {
  const [filter, setFilter] = useState<
    Partial<ChumonFormData & { ChumonId?: number }>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue = [
      "ChumonId",
      "KonyuKingaku1",
      "Nebiki",
      "Soryo",
      "ZeiRitsu1",
    ].includes(name)
      ? value === ""
        ? undefined
        : parseFloat(value)
      : value;

    setFilter((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = () => {
    onFilter(filter);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl z-10 relative">
        <Dialog.Title className="text-lg font-semibold mb-4">
          Lọc đơn hàng
        </Dialog.Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            name="ChumonId"
            label="Chumon ID"
            value={filter.ChumonId !== undefined ? String(filter.ChumonId) : ""}
            onChange={handleChange}
          />
          <TextInput
            name="ChumonNo"
            label="Chumon No"
            value={filter.ChumonNo ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="ChumonDate"
            label="Chumon Date"
            value={filter.ChumonDate ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="HojinnCode"
            label="Hojinn Code"
            value={filter.HojinnCode ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="KonyuName"
            label="Konyu Name"
            value={filter.KonyuName ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="KonyuMailAddress"
            label="Email"
            value={filter.KonyuMailAddress ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="KonyuTantosha"
            label="Người phụ trách"
            value={filter.KonyuTantosha ?? ""}
            onChange={handleChange}
          />
          <TextInput
            name="KonyuKingaku1"
            label="Kingaku"
            value={
              filter.KonyuKingaku1 !== undefined
                ? String(filter.KonyuKingaku1)
                : ""
            }
            onChange={handleChange}
          />
          <TextInput
            name="Nebiki"
            label="Chiết khấu (Nebiki)"
            value={filter.Nebiki !== undefined ? String(filter.Nebiki) : ""}
            onChange={handleChange}
          />
          <TextInput
            name="Soryo"
            label="Phí vận chuyển (Soryo)"
            value={filter.Soryo !== undefined ? String(filter.Soryo) : ""}
            onChange={handleChange}
          />
          <TextInput
            name="ZeiRitsu1"
            label="Thuế (ZeiRitsu1)"
            value={
              filter.ZeiRitsu1 !== undefined ? String(filter.ZeiRitsu1) : ""
            }
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Lọc
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChumonFilterModal;
