import Link from "next/link";
import { dmSans, playFairDisplay } from "@/lib/font";

import {
    PawPrint,
    CheckCircle2,
    HeartHandshake,
    LayoutList,
    Plus,
} from "lucide-react";

import { getAllPets } from "@/lib/action";
import PetListingCard from "@/components/utils/PetListingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyListings = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const pets = await res.json();

    const userPets = pets.filter(
        (pet) => pet.ownerEmail === user?.email
    );

    // =========================
    // STATS
    // =========================

    const totalListings = userPets.length;

    const availablePets = userPets.filter(
        (pet) =>
            pet.adoptionStatus?.toLowerCase() ===
            "available"
    ).length;

    const adoptedPets = userPets.filter(
        (pet) =>
            pet.adoptionStatus?.toLowerCase() ===
            "adopted"
    ).length;

    return (
        <section
            className={`min-h-screen w-full bg-secondary-100 ${dmSans.className}`}
        >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* HEADER */}

                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-800">
                            <PawPrint size={17} />
                            <span>
                                Pet Management
                            </span>
                        </div>

                        <h1
                            className={`${playFairDisplay.className} text-3xl font-bold text-neutral-900 sm:text-4xl`}
                        >
                            My Listings
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Manage your pets, review
                            adoption requests, and
                            keep your listings up to
                            date.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/add-pet"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-800 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                    >
                        <Plus size={18} />
                        Add New Pet
                    </Link>
                </div>

                {/* STATS */}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <StatCard
                        title="Total Listings"
                        value={totalListings}
                        icon={
                            <LayoutList size={22} />
                        }
                        iconClass="bg-primary-100 text-primary-800"
                        description="All your pet listings"
                    />

                    <StatCard
                        title="Available"
                        value={availablePets}
                        icon={
                            <CheckCircle2
                                size={22}
                            />
                        }
                        iconClass="bg-green-100 text-green-700"
                        description="Currently available"
                    />

                    <StatCard
                        title="Adopted"
                        value={adoptedPets}
                        icon={
                            <HeartHandshake
                                size={22}
                            />
                        }
                        iconClass="bg-orange-100 text-orange-700"
                        description="Successfully adopted"
                    />
                </div>

                {/* SECTION HEADING */}

                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-neutral-900">
                            Your Pets
                        </h2>

                        <p className="mt-1 text-sm text-neutral-500">
                            {totalListings}{" "}
                            {totalListings === 1
                                ? "listing"
                                : "listings"}{" "}
                            found
                        </p>
                    </div>
                </div>

                {/* LISTINGS */}

                {userPets.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {userPets.map(
                            (pet) => (
                                <PetListingCard
                                    key={
                                        pet._id ||
                                        pet.id
                                    }
                                    pet={pet}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};


/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
    title,
    value,
    icon,
    iconClass,
    description,
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-neutral-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                        {description}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}


/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState() {
    return (
        <div className="flex min-h-90 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-800">
                <PawPrint size={30} />
            </div>

            <h3
                className={`${playFairDisplay.className} mt-5 text-2xl font-bold text-neutral-900`}
            >
                No Listings Yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                You have not added any pets yet.
                Create your first listing and
                help a loving pet find their
                forever home.
            </p>

            <Link
                href="/dashboard/add-pet"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary-800 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
                <Plus size={18} />
                Add Your First Pet
            </Link>
        </div>
    );
}

export default MyListings;