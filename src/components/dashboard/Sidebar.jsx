
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import pawnestLogo from "../../assets/Pawnest-logo.png";
import { dashboardLinks } from "@/lib/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "relative hidden h-auto shrink-0 flex-col",
        "border-r border-border/60",
        "bg-primary-900/95 backdrop-blur-xl",
        "transition-[width] duration-300 ease-in-out",
        "md:flex",
        open ? "w-64" : "w-19"
      )}
    >
      {/* =========================================================
          HEADER / LOGO
      ========================================================= */}

      <div
        className={cn(
          "flex h-18 shrink-0 items-center border-b border-white/10",
          "transition-all duration-300",
          open
            ? "justify-between px-5"
            : "justify-center px-3"
        )}
      >
        <Link
          href="/dashboard"
          aria-label="Go to dashboard"
          className={cn(
            "flex items-center overflow-hidden",
            "transition-all duration-300",
            open ? "gap-3" : "justify-center"
          )}
        >
          <div
            className={cn(
              "relative flex shrink-0 items-center justify-center",
              "transition-all duration-300",
              open ? "h-25 w-25" : "h-12.5 w-12.5"
            )}
          >
            <Image
              src={pawnestLogo}
              alt="Pawnest"
              width={150}
              height={150}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        {/* Collapse button */}

        {open && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              "text-white/50",
              "transition-all duration-200",
              "hover:bg-white/10 hover:text-white",
              "active:scale-95"
            )}
          >
            <PanelLeftClose className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <nav
        className={cn(
          "flex-1 overflow-y-auto",
          "px-3 py-5",
          "[&::-webkit-scrollbar]:w-1",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-white/10"
        )}
      >
        {/* Section label */}

        {open && (
          <div className="mb-3 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
              Overview
            </span>
          </div>
        )}

        <div className="space-y-1.5">
          {dashboardLinks.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={!open ? item.title : undefined}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex items-center",
                  "rounded-xl text-sm font-medium",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30",

                  open
                    ? "gap-3 px-3 py-2.5"
                    : "justify-center px-2 py-3",

                  isActive
                    ? [
                        "bg-white/10 text-white",
                        "shadow-sm",
                      ]
                    : [
                        "text-white/55",
                        "hover:bg-white/[0.07]",
                        "hover:text-white/90",
                      ]
                )}
              >
                {/* Active indicator */}

                {isActive && (
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2",
                      "h-6 w-1 rounded-r-full",
                    )}
                  />
                )}

                {/* Icon container */}

                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center",
                    "rounded-lg transition-all duration-200",

                    open
                      ? "h-9 w-9"
                      : "h-10 w-10",

                    isActive
                      ? "bg-primary-500 text-secondary-500"
                      : "bg-white/4 text-white/50 group-hover:bg-white/10 group-hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5",
                      "transition-transform duration-200",
                      !isActive && "group-hover:scale-105"
                    )}
                  />
                </span>

                {/* Label */}

                {open && (
                  <span className="min-w-0 flex-1 truncate">
                    {item.title}
                  </span>
                )}

                {/* Active dot */}

                {open && isActive && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500/80" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =========================================================
          BOTTOM AREA
      ========================================================= */}

      <div className="shrink-0 border-t border-white/10 p-3">

        {/* Logout */}

        <button
          type="button"
          title={!open ? "Logout" : undefined}
          className={cn(
            "group flex w-full items-center rounded-xl",
            "text-sm font-medium",
            "text-white/50",
            "transition-all duration-200",
            "hover:bg-destructive/10 hover:text-destructive",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30",

            open
              ? "gap-3 px-3 py-2.5"
              : "justify-center px-2 py-3"
          )}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg",
              "transition-colors duration-200",
              open
                ? "h-9 w-9"
                : "h-10 w-10",
              "group-hover:bg-destructive/10"
            )}
          >
            <LogOut
              className={cn(
                "h-4.5 w-4.5",
                "transition-transform duration-200",
                "group-hover:translate-x-0.5"
              )}
            />
          </span>

          {open && (
            <span className="truncate">
              Logout
            </span>
          )}
        </button>
      </div>

      {/* =========================================================
          EXPAND BUTTON
      ========================================================= */}

      {!open && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Expand sidebar"
          className={cn(
            "absolute -right-3 top-20.5",
            "flex h-7 w-7 items-center justify-center",
            "rounded-full",
            "border border-border/60",
            "bg-background",
            "text-muted-foreground",
            "shadow-md",
            "transition-all duration-200",
            "hover:bg-muted hover:text-foreground",
            "hover:shadow-lg",
            "active:scale-95"
          )}
        >
          <PanelLeftOpen className="h-3.5 w-3.5" />
        </button>
      )}
    </aside>
  );
}