'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';

const navItems = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'All Pets',
        href: '/all-pet',
    },
];

const NavLinkMobile = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative lg:hidden">

            {/* Menu Button */}
            <button
                type="button"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:bg-white/10
                    focus:outline-none
                    focus:ring-2
                    focus:ring-white/30
                "
            >
                {isOpen ? (
                    <FiX size={22} />
                ) : (
                    <HiOutlineMenuAlt3 size={24} />
                )}
            </button>


            {/* Mobile Menu */}
            <div
                className={`
                    absolute
                    left-0
                    top-full
                    z-1000
                    mt-4
                    w-64
                    origin-top-left
                    rounded-2xl
                    border
                    border-[#BCA98B]/30
                    bg-white
                    p-3
                    shadow-2xl
                    transition-all
                    duration-200
                    ${
                        isOpen
                            ? 'visible translate-y-0 scale-100 opacity-100'
                            : 'invisible -translate-y-2 scale-95 opacity-0'
                    }
                `}
            >

                <nav aria-label="Mobile navigation">

                    <ul className="flex flex-col gap-1">

                        {navItems.map((item) => {

                            const isActive =
                                pathname === item.href;

                            return (
                                <li key={item.href}>

                                    <Link
                                        href={item.href}
                                        onClick={handleCloseMenu}
                                        aria-current={
                                            isActive
                                                ? 'page'
                                                : undefined
                                        }
                                        className={`
                                            block
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-300
                                            ${
                                                isActive
                                                    ? 'bg-primary-500 text-white'
                                                    : 'text-primary-800 hover:bg-secondary-100'
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </Link>

                                </li>
                            );
                        })}

                    </ul>

                </nav>

            </div>

        </div>
    );
};

export default NavLinkMobile;