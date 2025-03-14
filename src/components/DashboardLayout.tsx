
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      label: "Input Penilaian",
      path: "/assessment/new"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Riwayat Penilaian",
      path: "/assessments"
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Laporan",
      path: "/reports"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Pengaturan",
      path: "/settings"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-center h-16 border-b bg-blue-700">
            <h2 className="text-xl font-bold text-white">HealthWise PDAM</h2>
          </div>
          <div className="px-4 py-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>
          <nav className="px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group"
              >
                <span className="mr-3 text-gray-500 group-hover:text-blue-700">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group"
            >
              <span className="mr-3 text-gray-500 group-hover:text-blue-700">
                <LogOut className="h-5 w-5" />
              </span>
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${sidebarOpen ? "block" : "hidden"}`} 
        onClick={toggleSidebar}
      ></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-200 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-blue-700">HealthWise PDAM</h2>
          <button onClick={toggleSidebar} className="p-1 rounded-md">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="px-4 py-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
        <nav className="px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group"
              onClick={toggleSidebar}
            >
              <span className="mr-3 text-gray-500 group-hover:text-blue-700">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              toggleSidebar();
            }}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group"
          >
            <span className="mr-3 text-gray-500 group-hover:text-blue-700">
              <LogOut className="h-5 w-5" />
            </span>
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="p-1 mr-3 rounded-md hover:bg-gray-100 md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 overflow-y-auto" style={{ height: "calc(100vh - 64px)" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
