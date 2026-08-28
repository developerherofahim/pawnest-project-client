'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

const NavLinkDesktop = () => {
    const pathname = usePathname();

    return (
        <nav aria-label="Desktop navigation">
            <ul className="flex items-center gap-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`
                                    inline-flex
                                    items-center
                                    rounded-xl
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-300
                                    ease-out
                                    ${
                                        isActive
                                            ? 'bg-white/15 text-white shadow-lg backdrop-blur-md'
                                            : 'text-white/90 hover:bg-white/10 hover:text-white'
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
    );
};

export default NavLinkDesktop;