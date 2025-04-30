import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import DashboardLayout from "./layouts/DashboardLayout";
import ContractPage from "./pages/Contract";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import API_LOGIN from "./pages/Tests/API_LOGIN";
import UserPage from "./pages/UserPage";
import ChumonsPage from "./pages/ChumonsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="chumons" element={<ChumonsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="contracts" element={<ContractPage />} />
            <Route path="test-login" element={<API_LOGIN />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
