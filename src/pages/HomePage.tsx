import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { CHART_COLORS } from '../data/colors'
import { categoryData, productData, revenueData, stats } from '../data/dashboard'

const HomePage = () => {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Tổng quan</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className={`flex items-center ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.trend.isPositive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{stat.trend.value}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-lg lg:text-2xl font-semibold text-gray-800 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
        {/* Revenue Chart */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
            Biểu đồ doanh thu
          </h2>
          <div className="h-60 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
            Phân bố danh mục
          </h2>
          <div className="h-60 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Products Bar Chart */}
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
          Top sản phẩm bán chạy
        </h2>
        <div className="h-60 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Bar
                dataKey="sales"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default HomePage