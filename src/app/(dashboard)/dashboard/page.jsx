import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const API_URL =
    process.env.NEXT_PUBLIC_URL

// ============================================
// GET PETS
// ============================================



// ============================================
// GET ADOPTION REQUESTS
// ============================================

async function getAdoptionRequests() {
    try {
        const response = await fetch(
            `${API_URL}/adoption-requests`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch adoption requests"
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "GET ADOPTION REQUESTS ERROR:",
            error
        );

        return [];
    }
}

// ============================================
// STATUS BADGE
// ============================================

function StatusBadge({ status }) {
    const normalizedStatus =
        String(status || "").toLowerCase();

    if (normalizedStatus === "approved") {
        return (
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Approved
            </span>
        );
    }

    if (normalizedStatus === "rejected") {
        return (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Rejected
            </span>
        );
    }

    if (normalizedStatus === "adopted") {
        return (
            <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Adopted
            </span>
        );
    }

    if (normalizedStatus === "pending") {
        return (
            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                Pending
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            {status || "Unknown"}
        </span>
    );
}

// ============================================
// DASHBOARD PAGE
// ============================================

export default async function DashboardPage() {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const pets = await res1.json();

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL}/adoption-requests`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const adoptionRequests = await res2.json()

    // ========================================
    // PET STATISTICS
    // ========================================

    const totalPets = pets.length;

    const availablePets = pets.filter(
        (pet) =>
            String(
                pet.adoptionStatus
            ).toLowerCase() === "available"
    ).length;

    const pendingPets = pets.filter(
        (pet) =>
            String(
                pet.adoptionStatus
            ).toLowerCase() === "pending"
    ).length;

    const adoptedPets = pets.filter(
        (pet) =>
            String(
                pet.adoptionStatus
            ).toLowerCase() === "adopted"
    ).length;

    // ========================================
    // REQUEST STATISTICS
    // ========================================

    const totalRequests =
        adoptionRequests.length;

    const pendingRequests =
        adoptionRequests.filter(
            (request) =>
                String(
                    request.status
                ).toLowerCase() === "pending"
        ).length;

    const approvedRequests =
        adoptionRequests.filter(
            (request) =>
                String(
                    request.status
                ).toLowerCase() === "approved"
        ).length;

    const rejectedRequests =
        adoptionRequests.filter(
            (request) =>
                String(
                    request.status
                ).toLowerCase() === "rejected"
        ).length;

    // ========================================
    // RECENT REQUESTS
    // ========================================

    const recentRequests =
        [...adoptionRequests]
            .sort(
                (a, b) =>
                    new Date(
                        b.requestDate
                    ) -
                    new Date(
                        a.requestDate
                    )
            )
            .slice(0, 5);

    // ========================================
    // CREATE PET MAP
    // ========================================

    const petMap = new Map(
        pets.map((pet) => [
            String(pet._id),
            pet,
        ])
    );

    return (
        <main className="min-h-screen bg-[#f7faf8] px-4 py-6 md:px-8 lg:px-10">

            <div className="mx-auto max-w-7xl">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="mb-8">
                    <div>
                        <h1 className="font-playfair text-3xl font-bold text-primary-800 md:text-4xl">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 md:text-base">
                            Welcome back to your PawNest
                            dashboard.
                        </p>
                    </div>
                </div>

                {/* =================================
                    STATISTICS
                ================================= */}

                <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* TOTAL PETS */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Pets
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-primary-800">
                                    {totalPets}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1ed] text-2xl">
                                🐾
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            All registered pets
                        </p>
                    </div>

                    {/* AVAILABLE */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Available Pets
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-green-600">
                                    {availablePets}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                ❤️
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Ready for adoption
                        </p>
                    </div>

                    {/* PENDING */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Pending Pets
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                                    {pendingPets}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-2xl">
                                ⏳
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Adoption in progress
                        </p>
                    </div>

                    {/* ADOPTED */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Adopted Pets
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-purple-600">
                                    {adoptedPets}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                                🏠
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Successfully adopted
                        </p>
                    </div>
                </section>

                {/* =================================
                    ADOPTION REQUEST STATISTICS
                ================================= */}

                <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-primary-800">
                                Adoption Requests
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Overview of all adoption
                                requests
                            </p>
                        </div>

                        <Link
                            href="/dashboard/my-request"
                            className="inline-flex w-fit rounded-lg bg-primary-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3D6B57]"
                        >
                            View My Requests
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Total Requests
                            </p>

                            <p className="mt-2 text-2xl font-bold text-primary-800">
                                {totalRequests}
                            </p>
                        </div>

                        <div className="rounded-xl bg-yellow-50 p-5">
                            <p className="text-sm text-yellow-700">
                                Pending
                            </p>

                            <p className="mt-2 text-2xl font-bold text-yellow-700">
                                {pendingRequests}
                            </p>
                        </div>

                        <div className="rounded-xl bg-green-50 p-5">
                            <p className="text-sm text-green-700">
                                Approved
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-700">
                                {approvedRequests}
                            </p>
                        </div>

                        <div className="rounded-xl bg-red-50 p-5">
                            <p className="text-sm text-red-700">
                                Rejected
                            </p>

                            <p className="mt-2 text-2xl font-bold text-red-700">
                                {rejectedRequests}
                            </p>
                        </div>

                    </div>
                </section>

                {/* =================================
                    RECENT REQUESTS
                ================================= */}

                <section className="mt-8 rounded-2xl bg-white shadow-sm">

                    <div className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-primary-800">
                                Recent Adoption Requests
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Latest activity from
                                adopters
                            </p>
                        </div>

                        <Link
                            href="/dashboard/my-request"
                            className="text-sm font-semibold text-primary-500 hover:underline"
                        >
                            View all →
                        </Link>
                    </div>

                    {recentRequests.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-gray-500">
                                No adoption requests
                                found.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-187.5">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                        <th className="px-6 py-4">
                                            Adopter
                                        </th>

                                        <th className="px-6 py-4">
                                            Pet
                                        </th>

                                        <th className="px-6 py-4">
                                            Pickup Date
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentRequests.map(
                                        (request) => {
                                            const pet =
                                                petMap.get(
                                                    String(
                                                        request.petId
                                                    )
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        request._id
                                                    }
                                                    className="border-b last:border-none hover:bg-gray-50"
                                                >
                                                    {/* ADOPTER */}

                                                    <td className="px-6 py-5">
                                                        <div>
                                                            <p className="font-semibold text-primary-800">
                                                                {
                                                                    request.adopterName
                                                                }
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    request.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    {/* PET */}

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">

                                                            {pet?.imageUrl ? (
                                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                                                    <Image
                                                                        src={
                                                                            pet.imageUrl
                                                                        }
                                                                        alt={
                                                                            pet.petName ||
                                                                            "Pet"
                                                                        }
                                                                        fill
                                                                        sizes="48px"
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                                    🐾
                                                                </div>
                                                            )}

                                                            <div>
                                                                <p className="font-medium text-gray-800">
                                                                    {pet?.petName ||
                                                                        "Unknown Pet"}
                                                                </p>

                                                                <p className="text-xs text-gray-500">
                                                                    {pet?.breed ||
                                                                        "Unknown breed"}
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    {/* PICKUP DATE */}

                                                    <td className="px-6 py-5 text-sm text-gray-600">
                                                        {request.pickupDate
                                                            ? new Date(
                                                                request.pickupDate
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )
                                                            : "N/A"}
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-6 py-5">
                                                        <StatusBadge
                                                            status={
                                                                request.status
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <section className="mt-8 grid gap-5 md:grid-cols-3">

                    <Link
                        href="/dashboard/my-listing"
                        className="group rounded-2xl bg-primary-800 p-6 text-white transition hover:-translate-y-1 hover:bg-[#3D6B57]"
                    >
                        <div className="mb-4 text-3xl">
                            🐾
                        </div>

                        <h3 className="text-lg font-bold">
                            My Listings
                        </h3>

                        <p className="mt-2 text-sm text-white/70">
                            Manage your listed pets,
                            edit information or remove
                            a listing.
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold">
                            Manage listings →
                        </span>
                    </Link>

                    <Link
                        href="/dashboard/my-request"
                        className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
                    >
                        <div className="mb-4 text-3xl">
                            📋
                        </div>

                        <h3 className="text-lg font-bold text-primary-800">
                            My Requests
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Check your adoption requests
                            and their current status.
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold text-primary-500">
                            View requests →
                        </span>
                    </Link>

                    <Link
                        href="/all-pet"
                        className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
                    >
                        <div className="mb-4 text-3xl">
                            🔎
                        </div>

                        <h3 className="text-lg font-bold text-primary-800">
                            Find a Pet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Explore available pets
                            looking for a loving home.
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold text-primary-500">
                            Browse pets →
                        </span>
                    </Link>

                </section>

            </div>
        </main>
    );
}