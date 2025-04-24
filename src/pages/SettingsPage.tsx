import {
    Bell,
    Globe,
    Lock,
    Mail,
    Palette,
    Shield,
    User
} from 'lucide-react'
import { useState } from 'react'
import Modal from '../components/Modal'

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({ title: '', content: '' })

    const handleSettingClick = (title: string, content: string) => {
        setModalContent({ title, content })
        setIsModalOpen(true)
        console.log('SettingsPage loaded')

    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Cài đặt hệ thống</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x"> */}
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-300">
                    <div className="p-6">
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors shadow-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <User className="w-5 h-5 mr-3" />
                                Thông tin cá nhân
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors shadow-md ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Bell className="w-5 h-5 mr-3" />
                                Thông báo
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors shadow-md ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Lock className="w-5 h-5 mr-3" />
                                Bảo mật
                            </button>
                        </nav>
                    </div>

                    <div className="col-span-3 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                onClick={() => handleSettingClick('Thông tin cá nhân', 'Cập nhật thông tin cá nhân của bạn')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <User className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Thông tin cá nhân</h3>
                                <p className="text-sm text-gray-600">Cập nhật thông tin cá nhân của bạn</p>
                            </div>

                            <div
                                onClick={() => handleSettingClick('Thông báo', 'Quản lý cài đặt thông báo')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Bell className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Thông báo</h3>
                                <p className="text-sm text-gray-600">Quản lý cài đặt thông báo</p>
                            </div>

                            <div
                                onClick={() => handleSettingClick('Bảo mật', 'Cài đặt bảo mật tài khoản')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Bảo mật</h3>
                                <p className="text-sm text-gray-600">Cài đặt bảo mật tài khoản</p>
                            </div>

                            <div
                                onClick={() => handleSettingClick('Giao diện', 'Tùy chỉnh giao diện người dùng')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Palette className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Giao diện</h3>
                                <p className="text-sm text-gray-600">Tùy chỉnh giao diện người dùng</p>
                            </div>

                            <div
                                onClick={() => handleSettingClick('Email', 'Cài đặt email và thông báo')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Mail className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Email</h3>
                                <p className="text-sm text-gray-600">Cài đặt email và thông báo</p>
                            </div>

                            <div
                                onClick={() => handleSettingClick('Ngôn ngữ', 'Thay đổi ngôn ngữ hệ thống')}
                                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Globe className="w-6 h-6 text-blue-600 mb-2" />
                                <h3 className="font-medium text-gray-800">Ngôn ngữ</h3>
                                <p className="text-sm text-gray-600">Thay đổi ngôn ngữ hệ thống</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalContent.title}
            >
                <p className="text-gray-600">{modalContent.content}</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Đóng
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SettingsPage