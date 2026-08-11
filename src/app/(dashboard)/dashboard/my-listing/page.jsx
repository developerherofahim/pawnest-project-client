"use client";

import Image from "next/image";
import Link from "next/link";
import { dmSans, playFairDisplay } from "@/lib/font";

import {
    Eye,
    Pencil,
    Trash2,
    MessageSquare,
    PawPrint,
    CheckCircle2,
    HeartHandshake,
    LayoutList,
    Plus,
    MapPin,
} from "lucide-react";

const MyListings = ({ pets = [], onRequests, onDelete }) => {
    // =========================================================
    // Stats
    // =========================================================

    const totalListings = pets.length;

    const availablePets = pets.filter(
        (pet) => pet.status?.toLowerCase() === "available"
    ).length;

    const adoptedPets = pets.filter(
        (pet) => pet.status?.toLowerCase() === "adopted"
    ).length;


    return (
        <section
            className={`min-h-screen w-full bg-neutral-50 ${dmSans.className}`}
        >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-800">
                            <PawPrint size={17} />
                            <span>Pet Management</span>
                        </div>

                        <h1
                            className={`${playFairDisplay.className} text-3xl font-bold text-neutral-900 sm:text-4xl`}
                        >
                            My Listings
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                            Manage your pets, review adoption requests, and
                            keep your listings up to date.
                        </p>
                    </div>


                    {/* Add Pet */}
                    <Link
                        href="/dashboard/add-pet"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-800 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                    >
                        <Plus size={18} />
                        Add New Pet
                    </Link>

                </div>


                {/* =====================================================
                    Stats
                ====================================================== */}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Total */}
                    <StatCard
                        title="Total Listings"
                        value={totalListings}
                        icon={<LayoutList size={22} />}
                        iconClass="bg-primary-100 text-primary-800"
                        description="All your pet listings"
                    />

                    {/* Available */}
                    <StatCard
                        title="Available"
                        value={availablePets}
                        icon={<CheckCircle2 size={22} />}
                        iconClass="bg-green-100 text-green-700"
                        description="Currently available"
                    />

                    {/* Adopted */}
                    <StatCard
                        title="Adopted"
                        value={adoptedPets}
                        icon={<HeartHandshake size={22} />}
                        iconClass="bg-orange-100 text-orange-700"
                        description="Successfully adopted"
                    />

                </div>


                {/* =====================================================
                    Section Heading
                ====================================================== */}

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-neutral-900">
                            Your Pets
                        </h2>

                        <p className="mt-1 text-sm text-neutral-500">
                            {totalListings}{" "}
                            {totalListings === 1 ? "listing" : "listings"}{" "}
                            found
                        </p>
                    </div>

                </div>


                {/* =====================================================
                    Empty State
                ====================================================== */}

                {pets.length === 0 ? (
                    <EmptyState />
                ) : (

                    /* =====================================================
                        Listings Grid
                    ====================================================== */

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {pets.map((pet) => (

                            <PetListingCard
                                key={pet._id || pet.id}
                                pet={pet}
                                onRequests={onRequests}
                                onDelete={onDelete}
                            />

                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};


/* =============================================================
   Stat Card
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
   Pet Listing Card
============================================================= */

function PetListingCard({
    pet,
    onRequests,
    onDelete,
}) {
    const petId = pet._id || pet.id;

    const isAvailable =
        pet.status?.toLowerCase() === "available";

    const statusText = isAvailable
        ? "Available"
        : "Adopted";

    return (
        <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* =================================================
                Image
            ================================================== */}

            <div className="relative h-56 overflow-hidden bg-neutral-100">

                {pet.image ? (
                    <Image
                        src={pet.image}
                        alt={pet.name || "Pet"}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-neutral-300">
                        <PawPrint size={45} />
                    </div>
                )}


                {/* Image Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent" />


                {/* Status */}
                <div className="absolute left-4 top-4">

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur ${
                            isAvailable
                                ? "bg-green-100/95 text-green-700"
                                : "bg-orange-100/95 text-orange-700"
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${
                                isAvailable
                                    ? "bg-green-600"
                                    : "bg-orange-600"
                            }`}
                        />

                        {statusText}
                    </span>

                </div>


                {/* Requests Count */}
                {pet.requestCount > 0 && (
                    <div className="absolute right-4 top-4">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur">
                            <MessageSquare size={14} />
                            {pet.requestCount}
                        </span>

                    </div>
                )}

            </div>


            {/* =================================================
                Content
            ================================================== */}

            <div className="p-5">

                {/* Name + Price */}
                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <h3
                            className={`${playFairDisplay.className} truncate text-2xl font-bold text-neutral-900`}
                        >
                            {pet.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-500">

                            {pet.breed && (
                                <span>{pet.breed}</span>
                            )}

                            {pet.location && (
                                <>
                                    <span className="text-neutral-300">
                                        •
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MapPin size={13} />
                                        {pet.location}
                                    </span>
                                </>
                            )}

                        </div>

                    </div>


                    {/* Price */}
                    <div className="shrink-0 text-right">

                        <p className="text-xs text-neutral-400">
                            Adoption Fee
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-secondary-700">
                            {pet.price
                                ? `৳${Number(pet.price).toLocaleString()}`
                                : "Free"}
                        </p>

                    </div>

                </div>


                {/* Divider */}
                <div className="my-5 h-px bg-neutral-100" />


                {/* =================================================
                    Actions
                ================================================== */}

                <div className="grid grid-cols-2 gap-2.5">

                    {/* Requests */}
                    <button
                        type="button"
                        onClick={() => onRequests?.(pet)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary-50 px-3 text-sm font-semibold text-primary-800 transition hover:bg-primary-100"
                    >
                        <MessageSquare size={16} />
                        Requests
                    </button>


                    {/* Edit */}
                    <Link
                        href={`/dashboard/my-listings/edit/${petId}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>


                    {/* View */}
                    <Link
                        href={`/all-pet/${petId}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 transition hover:border-primary-800 hover:bg-neutral-50 hover:text-primary-800"
                    >
                        <Eye size={16} />
                        View
                    </Link>


                    {/* Delete */}
                    <button
                        type="button"
                        onClick={() => onDelete?.(pet)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>

                </div>

            </div>

        </article>
    );
}


/* =============================================================
   Empty State
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
                You have not added any pets yet. Create your first listing and
                help a loving pet find their forever home.
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

