import {
    FileText,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    Users
} from 'lucide-react'
import type { SidebarItem } from '../types/dashboard'

export const sidebarItems: SidebarItem[] = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        title: 'Người dùng',
        icon: Users,
        path: '/dashboard/users'
    },
    {
        title: 'Sản phẩm',
        icon: ShoppingCart,
        path: '/dashboard/products'
    },
    {
        title: 'Báo cáo',
        icon: FileText,
        path: '/dashboard/reports'
    },
    {
        title: 'Cài đặt',
        icon: Settings,
        path: '/dashboard/settings'
    }
]