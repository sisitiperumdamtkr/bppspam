
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart, 
  FileText, 
  Settings, 
  LogOut,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col items-center justify-center bg-blue-700 text-white">
          <div className="p-4">
            <img 
              src="/lovable-uploads/beac8e7e-3400-49fc-910b-3f582a71c1d5.png" 
              alt="PERUMDAM Tirta Kerta Raharja" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-bold pb-2">Penilaian PERUMMDAM TKR</h2>
        </div>
        <div className="flex items-center space-x-3 p-4 border-b">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Grup Menu Utama */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Penilaian pupr 2020 */}
        <SidebarGroup>
          <SidebarGroupLabel>Penilaian Menurut PUPR tahun 2020</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/assessment/pupr"}
                  tooltip="Input Penilaian"
                >
                  <Link to="/assessment/pupr">
                    <ClipboardList className="h-5 w-5" />
                    <span>Input Penilaian</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/assessmentpupr"}
                  tooltip="Riwayat Penilaian"
                >
                  <Link to="/assessmentpupr">
                    <FileText className="h-5 w-5" />
                    <span>Riwayat Penilaian</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/reportspupr"}
                  tooltip="Laporan"
                >
                  <Link to="/reportspupr">
                    <BarChart className="h-5 w-5" />
                    <span>Laporan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Penilaian KEMENDAGRI 2020 */}
        <SidebarGroup>
          <SidebarGroupLabel>Penilaian Menurut KEMENDAGRI tahun 1999</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/assessment/kemendagri"}
                  tooltip="Input Penilaian"
                >
                  <Link to="/assessment/kemendagri">
                    <ClipboardList className="h-5 w-5" />
                    <span>Input Penilaian</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/assessmentkemendagri"}
                  tooltip="Riwayat Penilaian"
                >
                  <Link to="/assessmentkemendagri">
                    <FileText className="h-5 w-5" />
                    <span>Riwayat Penilaian</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/reportskemendagri"}
                  tooltip="Laporan"
                >
                  <Link to="/reportskemendagri">
                    <BarChart className="h-5 w-5" />
                    <span>Laporan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Lainnya */}
        <SidebarGroup>
          <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/settings"}
                  tooltip="Pengaturan"
                >
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Pengaturan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={logout} 
                  tooltip="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
