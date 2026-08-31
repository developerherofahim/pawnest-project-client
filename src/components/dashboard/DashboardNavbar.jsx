"use client";

import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  House,
  Menu,
  Search,
} from "lucide-react";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your pet adoption activity",
  },

  "/my-pets": {
    title: "My Pets",
    description: "Manage the pets you have listed",
  },

  "/add-pet": {
    title: "Add Pet",
    description: "Create a new pet listing",
  },

  "/requests": {
    title: "Adoption Requests",
    description: "Manage your adoption requests",
  },

  "/users": {
    title: "Users",
    description: "Manage platform users",
  },

  "/settings": {
    title: "Settings",
    description: "Manage your account preferences",
  },
};

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const currentPage = pageTitles[pathname] ?? {
    title: "Home",
    description: "Manage your pet adoption platform",
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30",
        "flex h-18 items-center justify-between",
        "border-b border-white/60",
        "bg-primary-900/95 backdrop-blur-xl",
        "px-4 sm:px-6",
        "transition-all duration-300"
      )}
    >
      {/* =========================================================
          LEFT SECTION
      ========================================================= */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl",
            "text-muted-foreground",
            "transition-all duration-200",
            "hover:bg-muted hover:text-foreground",
            "active:scale-95",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary-500/30",
            "md:hidden"
          )}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Information */}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-base font-bold tracking-tight text-white/80 sm:text-lg">
              {currentPage.title}
            </h1>

            {/* Desktop page indicator */}

            <span className="hidden h-1.5 w-1.5 rounded-full bg-secondary-500 sm:block" />
          </div>

          <p className="hidden max-w-xl truncate text-xs font-medium text-white/80 sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* =========================================================
          RIGHT SECTION
      ========================================================= */}



      <div className="flex items-center gap-1 sm:gap-2">

        {/* =======================================================
    GO TO HOMEPAGE
======================================================= */}

        <Link
          href="/"
          aria-label="Go to homepage"
          className={cn(
            "group flex h-10 items-center gap-2",
            "rounded-xl",
            "border border-white/10",
            "bg-white/5",
            "px-3",
            "text-sm font-medium text-white/60",
            "transition-all duration-200",
            "hover:border-white/15",
            "hover:bg-white/10",
            "hover:text-white",
            "active:scale-[0.98]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary-500/30"
          )}
        >
          <House
            className={cn(
              "h-4 w-4",
              "text-white/50",
              "transition-colors duration-200",
              "group-hover:text-white"
            )}
          />

          <span className="hidden sm:inline">Home</span>
        </Link>
        {/* =======================================================
            DESKTOP SEARCH
        ======================================================= */}

        <button
          type="button"
          aria-label="Search"
          className={cn(
            "group hidden h-10 items-center gap-2",
            "rounded-xl",
            "border border-white/10",
            "bg-white/5",
            "px-3",
            "text-sm text-white/55",
            "transition-all duration-200",
            "hover:border-white/15",
            "hover:bg-white/10",
            "hover:text-white/90",
            "active:scale-[0.98]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary-500/30",
            "lg:flex"
          )}
        >
          <Search
            className={cn(
              "h-4 w-4 shrink-0",
              "text-white/50",
              "transition-colors duration-200",
              "group-hover:text-white/80"
            )}
          />

          <span>Search</span>

          <kbd
            className={cn(
              "ml-6 hidden xl:inline-flex",
              "items-center justify-center",
              "rounded-md",
              "border border-white/10",
              "bg-white/5",
              "px-1.5 py-0.5",
              "text-[10px] font-medium",
              "text-white/40"
            )}
          >
            ⌘ K
          </kbd>
        </button>

        {/* Divider */}

        <div className="mx-1 hidden h-7 w-px bg-border/70 sm:block" />

        {/* Notifications */}

        <button
          type="button"
          aria-label="Notifications"
          className={cn(
            "group relative flex h-10 w-10",
            "items-center justify-center",
            "rounded-xl",
            "text-white/55",
            "transition-all duration-200",
            "hover:bg-muted hover:text-foreground",
            "active:scale-95",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary-500/30"
          )}
        >
          <Bell
            className={cn(
              "h-4.75 w-4.75",
              "transition-transform duration-200",
              "group-hover:scale-105"
            )}
          />

          {/* Notification indicator */}

          <span
            className={cn(
              "absolute right-2 top-1.5",
              "h-2 w-2 rounded-full",
              "bg-secondary-500",
              "ring-2 ring-background"
            )}
          />
        </button>

        {/* Divider */}

        <div className="mx-1 h-7 w-px bg-border/70" />

        {/* User Profile */}

        <button
          type="button"
          aria-label="Open user menu"
          className={cn(
            "group flex items-center gap-2",
            "rounded-xl p-1.5",
            "transition-all duration-200",
            "hover:bg-white/7",
            "active:scale-[0.98]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary-500/30"
          )}
        >
          {/* Avatar */}

          <div
            className={cn(
              "flex h-9 w-9 shrink-0",
              "items-center justify-center",
              "rounded-full",
              "bg-primary-500",
              "text-xs font-bold",
              "text-primary-foreground",
              "shadow-sm",
              "ring-2 ring-primary-500/10",
              "transition-all duration-200",
              "group-hover:ring-primary-500/20"
            )}
          >
            FM
          </div>

          {/* User Info */}

          <div className="hidden max-w-32 min-w-0 text-left lg:block">
            <p
              className={cn(
                "truncate text-sm font-semibold",
                "text-white/55",
                "transition-colors duration-200",
                "group-hover:text-white/90"
              )}
            >
              Fahim Miah
            </p>

            <p
              className={cn(
                "truncate text-[11px] font-medium",
                "text-white/40",
                "transition-colors duration-200",
                "group-hover:text-white/70"
              )}
            >
              User
            </p>
          </div>

          {/* Chevron */}

          <ChevronDown
            className={cn(
              "hidden h-4 w-4 lg:block",
              "text-white/40",
              "transition-all duration-200",
              "group-hover:text-white/80",
              "group-hover:translate-y-0.5"
            )}
          />
        </button>
      </div>
    </header>
  );
}
