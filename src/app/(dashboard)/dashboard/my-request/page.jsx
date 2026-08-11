"use client";

import Link from "next/link";
import { dmSans, playFairDisplay } from "@/lib/font";
import {
    CalendarDays,
    Eye,
    PawPrint,
    Clock3,
    CheckCircle2,
    XCircle,
    Trash2,
} from "lucide-react";
import Image from "next/image";

const MyRequests = ({ requests = [], onCancel }) => {
    return (
        <section
            className={`min-h-screen w-full bg-neutral-50 ${dmSans.className}`}
        >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* =====================================================
                    Header
                ====================================================== */}

                <div className="mb-8">

                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-800">
                        <PawPrint size={17} />
                        <span>Adoption Dashboard</span>
                    </div>

                    <h1
                        className={`${playFairDisplay.className} text-3xl font-bold text-neutral-900 sm:text-4xl`}
                    >
                        My Requests
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                        Track your adoption requests and stay updated on their
                        current status.
                    </p>

                </div>


                {/* =====================================================
                    Request Count
                ====================================================== */}

                <div className="mb-6 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                            <Clock3 size={20} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-neutral-900">
                                Adoption Requests
                            </p>

                            <p className="text-xs text-neutral-500">
                                {requests.length}{" "}
                                {requests.length === 1
                                    ? "request"
                                    : "requests"}{" "}
                                submitted
                            </p>
                        </div>

                    </div>

                </div>


                {/* =====================================================
                    Empty State
                ====================================================== */}

                {requests.length === 0 ? (
                    <EmptyState />
                ) : (

                    <>
                        {/* =================================================
                            Desktop Table
                        ================================================== */}

                        <div className="hidden overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm md:block">

                            <div className="overflow-x-auto">

                                <table className="w-full border-collapse">

                                    <thead>
                                        <tr className="border-b border-neutral-200 bg-neutral-50">

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Pet Name
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Request Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Pickup Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>


                                    <tbody>

                                        {requests.map((request) => (

                                            <RequestRow
                                                key={request._id || request.id}
                                                request={request}
                                                onCancel={onCancel}
                                            />

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* =================================================
                            Mobile Cards
                        ================================================== */}

                        <div className="space-y-4 md:hidden">

                            {requests.map((request) => (

                                <RequestCard
                                    key={request._id || request.id}
                                    request={request}
                                    onCancel={onCancel}
                                />

                            ))}

                        </div>
                    </>
                )}

            </div>
        </section>
    );
};


/* =============================================================
   Desktop Request Row
============================================================= */

function RequestRow({ request, onCancel }) {

    const requestId = request._id || request.id;

    const petId =
        request.petId ||
        request.pet?._id ||
        request.pet?.id;

    return (
        <tr className="border-b border-neutral-100 last:border-none transition hover:bg-neutral-50/70">

            {/* Pet Name */}
            <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-50 text-primary-800">

                        {request.pet?.image ? (
                            <Image
                                src={request.pet.image}
                                alt={request.pet?.name || "Pet"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <PawPrint size={19} />
                        )}

                    </div>

                    <div>
                        <p className="font-semibold text-neutral-900">
                            {request.pet?.name ||
                                request.petName ||
                                "Unknown Pet"}
                        </p>

                        {request.pet?.breed && (
                            <p className="mt-0.5 text-xs text-neutral-500">
                                {request.pet.breed}
                            </p>
                        )}
                    </div>

                </div>

            </td>


            {/* Request Date */}
            <td className="px-6 py-5">

                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <CalendarDays
                        size={16}
                        className="text-neutral-400"
                    />

                    {formatDate(request.requestDate || request.createdAt)}
                </div>

            </td>


            {/* Pickup Date */}
            <td className="px-6 py-5">

                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <CalendarDays
                        size={16}
                        className="text-neutral-400"
                    />

                    {formatDate(request.pickupDate)}
                </div>

            </td>


            {/* Status */}
            <td className="px-6 py-5">
                <StatusBadge status={request.status} />
            </td>


            {/* Actions */}
            <td className="px-6 py-5">

                <div className="flex justify-end gap-2">

                    {/* View */}
                    <Link
                        href={`/all-pet/${petId}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 transition hover:border-primary-800 hover:text-primary-800"
                    >
                        <Eye size={15} />
                        View
                    </Link>


                    {/* Cancel */}
                    {request.status?.toLowerCase() === "pending" && (
                        <button
                            type="button"
                            onClick={() => onCancel?.(request)}
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            <Trash2 size={15} />
                            Cancel
                        </button>
                    )}

                </div>

            </td>

        </tr>
    );
}


/* =============================================================
   Mobile Request Card
============================================================= */

function RequestCard({ request, onCancel }) {

    const petId =
        request.petId ||
        request.pet?._id ||
        request.pet?.id;

    return (
        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">

            {/* Pet */}
            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-50 text-primary-800">

                    {request.pet?.image ? (
                        <Image
                            src={request.pet.image}
                            alt={request.pet?.name || "Pet"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <PawPrint size={22} />
                    )}

                </div>

                <div className="min-w-0 flex-1">

                    <h3 className="truncate font-bold text-neutral-900">
                        {request.pet?.name ||
                            request.petName ||
                            "Unknown Pet"}
                    </h3>

                    {request.pet?.breed && (
                        <p className="mt-0.5 text-xs text-neutral-500">
                            {request.pet.breed}
                        </p>
                    )}

                </div>

                <StatusBadge status={request.status} />

            </div>


            {/* Dates */}
            <div className="mt-5 grid grid-cols-2 gap-3">

                <DateBox
                    label="Request Date"
                    date={request.requestDate || request.createdAt}
                />

                <DateBox
                    label="Pickup Date"
                    date={request.pickupDate}
                />

            </div>


            {/* Actions */}
            <div className="mt-5 flex gap-2">

                <Link
                    href={`/all-pet/${petId}`}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 transition hover:border-primary-800 hover:text-primary-800"
                >
                    <Eye size={16} />
                    View Pet
                </Link>


                {request.status?.toLowerCase() === "pending" && (
                    <button
                        type="button"
                        onClick={() => onCancel?.(request)}
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        <Trash2 size={16} />
                        Cancel
                    </button>
                )}

            </div>

        </article>
    );
}


/* =============================================================
   Status Badge
============================================================= */

function StatusBadge({ status }) {

    const normalizedStatus =
        status?.toLowerCase() || "pending";

    const config = {
        pending: {
            label: "Pending",
            icon: <Clock3 size={14} />,
            className: "bg-amber-50 text-amber-700 ring-amber-200",
        },

        approved: {
            label: "Approved",
            icon: <CheckCircle2 size={14} />,
            className: "bg-green-50 text-green-700 ring-green-200",
        },

        rejected: {
            label: "Rejected",
            icon: <XCircle size={14} />,
            className: "bg-red-50 text-red-700 ring-red-200",
        },
    };

    const current = config[normalizedStatus] || config.pending;

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${current.className}`}
        >
            {current.icon}
            {current.label}
        </span>
    );
}


/* =============================================================
   Date Box
============================================================= */

function DateBox({ label, date }) {

    return (
        <div className="rounded-xl bg-neutral-50 p-3">

            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                {label}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-neutral-700">
                <CalendarDays
                    size={14}
                    className="text-primary-800"
                />

                {formatDate(date)}
            </div>

        </div>
    );
}


/* =============================================================
   Empty State
============================================================= */

function EmptyState() {

    return (
        <div className="flex min-h-95 flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-800">
                <PawPrint size={30} />
            </div>

            <h2
                className={`${playFairDisplay.className} mt-5 text-2xl font-bold text-neutral-900`}
            >
                No Adoption Requests
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                You have not submitted any adoption requests yet. Find a pet
                that feels like the right match and start your adoption
                journey.
            </p>

            <Link
                href="/all-pet"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary-800 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
                <PawPrint size={17} />
                Browse Pets
            </Link>

        </div>
    );
}


/* =============================================================
   Date Formatter
============================================================= */

function formatDate(date) {

    if (!date) {
        return "Not selected";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}


export default MyRequests;

