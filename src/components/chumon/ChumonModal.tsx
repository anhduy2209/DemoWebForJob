import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { ChumonFormData } from "../../types";
import TextInput from "../form/TextInput";

type ChumonModalProps = {
  open: boolean;
  type: "add" | "edit" | "view";
  defaultValues?: ChumonFormData;
  onClose: () => void;
  onSave: (data: ChumonFormData) => void;
};

const ChumonModal = ({
  open,
  type,
  defaultValues,
  onClose,
  onSave,
}: ChumonModalProps) => {
  const [formData, setFormData] = useState<ChumonFormData>({
    ChumonNo: "",
    ChumonDate: "",
    HojinnCode: "",
    KonyuName: "",
    KonyuMailAddress: "",
    KonyuTantosha: "",
    KonyuKingaku1: 0,
    Nebiki: 0,
    Soryo: 0,
    ZeiRitsu1: 0,
    ChumonMeisaiList: [],
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "view") return;

    const { name, value } = e.target;
    const parsedValue = [
      "KonyuKingaku1",
      "Nebiki",
      "Soryo",
      "ZeiRitsu1",
    ].includes(name)
      ? parseFloat(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = () => {
    if (type !== "view") {
      onSave(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl z-10 relative">
        <Dialog.Title className="text-xl font-semibold mb-4">
          {type === "add" && "Thêm đơn hàng"}
          {type === "edit" && "Chỉnh sửa đơn hàng"}
          {type === "view" && "Xem chi tiết đơn hàng"}
        </Dialog.Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Mã đơn hàng"
            name="ChumonNo"
            value={formData.ChumonNo}
            onChange={handleChange}
            readOnly={type === "view"}
          />
          <TextInput
            label="Ngày"
            name="ChumonDate"
            value={formData.ChumonDate}
            onChange={handleChange}
            type="date"
            readOnly={type === "view"}
          />
          <TextInput
            label="Mã khách hàng"
            name="HojinnCode"
            value={formData.HojinnCode}
            onChange={handleChange}
            readOnly={type === "view"}
          />
          <TextInput
            label="Tên khách hàng"
            name="KonyuName"
            value={formData.KonyuName}
            onChange={handleChange}
            readOnly={type === "view"}
          />
          <TextInput
            label="Email"
            name="KonyuMailAddress"
            value={formData.KonyuMailAddress}
            onChange={handleChange}
            readOnly={type === "view"}
          />
          <TextInput
            label="Người phụ trách"
            name="KonyuTantosha"
            value={formData.KonyuTantosha}
            onChange={handleChange}
            readOnly={type === "view"}
          />
          <TextInput
            label="Giá trị mua hàng"
            name="KonyuKingaku1"
            value={String(formData.KonyuKingaku1)}
            onChange={handleChange}
            type="number"
            readOnly={type === "view"}
          />
          <TextInput
            label="Chiết khấu (¥)"
            name="Nebiki"
            value={String(formData.Nebiki)}
            onChange={handleChange}
            type="number"
            readOnly={type === "view"}
          />
          <TextInput
            label="Phí giao hàng (¥)"
            name="Soryo"
            value={String(formData.Soryo)}
            onChange={handleChange}
            type="number"
            readOnly={type === "view"}
          />
          <TextInput
            label="Thuế (%)"
            name="ZeiRitsu1"
            value={String(formData.ZeiRitsu1)}
            onChange={handleChange}
            type="number"
            readOnly={type === "view"}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          {type !== "view" && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {type === "add" ? "Thêm" : "Lưu"}
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ChumonModal;
