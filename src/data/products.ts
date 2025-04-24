import { Product } from '../types/products'

export const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Nước mắm Nam Ngư',
        category: 'Nước mắm cốt',
        price: 45000,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '2',
        name: 'Nước tương Tam Thái Tử',
        category: 'Nước tương',
        price: 35000,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '3',
        name: 'Tương ớt Chinsu',
        category: 'Tương ớt',
        price: 25000,
        stock: 300,
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
]
