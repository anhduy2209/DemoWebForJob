import { Edit2, Filter, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../components/Modal'
import { initialProducts } from '../data/products'
import { Product } from '../types/products'

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleEdit = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const handleDelete = (productId: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter(p => p.id !== productId))
            toast.success('Đã xóa sản phẩm')
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <Toaster position="top-right" />
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
                <button
                    onClick={() => {
                        setSelectedProduct(null)
                        setIsModalOpen(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Thêm sản phẩm
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <div className="p-4 border-b border-gray-200 min-w-[640px]">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Filter className="w-5 h-5" />
                            Lọc
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.price.toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedProduct?.name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedProduct?.category}
                        >
                            <option>Nước mắm cốt</option>
                            <option>Nước tương</option>
                            <option>Tương ớt</option>
                            <option>Tương cà</option>
                            <option>Nước chấm</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giá</label>
                        <input
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedProduct?.price}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số lượng tồn kho</label>
                        <input
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedProduct?.stock}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {selectedProduct ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ProductsPage
