'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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

const NavLinkDesktop = () => {
        const pathname = usePathname();

    return (
        <div className="navbar-center hidden lg:flex">

            <ul className="flex items-center gap-2">

                {navItems.map((item) => {

                    const active = pathname === item.href;

                    return (
                        <li key={item.href}>

                            <Link
                                href={item.href}
                                className={`
                        rounded-xl
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        transition-all
                        duration-300

                        ${active
                                        ? "bg-white/15 backdrop-blur-md shadow-lg text-white"
                                        : "text-white/90 hover:bg-white/10 hover:text-white"
                                    }
                      `}
                            >
                                {item.name}
                            </Link>

                        </li>
                    );

                })}

            </ul>

        </div>
    );
};

export default NavLinkDesktop;