import { Bell, Search, Settings } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            {/* <div className="relative md:w-64">
              <span className="absolute inset-y-0 left-90 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Settings className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar