import { Filter, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ChumonType } from "../types";
import {
  createChumon,
  deleteChumon,
  getAllChumons,
  updateChumon,
} from "../api/chumonApi";
import ChumonModal from "../components/chumon/ChumonModal";
import SkeletonRow from "../components/chumon/SkeletonRow";
import toast, { Toaster } from "react-hot-toast";

const ChumonsPage = () => {
  const [chumons, setChumons] = useState<ChumonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "view">("add");
  const [selectedData, setSelectedData] = useState<ChumonType | null>(null);

  useEffect(() => {
    const fetchChumon = async () => {
      setIsLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        const data = await getAllChumons(authToken || "");
        setChumons(data.Data);
      } catch (error: any) {
        console.error("Lỗi:", error);
        setError(error.message || "Lỗi không xác định");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChumon();
  }, []);

  const handleSave = async (data: ChumonType) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (modalType === "add") {
        const newChumon = await createChumon(data, authToken || "");
        setChumons((prev) => [...prev, newChumon]);
      } else if (modalType === "edit" && selectedData) {
        const updated = await updateChumon(
          selectedData.ChumonId,
          data,
          authToken || ""
        );
        setChumons((prev) =>
          prev.map((item) =>
            item.ChumonId === selectedData.ChumonId ? updated : item
          )
        );
      }

      setModalOpen(false);
      setSelectedData(null);
    } catch (err: any) {
      console.error("Lỗi khi lưu:", err);
      alert("Đã xảy ra lỗi khi lưu dữ liệu.");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Quản lý đơn hàng (Chumon)
        </h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            Bộ lọc
          </button>
          <button
            onClick={() => {
              setModalType("add");
              setSelectedData(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm đơn hàng
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mã
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ngày
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Khách hàng
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Người phụ trách
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tổng tiền
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </>
              ) : error ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-red-500"
                  >
                    Lỗi khi tải dữ liệu: {error}
                  </td>
                </tr>
              ) : chumons.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    Không có đơn hàng nào để hiển thị.
                  </td>
                </tr>
              ) : (
                chumons
                  .slice()
                  .sort((a, b) => a.ChumonId - b.ChumonId)
                  .map((chumon) => (
                    <tr key={chumon.ChumonId}>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {chumon.ChumonNo}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {new Date(chumon.ChumonDate).toLocaleDateString(
                          "ja-JP"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {chumon.KonyuName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {chumon.KonyuMailAddress}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {chumon.KonyuTantosha}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        ¥{chumon.GokeiKingaku.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            chumon.Status === 1
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {chumon.Status === 1 ? "Hoạt động" : "Chờ xử lý"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 relative">
                        <div className="relative">
                          <button
                            onClick={() => {
                              setSelectedData(chumon);
                              setPopupOpen((prev) =>
                                selectedData?.ChumonId === chumon.ChumonId
                                  ? !prev
                                  : true
                              );
                            }}
                          >
                            <MoreHorizontal className="size-5 cursor-pointer rounded hover:bg-gray-100" />
                          </button>
                          {popupOpen &&
                            selectedData?.ChumonId === chumon.ChumonId && (
                              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                  onClick={() => {
                                    setPopupOpen(false);
                                    setModalType("view");
                                    setSelectedData(chumon);
                                    setModalOpen(true);
                                  }}
                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Xem chi tiết
                                </button>
                                <button
                                  onClick={() => {
                                    setPopupOpen(false);
                                    setModalType("edit");
                                    setSelectedData(chumon);
                                    setModalOpen(true);
                                  }}
                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Chỉnh sửa
                                </button>
                                <button
                                  onClick={async () => {
                                    setPopupOpen(false);
                                    const confirmDelete = window.confirm(
                                      `Bạn chắc chắn muốn xóa đơn hàng: ${chumon.ChumonNo}?`
                                    );
                                    if (confirmDelete) {
                                      try {
                                        const token =
                                          localStorage.getItem("authToken") ||
                                          "";
                                        await deleteChumon(
                                          chumon.ChumonId,
                                          token
                                        );

                                        const refreshed = await getAllChumons(
                                          token
                                        );
                                        setChumons(refreshed.Data);

                                        toast.success(
                                          "Xóa đơn hàng thành công!"
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Đã xảy ra lỗi khi xóa đơn hàng:",
                                          error
                                        );
                                        toast.error(
                                          "Đã xảy ra lỗi khi xóa đơn hàng."
                                        );
                                      }
                                    }
                                  }}
                                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                                >
                                  Xóa
                                </button>
                              </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ChumonModal
        open={modalOpen}
        type={modalType}
        defaultValues={selectedData ?? undefined}
        onClose={() => setModalOpen(false)}
        onSave={async (newData) => {
          if (modalType === "view") return;

          try {
            const token = localStorage.getItem("authToken") || "";
            if (modalType === "add") {
              await createChumon(newData, token);
              toast.success("Thêm mới thành công!");
            } else if (modalType === "edit" && newData.ChumonId) {
              await updateChumon(newData.ChumonId, newData, token);
              toast.success("Cập nhật thành công!");
            }
            const refreshed = await getAllChumons(token);
            setChumons(refreshed.Data);
          } catch (err) {
            console.error("Lỗi khi lưu:", err);
            toast.error("Đã xảy ra lỗi khi lưu dữ liệu.");
          } finally {
            setModalOpen(false);
          }
        }}
      />
    </div>
  );
};

export default ChumonsPage;
