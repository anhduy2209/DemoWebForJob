import { CreditCard, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import type { CategoryData, ChartData, ProductData, StatCard } from '../types/dashboard'

export const stats: StatCard[] = [
    {
        title: 'Tổng người dùng',
        value: '13,596',
        icon: Users,
        trend: { value: 12, isPositive: true }
    },
    {
        title: 'Tổng sản phẩm',
        value: '4,320',
        icon: ShoppingBag,
        trend: { value: 8, isPositive: true }
    },
    {
        title: 'Doanh thu',
        value: '246,580,000đ',
        icon: CreditCard,
        trend: { value: 4, isPositive: false }
    },
    {
        title: 'Tăng trưởng',
        value: '24.5%',
        icon: TrendingUp,
        trend: { value: 18, isPositive: true }
    }
]

export const revenueData: ChartData[] = [
    { name: 'T1', value: 4000 },
    { name: 'T2', value: 3000 },
    { name: 'T3', value: 2000 },
    { name: 'T4', value: 2780 },
    { name: 'T5', value: 1890 },
    { name: 'T6', value: 2390 },
    { name: 'T7', value: 3490 },
    { name: 'T8', value: 4000 },
    { name: 'T9', value: 2000 },
    { name: 'T10', value: 2780 },
    { name: 'T11', value: 1890 },
    { name: 'T12', value: 3578 }
]

export const categoryData: CategoryData[] = [
    { name: 'Nước mắm cốt', value: 35 },
    { name: 'Nước tương', value: 25 },
    { name: 'Tương ớt', value: 20 },
    { name: 'Tương cà', value: 15 },
    { name: 'Nước chấm', value: 5 }
]

export const productData: ProductData[] = [
    { name: 'Nước mắm Nam Ngư', sales: 1200 },
    { name: 'Nước tương Tam Thái Tử', sales: 900 },
    { name: 'Tương ớt Chinsu', sales: 800 },
    { name: 'Nước mắm Phú Quốc', sales: 700 },
    { name: 'Nước chấm Knorr', sales: 600 }
]