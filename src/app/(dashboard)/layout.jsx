

import { SidebarProvider } from "@/hooks/use-sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background sticky top-0 left-0 bottom-0">
        {/* ================================= */}
        {/* Desktop Sidebar */}
        {/* ================================= */}

        <Sidebar />

        {/* ================================= */}
        {/* Mobile Sidebar */}
        {/* ================================= */}

        <MobileSidebar/>

        {/* ================================= */}
        {/* Main Application */}
        {/* ================================= */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Navbar */}

          <DashboardNavbar />

          {/* Page Content */}

          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}