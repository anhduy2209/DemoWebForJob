import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App