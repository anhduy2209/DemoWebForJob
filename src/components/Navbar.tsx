import {
  Bell,
  Globe,
  LogOut,
  Mail,
  Palette,
  Shield,
  User,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 w-full z-30 top-0 rounded-lg shadow-md my-3">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">{/* Optional search */}</div>

          <div className="flex items-center gap-4 relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
            </button>

            <div ref={avatarRef} className="relative">
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                onClick={() => setShowDropdown(prev => !prev)}
              />

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50
                    transition-all duration-200 ease-out animate-fadeInDrop"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                      <User className="w-4 h-4" />
                      Thông tin cá nhân
                    </li>
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                      <Shield className="w-4 h-4" />
                      Bảo mật
                    </li>
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                      <Mail className="w-4 h-4" />
                      Email
                    </li>
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                      <Palette className="w-4 h-4" />
                      Giao diện
                    </li>
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                      <Globe className="w-4 h-4" />
                      Ngôn ngữ
                    </li>
                    <hr className="my-1" />
                    <li
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={() => navigate('/login')}
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
