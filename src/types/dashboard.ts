import { ElementType } from 'react'

export interface User {
    id: string
    name: string
    email: string
    role: string
    avatar: string
}

export interface SidebarItem {
    title: string
    icon: ElementType
    path: string
}

export interface StatCard {
    title: string
    value: string | number
    icon: ElementType
    trend: {
        value: number
        isPositive: boolean
    }
}

export interface ChartData {
    name: string
    value: number
}

export interface CategoryData {
    name: string
    value: number
}

export interface ProductData {
    name: string
    sales: number
}