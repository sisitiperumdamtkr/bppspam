
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <SidebarTrigger className="md:hidden mr-3" />
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
    </SidebarProvider>
  );
};

export default DashboardLayout;
