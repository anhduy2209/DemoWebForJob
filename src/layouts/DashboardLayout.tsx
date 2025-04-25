import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main
          className={`flex-1 transition-all duration-300 pt-16 px-2 sm:px-4 lg:px-6 ${isCollapsed ? 'ml-0' : 'ml-2 sm:ml-20'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
