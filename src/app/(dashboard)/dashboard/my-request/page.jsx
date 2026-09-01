import { auth } from "@/lib/auth";
import { playFairDisplay } from "@/lib/font";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "My Request | Pawnest",
  description: "See your Request Activity and track your adoption request progress."
};


const API_URL =
    process.env.NEXT_PUBLIC_URL

async function getMyRequests(userId) {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/adoption-requests`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        cache:"no-store"
    })

    const requests = await res.json();

    // Only requests belonging to current user
    return requests.filter(
        (request) =>
            String(request.userId) ===
            String(userId)
    );
}


async function getPet(petId) {
    try {

        const { token } = await auth.api.getToken({
            headers: await headers()
        })

        const res = await fetch(
            `${API_URL}/pets/${petId}`,
            {
                cache: "no-store",
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(
            "GET PET ERROR:",
            error
        );

        return null;
    }
}

export default async function MyRequestPage() {
    // ==============================
    // Get logged-in user
    // ==============================

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const userId =
        session.user.id ||
        session.user._id;

    if (!userId) {
        redirect("/login");
    }

    // ==============================
    // Get user's adoption requests
    // ==============================

    const requests =
        await getMyRequests(userId);

    // ==============================
    // Get pet information
    // ==============================

    const requestsWithPets =
        await Promise.all(
            requests.map(async (request) => {
                const pet = await getPet(
                    request.petId
                );

                return {
                    ...request,
                    pet,
                };
            })
        );

    return (
        <main className="min-h-screen bg-[#f7faf8] px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* =========================
                    PAGE HEADER
                ========================= */}

                <div className="mb-8">
                    <h1 className={`${playFairDisplay.className} text-3xl font-bold text-primary-800 md:text-4xl`}>
                        My Adoption Requests
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Track and manage your pet
                        adoption requests.
                    </p>
                </div>

                {/* =========================
                    EMPTY STATE
                ========================= */}

                {requestsWithPets.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f1ed] text-3xl">
                            🐾
                        </div>

                        <h2 className="text-xl font-semibold text-primary-800">
                            No adoption requests yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You have not submitted any
                            adoption requests.
                        </p>
                    </div>
                ) : (

                    /* =========================
                       REQUEST TABLE
                    ========================= */

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-225">
                                <thead>
                                    <tr className="border-b bg-primary-800 txt-sm text-white">
                                        <th className="px-6 py-4">
                                            Pet
                                        </th>

                                        <th className="px-6 py-4">
                                            Pickup Date
                                        </th>

                                        <th className="px-6 py-4">
                                            Request Date
                                        </th>

                                        <th className="px-6 py-4">
                                            Message
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {requestsWithPets.map(
                                        (request) => (
                                            <tr
                                                key={
                                                    request._id
                                                }
                                                className="border-b last:border-none hover:bg-gray-50"
                                            >
                                                {/* PET */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">

                                                        {request.pet
                                                            ?.imageUrl ? (
                                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                                                                <Image
                                                                    src={request.pet.imageUrl}
                                                                    alt={request.pet.petName || "Pet"}
                                                                    fill
                                                                    sizes="64px"
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100">
                                                                🐾
                                                            </div>
                                                        )}

                                                        <div>
                                                            <h3 className="font-semibold text-primary-800">
                                                                {request
                                                                    .pet
                                                                    ?.petName ||
                                                                    "Unknown Pet"}
                                                            </h3>

                                                            <p className="text-sm text-gray-500">
                                                                {request
                                                                    .pet
                                                                    ?.breed ||
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

                                                {/* REQUEST DATE */}

                                                <td className="px-6 py-5 text-sm text-gray-600">
                                                    {request.requestDate
                                                        ? new Date(
                                                            request.requestDate
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

                                                {/* MESSAGE */}

                                                <td className="max-w-xs px-6 py-5 text-sm text-gray-600">
                                                    <p className="truncate">
                                                        {request.message ||
                                                            "No message"}
                                                    </p>
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
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

/* =================================
   STATUS BADGE
================================= */

function StatusBadge({ status }) {
    const normalizedStatus =
        String(status || "").toLowerCase();

    if (
        normalizedStatus ===
        "approved"
    ) {
        return (
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Approved
            </span>
        );
    }

    if (
        normalizedStatus ===
        "rejected"
    ) {
        return (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                Rejected
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            Pending
        </span>
    );
}