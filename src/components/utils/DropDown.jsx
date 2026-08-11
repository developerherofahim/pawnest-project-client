"use client";

import { authClient } from "@/lib/auth-client";
import { ChevronDown } from "@gravity-ui/icons";
import { Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const dropDownItems = [
    {
        id: "dashboard",
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        id: "logout",
        name: "Log Out",
        action: "logout",
    },
];

export default function DropDown() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            return toast.error(error.message);
        }

        toast.success("Logged out successfully");

        router.push("/");
        router.refresh();
    };

    return (
        <Dropdown placement="bottom-end">
            <Button
                isIconOnly
                aria-label="Profile Menu"
                className="h-5 w-5 rounded-full border border-emerald-500/20 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-emerald-50"
            >
                <ChevronDown className="text-emerald-700" />
            </Button>

            <Dropdown.Popover className="m-4 min-w-56 rounded-2xl border border-emerald-100 bg-primary-900 p-2 shadow-2xl backdrop-blur-xl">
                <Dropdown.Menu aria-label="Profile Actions">
                    {dropDownItems.map((item) => {
                        const active = item.href && pathname === item.href;

                        return (
                            <Dropdown.Item
                                key={item.id}
                                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${active
                                        ? "bg-white/15 text-white"
                                        : "text-white/90 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {item.action === "logout" ? (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full cursor-pointer text-left font-medium text-red-400"
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block w-full font-medium text-white"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}