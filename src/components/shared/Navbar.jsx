'use client';

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

    const { data: session } = authClient.useSession();

    const user = session?.user;

    return (
        <header className={`${dmSans.className} sticky top-0 z-50`}>

            <nav className="relative border-b border-white/10 bg-primary-900/95 backdrop-blur-2xl">

                {/* Decorative Glow */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]
                    "
                />

                {/* ================= Navbar Container ================= */}
                <div
                    className="
                        relative
                        container
                        mx-auto
                        flex
                        min-h-20
                        items-center
                        px-4
                    "
                >

                    {/* ================= START / LEFT ================= */}

                    <div className="flex items-center gap-3">

                        {/* Mobile Navigation */}
                        <NavLinkMobile />


                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <Image
                                src={logo}
                                alt="Pawnest"
                                width={150}
                                height={150}
                                priority
                                className="h-auto w-[120px] sm:w-[135px]"
                            />
                        </Link>

                    </div>


                    {/* ================= CENTER ================= */}

                    <div
                        className="
                            absolute
                            left-1/2
                            hidden
                            -translate-x-1/2
                            md:flex
                            items-center
                        "
                    >
                        <NavLinkDesktop />
                    </div>


                    {/* ================= END / RIGHT ================= */}

                    {session ? (

                        <div className="ml-auto flex items-center gap-2 sm:gap-3">

                            {/* ================= Desktop Profile ================= */}

                            <div
                                className="
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-white/20
                                    bg-white/5
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-white/40
                                    hover:bg-white/10
                                    flex
                                "
                            >

                                {/* Profile Image */}

                                {user?.image ? (

                                    <Image
                                        src={user.image}
                                        alt={`${user.name ?? "User"} profile`}
                                        width={32}
                                        height={32}
                                        className="
                                            h-8
                                            w-8
                                            rounded-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <div
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-secondary-700
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() ?? "U"}
                                    </div>

                                )}


                                {/* User Name */}

                                <div>
                                    <span className="hidden max-w-32 font-medium">
                                        {user?.name?.slice(0, 3)}
                                        {user?.name && user.name.length > 3 ? "..." : ""}
                                    </span>
                                    <span className="hidden md:inline-flex max-w-32 font-medium">
                                        {user?.name}
                                    </span>
                                </div>


                                {/* Dropdown */}

                                <DropDown />

                            </div>


                            {/* ================= Mobile Profile ================= */}



                        </div>

                    ) : (

                        <div className="ml-auto flex items-center gap-2 sm:gap-3">

                            {/* ================= Desktop Login ================= */}

                            <Link
                                href="/log-in"
                                className="
                                    hidden
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-white/20
                                    bg-white/5
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-white/40
                                    hover:bg-white/10
                                    md:flex
                                "
                            >
                                <FiLogIn size={18} />
                                <span>Log In</span>
                            </Link>


                            {/* ================= Mobile Login ================= */}

                            <Link
                                href="/log-in"
                                aria-label="Log in"
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-white/5
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:bg-white/10
                                    md:hidden
                                "
                            >
                                <FiLogIn size={18} />
                            </Link>


                            {/* ================= Desktop Sign Up ================= */}

                            <Link
                                href="/sign-up"
                                className="
                                    hidden
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-secondary-700
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-secondary-500
                                    md:flex
                                "
                            >
                                <IoMdCreate size={18} />
                                <span>Sign Up</span>
                            </Link>


                            {/* ================= Mobile Sign Up ================= */}

                            <Link
                                href="/sign-up"
                                aria-label="Sign up"
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-secondary-700
                                    text-white
                                    shadow-md
                                    transition-all
                                    duration-300
                                    hover:bg-secondary-500
                                    md:hidden
                                "
                            >
                                <IoMdCreate size={18} />
                            </Link>

                        </div>

                    )}

                </div>

            </nav>

        </header>
    );
}