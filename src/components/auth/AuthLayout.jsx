"use client";

import Image from "next/image";
import Link from "next/link";

import { dmSans } from "@/lib/font";
import LoginForm from "./LogInForm";

export default function AuthLayout() {
  return (
    <section
      className={`${dmSans.className} min-h-screen bg-secondary-100`}
    >
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT ================= */}

        <div
          style={{
            backgroundImage: "url('/dog 2.jpg')",
          }}
          className="relative hidden  bg-cover bg-center bg-no-repeat overflow-hidden lg:flex">

          {/* Background */}

          <div className="absolute inset-0 bg-linear-to-br from- via-primary-800 to-primary-500 opacity-85" />

          {/* Decorative Blur */}

          <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-secondary-700/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}

          <div className="relative z-10 flex w-full flex-col justify-end gap-8 p-16">

            {/* Logo */}


            {/* Hero */}

            <div className="max-w-xl">

              <span className="rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur">
                Welcome Back
              </span>

              <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
                Continue Your Journey To Find A Forever Friend.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/75">
                Log in to manage adoption requests, save your favourite pets,
                and connect with loving pet owners across Bangladesh.
              </p>

            </div>

            {/* Bottom */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">

              <p className="text-lg italic text-white">
                &quot;Every rescued pet deserves a loving home.
                Together, we make happy tails possible.&quot;
              </p>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center justify-center p-6 md:p-10">

          <LoginForm />

        </div>

      </div>
    </section>
  );
}