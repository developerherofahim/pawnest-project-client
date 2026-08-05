"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, PlusCircle, List } from "lucide-react";

const dashboardLinks = [
  {
    id: "01",
    name: "My Request",
    href: "/dashboard/my-request",
    icon: Heart,
  },
  {
    id: "02",
    name: "Add Pet",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
  },
  {
    id: "03",
    name: "My Listing",
    href: "/dashboard/my-listing",
    icon: List,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 bg-[#173328] text-white flex-col shadow-xl">
        <div className="border-b border-white/10 p-6">
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        <nav className="flex-1 p-5">
          <ul className="space-y-3">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                      ${
                        active
                          ? "bg-white text-[#173328] font-semibold shadow-md"
                          : "hover:bg-white/10"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5 text-center text-sm text-gray-300">
          © 2026 Pet Adoption
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 pb-20 md:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg md:hidden">
        <ul className="flex justify-around py-2">
          {dashboardLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? "text-[#173328] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <Icon size={22} />
                  <span className="text-xs">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}