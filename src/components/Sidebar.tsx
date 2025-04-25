import {
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { sidebarItems } from '../data/sidebar'

const Sidebar = ({ setIsCollapsed }: any) => {
  const [isCollapsed, setLocalIsCollapsed] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setLocalIsCollapsed(!isCollapsed)
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside
      className={`transition-all duration-300 bg-white border-r border-gray-200 ${isCollapsed ? 'w-20' : 'w-64'} rounded-lg shadow-lg flex flex-col h-screen mx-2 my-3`}
    >
      <div className="flex flex-col h-full">
        {/* Header of Sidebar */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed && <h1 className="text-xl font-bold text-blue-600">Admin</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <button
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            onClick={() => navigate('/login')}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Đăng xuất</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
