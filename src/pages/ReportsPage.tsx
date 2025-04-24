import { Calendar, DollarSign, Download, Package, TrendingUp } from 'lucide-react'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import { categoryPerformance, monthlyRevenue } from '../data/reports'

const ReportsPage = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Báo cáo doanh thu</h1>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Calendar className="w-5 h-5" />
                        Tháng này
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <Download className="w-5 h-5" />
                        Tải xuống
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                {[
                    {
                        icon: <DollarSign className="w-6 h-6 text-green-600" />,
                        bg: "bg-green-100",
                        label: "Doanh thu tháng",
                        value: "67,000,000đ",
                        change: "+12.5%",
                        color: "text-green-600"
                    },
                    {
                        icon: <Package className="w-6 h-6 text-blue-600" />,
                        bg: "bg-blue-100",
                        label: "Đơn hàng",
                        value: "182",
                        change: "+8.2%",
                        color: "text-blue-600"
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
                        bg: "bg-purple-100",
                        label: "Tăng trưởng",
                        value: "15.3%",
                        change: "+15.3%",
                        color: "text-purple-600"
                    }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 ${item.bg} rounded-lg`}>{item.icon}</div>
                            <span className={`text-sm font-medium ${item.color}`}>{item.change}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">{item.label}</h3>
                        <p className="text-2xl font-semibold text-gray-800 mt-1">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu theo tháng</h2>
                    <div className="aspect-[2/1]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                                <Tooltip formatter={(value: number) => [`${value.toLocaleString()}đ`, 'Doanh thu']} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Hiệu suất danh mục</h2>
                    <div className="aspect-[2/1]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryPerformance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="category" />
                                <YAxis yAxisId="left" tickFormatter={(value) => `${value / 1000000}M`} />
                                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    yAxisId="left"
                                    dataKey="revenue"
                                    fill="#3B82F6"
                                    name="Doanh thu"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    yAxisId="right"
                                    dataKey="growth"
                                    fill="#10B981"
                                    name="Tăng trưởng"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsPage
