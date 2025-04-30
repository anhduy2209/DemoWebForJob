import { Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ChumonType } from "../types";
import { getAllChumons, createChumon } from "../api/chumonApi"; // Giả sử bạn có API để tạo đơn hàng
import Modal from "../components/Modal";

const ChumonsPage = () => {
  const [chumons, setChumons] = useState<ChumonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChumon, setNewChumon] = useState({
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
    const fetchChumon = async () => {
      setIsLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        const data = await getAllChumons(authToken || "");
        setChumons(data.Data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Lỗi không xác định");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChumon();
  }, []);

  const handleCreateChumon = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const createdChumon = await createChumon(authToken || "", newChumon);
      setChumons((prev) => [...prev, createdChumon]);
      setIsModalOpen(false);
      setNewChumon({
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
    } catch (error: any) {
      console.error("Error creating chumon:", error);
      setError(error.message || "Lỗi không xác định");
    }
  };

  if (isLoading) return <div className="px-4 py-6">Đang tải dữ liệu...</div>;
  if (error) return <div className="px-4 py-6 text-red-600">Lỗi: {error}</div>;

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
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm đơn hàng
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Thêm đơn hàng"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateChumon();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số đơn đặt hàng
                </label>
                <input
                  type="text"
                  value={newChumon.ChumonNo}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, ChumonNo: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ngày đặt hàng
                </label>
                <input
                  type="datetime-local"
                  value={newChumon.ChumonDate}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, ChumonDate: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mã công ty (hội viên)
                </label>
                <input
                  type="text"
                  value={newChumon.HojinnCode}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, HojinnCode: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên người mua
                </label>
                <input
                  type="text"
                  value={newChumon.KonyuName}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, KonyuName: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email người mua
                </label>
                <input
                  type="email"
                  value={newChumon.KonyuMailAddress}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, KonyuMailAddress: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Người phụ trách
                </label>
                <input
                  type="text"
                  value={newChumon.KonyuTantosha}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, KonyuTantosha: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giá trị hàng (trước thuế)
                </label>
                <input
                  type="number"
                  value={newChumon.KonyuKingaku1}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, KonyuKingaku1: Number(e.target.value) })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giảm giá (nếu có)
                </label>
                <input
                  type="number"
                  value={newChumon.Nebiki || ""}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, Nebiki: Number(e.target.value) })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phí vận chuyển
                </label>
                <input
                  type="number"
                  value={newChumon.Soryo || ""}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, Soryo: Number(e.target.value) })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tỷ lệ thuế (%)
                </label>
                <input
                  type="number"
                  value={newChumon.ZeiRitsu1}
                  onChange={(e) =>
                    setNewChumon({ ...newChumon, ZeiRitsu1: Number(e.target.value) })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Danh sách chi tiết đặt hàng
                </label>
                <textarea
                  value={JSON.stringify(newChumon.ChumonMeisaiList || [], null, 2)}
                  onChange={(e) =>
                    setNewChumon({
                      ...newChumon,
                      ChumonMeisaiList: JSON.parse(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Thêm
                </button>
              </div>
            </form>
          </Modal>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chumons
                .slice()
                .sort((a, b) => a.ChumonId - b.ChumonId)
                .map((chumon) => (
                  <tr key={chumon.ChumonId}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {chumon.ChumonId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(chumon.ChumonDate).toLocaleDateString("ja-JP")}
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChumonsPage;
