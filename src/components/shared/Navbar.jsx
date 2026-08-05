'use client'

import Image from "next/image";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { IoMdCreate } from "react-icons/io";

import logo from "@/assets/Pawnest-logo.png";
import { dmSans } from "@/lib/font";
import { authClient } from "@/lib/auth-client";
import NavLinkMobile from "../utils/NavLinkMobile";
import NavLinkDesktop from "../utils/NavLinkDesktop";
import DropDown from "../utils/DropDown";





export default function Navbar() {

   const { data: session } = authClient.useSession()
     
   const user = session?.user;

    return (
        <header className={`${dmSans.className} sticky top-0 z-50`}>
            <nav className="relative overflow-hidden border-b border-white/10 bg-[#173328]/95 backdrop-blur-2xl">

                {/* Decorative Glow */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]"></div>

                <div className="relative container mx-auto navbar min-h-20 px-4">

                    {/* ================= Logo ================= */}

                    <div className="navbar-start">

                        <NavLinkMobile />
                        {/* Logo */}

                        <Link href="/" className="flex items-center gap-3">

                            <Image
                                src={logo}
                                alt="Pawnest"
                                width={150}
                                height={150}
                                priority
                            /></Link>



                    </div>

                    <NavLinkDesktop />


                    {/* ================= Right ================= */}

                    {
                        session ? (
                            <div className="navbar-end gap-3">

                                {/* Profile */}

                                <div className="hidden md:flex items-center gap-4 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                                    <Image
                                        src={user.image}
                                        alt="profile Image"
                                        width={32}
                                        height={32}
                                        className="rounded-full w-8 h-8"

                                    />
                                    <h2>{user.name}</h2>
                                    <DropDown/>
                                </div>

                                <Link
                                    href="/log-in"
                                    className="btn btn-circle border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 md:hidden"
                                >
                                    <FiLogIn />
                                </Link>

                            </div>
                        ) :
                            (
                                <div className="navbar-end gap-3">

                                    {/* Login */}

                                    <Link
                                        href="/log-in"
                                        className="hidden md:flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                                    >
                                        <FiLogIn size={18} />
                                        Log In
                                    </Link>

                                    <Link
                                        href="/log-in"
                                        className="btn btn-circle border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 md:hidden"
                                    >
                                        <FiLogIn />
                                    </Link>

                                    {/* Register */}

                                    <Link
                                        href="/sign-up"
                                        className="hidden md:flex items-center gap-2 rounded-xl bg-[#C4711A] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8892B]"
                                    >
                                        <IoMdCreate size={18} />
                                        Sign Up
                                    </Link>

                                    <Link
                                        href="/sign-up"
                                        className="btn btn-circle border-none bg-[#C4711A] text-white hover:bg-[#E8892B] md:hidden"
                                    >
                                        <IoMdCreate />
                                    </Link>

                                </div>
                            )
                    }

                </div>

            </nav>
        </header>
    );
}