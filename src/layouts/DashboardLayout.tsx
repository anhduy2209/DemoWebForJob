import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navbar />
      <Sidebar setIsCollapsed={setIsCollapsed} />
      <main
        className={`transition-all duration-300 pt-16 px-2 sm:px-4 lg:px-6 ${isCollapsed ? 'ml-20' : 'ml-64'}`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
