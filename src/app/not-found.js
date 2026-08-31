import Link from "next/link";
import {
  ArrowRight,
  Home,
  PawPrint,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-900 px-4 py-16 sm:px-6">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      {/* Top Right Glow */}
      <div className="absolute -right-40 -top-40 h-105 w-105 rounded-full bg-secondary-500/10 blur-[100px]" />

      {/* Bottom Left Glow */}
      <div className="absolute -bottom-40 -left-40 h-105 w-105 rounded-full bg-primary-500/20 blur-[100px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px]" />

      {/* =========================================================
          DECORATIVE PAW PRINTS
      ========================================================= */}

      <PawPrint
        className="absolute left-[8%] top-[18%] h-8 w-8 rotate-[-25deg] text-white/4"
      />

      <PawPrint
        className="absolute left-[15%] bottom-[18%] h-12 w-12 rotate-20 text-secondary-500/6"
      />

      <PawPrint
        className="absolute right-[12%] top-[22%] h-10 w-10 rotate-25 text-white/4"
      />

      <PawPrint
        className="absolute right-[8%] bottom-[16%] h-7 w-7 rotate-[-20deg] text-secondary-500/6"
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="relative z-10 w-full max-w-2xl">

        {/* Glass Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 px-6 py-10 shadow-2xl backdrop-blur-2xl sm:px-12 sm:py-14">

          {/* Card Top Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* Decorative Circle */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full border border-secondary-500/10" />

          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full border border-secondary-500/10" />

          {/* =====================================================
              ICON
          ===================================================== */}

          <div className="mb-8 flex justify-center">
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-secondary-500/25 blur-2xl" />

              {/* Icon Box */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.07] shadow-xl backdrop-blur-xl">

                <PawPrint className="h-11 w-11 text-secondary-500" />

                {/* Ring */}
                <div className="absolute -inset-2 rounded-[2.3rem] border border-secondary-500/20" />

                {/* Small Dot */}
                <span className="absolute right-1 top-2 h-2.5 w-2.5 rounded-full bg-secondary-500 shadow-lg shadow-secondary-500/40" />
              </div>
            </div>
          </div>

          {/* =====================================================
              404 NUMBER
          ===================================================== */}

          <div className="relative text-center">

            <p className="select-none font-display text-[7rem] font-bold leading-none tracking-[-0.06em] text-white/[0.07] sm:text-[9rem]">
              404
            </p>

            {/* Heading */}
            <h1 className="relative -mt-8 font-display text-3xl font-bold tracking-tight text-white sm:-mt-10 sm:text-4xl">
              This page got lost.
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
              Looks like this page wandered away from Pawnest.
              Dont worry — lets help you find your way back home
              and continue your journey to find a perfect companion.
            </p>
          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* Home Button */}
            <Link
              href="/"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary-700 px-6 text-sm font-semibold text-white shadow-lg shadow-secondary-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-500 hover:shadow-xl hover:shadow-secondary-900/30 active:scale-[0.97] sm:w-auto"
            >
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

              <span>Back to Home</span>

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Browse Pets */}
            <Link
              href="/all-pet"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.97] sm:w-auto"
            >
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

              <span>Explore Pets</span>
            </Link>
          </div>

          {/* =====================================================
              DIVIDER
          ===================================================== */}

          <div className="mx-auto mt-10 h-px max-w-xs bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* =====================================================
              BRAND MESSAGE
          ===================================================== */}

          <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-sm font-medium text-white/40">
              <PawPrint className="h-4 w-4 text-secondary-500/70" />

              <span>Pawnest</span>
            </div>

            <p className="text-xs text-white/25">
              Rescue a Heart, Find a Best Friend
            </p>
          </div>

        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-xs text-white/20">
          Error 404 • Page not found
        </p>

      </section>
    </main>
  );
}