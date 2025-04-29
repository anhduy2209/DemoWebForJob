import { Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChumonType } from "../types/";

const ProductPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [chumons, setChumons] = useState<ChumonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login"); // điều hướng về trang login nếu chưa có token
      return;
    }

    const fetchChumon = async () => {
      try {
        const res = await fetch(`${API_URL}/Chumon`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login"); // token hết hạn → chuyển login
          return;
        }

        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu từ máy chủ.");
        }

        const data = await res.json();
        setChumons(data.Data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Lỗi không xác định");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChumon();
  }, [API_URL, navigate]);

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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chumons.map((chumon) => (
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
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${chumon.Status === 1
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

export default ProductPage;
