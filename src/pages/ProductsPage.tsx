import { ChevronLeft, ChevronRight, Edit2, Filter, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../components/Modal'
import { initialProducts } from '../data/products'
import { FilterOptions, categories } from '../types/filters'
import { Product } from '../types/products'

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        category: [],
        minPrice: 0,
        maxPrice: 1000000,
        inStock: false
    })

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

    const filteredProducts = products.filter(product => {
        const matchesCategory = filterOptions.category.length === 0 ||
            filterOptions.category.includes(product.category)
        const matchesPrice = product.price >= filterOptions.minPrice &&
            product.price <= filterOptions.maxPrice
        const matchesStock = !filterOptions.inStock || product.stock > 0
        return matchesCategory && matchesPrice && matchesStock
    })

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsFilterModalOpen(false)
        setCurrentPage(1)
    }

    const renderPagination = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            if (currentPage > 3) pages.push('...')

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) pages.push('...')
            pages.push(totalPages)
        }

        return (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <div className="flex items-center">
                    <span className="text-sm text-gray-700">
                        Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, filteredProducts.length)} trong số {filteredProducts.length} sản phẩm
                    </span>
                    <select
                        className="ml-4 px-2 py-1 border rounded-md"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value))
                            setCurrentPage(1)
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {pages.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                            className={`px-3 py-1 rounded-lg ${currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : typeof page === 'number'
                                        ? 'hover:bg-gray-100'
                                        : ''
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <Toaster position="top-right" />
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                        Bộ lọc
                        {(filterOptions.category.length > 0 || filterOptions.inStock) && (
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                    </button>
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
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
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
                            {paginatedProducts.map((product) => (
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
                {renderPagination()}
            </div>

            {/* Filter Modal */}
            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Bộ lọc sản phẩm"
            >
                <form onSubmit={handleFilterSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={category === 'Tất cả' ? filterOptions.category.length === 0 : filterOptions.category.includes(category)}
                                        onChange={(e) => {
                                            if (category === 'Tất cả') {
                                                setFilterOptions(prev => ({
                                                    ...prev,
                                                    category: e.target.checked ? [] : categories.filter(c => c !== 'Tất cả')
                                                }))
                                            } else {
                                                setFilterOptions(prev => ({
                                                    ...prev,
                                                    category: e.target.checked
                                                        ? [...prev.category, category]
                                                        : prev.category.filter(c => c !== category)
                                                }))
                                            }
                                        }}
                                        className="rounded border-gray-300 text-blue-600 mr-2"
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={filterOptions.minPrice}
                                onChange={(e) => setFilterOptions(prev => ({
                                    ...prev,
                                    minPrice: Number(e.target.value)
                                }))}
                                placeholder="Từ"
                                className="w-full rounded-md border-gray-300"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                value={filterOptions.maxPrice}
                                onChange={(e) => setFilterOptions(prev => ({
                                    ...prev,
                                    maxPrice: Number(e.target.value)
                                }))}
                                placeholder="Đến"
                                className="w-full rounded-md border-gray-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filterOptions.inStock}
                                onChange={(e) => setFilterOptions(prev => ({
                                    ...prev,
                                    inStock: e.target.checked
                                }))}
                                className="rounded border-gray-300 text-blue-600 mr-2"
                            />
                            Chỉ hiện sản phẩm còn hàng
                        </label>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setFilterOptions({
                                    category: [],
                                    minPrice: 0,
                                    maxPrice: 1000000,
                                    inStock: false
                                })
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Đặt lại
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Áp dụng
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Add/Edit Product Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            >
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="block w-full h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            defaultValue={selectedProduct?.name}
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                        <select
                            className="block w-full h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            defaultValue={selectedProduct?.category}
                        >
                            {categories.filter(c => c !== 'Tất cả').map(category => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giá</label>
                        <input
                            type="number"
                            className="block w-full h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            defaultValue={selectedProduct?.price}
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng tồn kho</label>
                        <input
                            type="number"
                            className="block w-full h-12 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                            defaultValue={selectedProduct?.stock}
                            placeholder="Nhập số lượng tồn kho"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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