import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Sidebar />
            <main className="transition-all duration-300 pt-16 px-2 sm:px-4 lg:px-6 ml-20 lg:ml-64">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout