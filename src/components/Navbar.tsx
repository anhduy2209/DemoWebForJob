import {
  Bell,
  Globe,
  LogOut,
  Mail,
  Palette,
  Shield,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 w-full z-30 top-0 shadow-md my-3 rounded-lg">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left side: Logo or Search */}
          <div className="flex items-center flex-1">
            {/* Bạn có thể đặt logo hoặc search tại đây */}
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications (visible on desktop) */}
            <button className="hidden lg:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
            </button>

            {/* Avatar (desktop dropdown) */}
            <div ref={avatarRef} className="hidden lg:block relative">
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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

            {/* Hamburger menu (mobile only) */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12' // X icon
                      : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-2 bg-white border-t border-gray-200 shadow-md z-40">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
              <Shield className="w-4 h-4" />
              Bảo mật
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
              <Mail className="w-4 h-4" />
              Email
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
              <Palette className="w-4 h-4" />
              Giao diện
            </li>
            <li className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
              <Globe className="w-4 h-4" />
              Ngôn ngữ
            </li>
            <li
              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer text-red-500"
              onClick={() => navigate('/login')}
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
