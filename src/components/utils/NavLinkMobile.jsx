'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const navItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "All Pets",
        href: "/all-pet",
    },
];

const NavLinkMobile = () => {
    const pathname = usePathname();
    return (
            <div className="dropdown dropdown-bottom z-1000 lg:hidden">

                <label
                    tabIndex={0}
                    className="btn btn-circle btn-ghost border border-white/10 text-white hover:bg-white/10"
                >
                    <HiOutlineMenuAlt3 size={24} />
                </label>

                <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-4 w-64 rounded-2xl border border-[#BCA98B]/30 bg-white p-3 shadow-2xl"
                >
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`rounded-xl px-4 py-3 transition-all duration-300

                      ${pathname === item.href
                                        ? "bg-[#3D6B57] text-white"
                                        : "text-[#1E3A2F] hover:bg-[#F7F2E8]"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
    );
};

export default NavLinkMobile;