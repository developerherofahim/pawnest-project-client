
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, PanelLeftOpen, X } from "lucide-react";

import pawnestLogo from "../../assets/Pawnest-logo.png";
import { dashboardLinks } from "@/lib/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function MobileSidebar() {
  const pathname = usePathname();
  const { open, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <>
      {/* =========================================================
          BACKDROP
      ========================================================= */}

      <div
        aria-hidden={!open}
        onClick={closeSidebar}
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          "bg-black/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}

      <aside
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col",
          "border-r border-border/60",
          "bg-primary-900/95 backdrop-blur-xl",
          "shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          "md:hidden",
          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div
          className={cn(
            "flex h-18 shrink-0 items-center",
            "justify-between",
            "border-b border-border/60",
            "px-4"
          )}
        >
          {/* Logo */}

          <Link
            href="/dashboard"
            onClick={closeSidebar}
            aria-label="Go to dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={pawnestLogo}
                alt="Pawnest"
                width={44}
                height={44}
                priority
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Close button */}

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center",
              "rounded-xl",
              "text-muted-foreground",
              "transition-all duration-200",
              "hover:bg-muted hover:text-foreground",
              "active:scale-95",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-primary-500/30"
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =======================================================
            NAVIGATION
        ======================================================= */}

        <nav
          className={cn(
            "flex-1 overflow-y-auto",
            "px-3 py-5",
            "[&::-webkit-scrollbar]:w-1",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-muted"
          )}
        >
          {/* Section label */}

          <div className="mb-3 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Overview
            </span>
          </div>

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
                  onClick={closeSidebar}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center",
                    "gap-3 rounded-xl",
                    "px-3 py-3",
                    "text-sm font-medium",
                    "transition-all duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary-500/30",

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
                        "absolute left-0 top-1/2",
                        "-translate-y-1/2",
                        "h-7 w-1 rounded-r-full",
                        "bg-secondary-500"
                      )}
                    />
                  )}

                  {/* Icon */}

                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0",
                      "items-center justify-center",
                      "rounded-lg",
                      "transition-all duration-200",

                      isActive
                        ? "bg-primary-500 text-secondary-500"
                        : "bg-white/4 text-white/50 group-hover:bg-white/10 group-hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4.5 w-4.5",
                        "transition-transform duration-200",
                        !isActive &&
                        "group-hover:scale-105"
                      )}
                    />
                  </span>

                  {/* Label */}

                  <span className="min-w-0 flex-1 truncate">
                    {item.title}
                  </span>

                  {/* Active indicator dot */}

                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* =======================================================
            FOOTER
        ======================================================= */}

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
    </>
  );
}
