"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Modal } from "@heroui/react";
import {
    CalendarDays,
    Check,
    Mail,
    PawPrint,
    X,
} from "lucide-react";
import React, { useState } from "react";

const API_URL = "http://localhost:8000";

const getToken = async () => {
    const { data, error } = await authClient.token();

    if (error) {
        console.error("Token error:", error);
        return null;
    }

    return data?.token;
};

const RequestModal = ({ petId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    // =========================
    // GET REQUESTS FOR PET
    // =========================

    const handleOpen = async () => {
        try {
            setLoading(true);

            const token = getToken()

            const response = await fetch(
                `${API_URL}/adoption-requests/pet/${petId}`,{
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch adoption requests"
                );
            }

            setRequests(data);
        } catch (error) {
            console.error(
                "Request fetch error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // APPROVE
    // =========================

    const handleApprove = async (requestId) => {
        try {
            setProcessingId(requestId);

            const token = await getToken();

            console.log(
                "Approving Request ID:",
                requestId
            );

            const response = await fetch(
                `${API_URL}/adoption-requests/${requestId}/approve`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to approve request"
                );
            }

            // Update UI immediately
            setRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request._id === requestId
                        ? {
                            ...request,
                            status: "Approved",
                        }
                        : request
                )
            );

            console.log(
                "Approve success:",
                data
            );
        } catch (error) {
            console.error(
                "Approve error:",
                error
            );
        } finally {
            setProcessingId(null);
        }
    };

    // =========================
    // REJECT
    // =========================

    const handleReject = async (requestId) => {
        try {
            setProcessingId(requestId);

            const token = getToken()

            console.log(
                "Rejecting Request ID:",
                requestId
            );

            const response = await fetch(
                `${API_URL}/adoption-requests/${requestId}/reject`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to reject request"
                );
            }

            // Update UI immediately
            setRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request._id === requestId
                        ? {
                            ...request,
                            status: "Rejected",
                        }
                        : request
                )
            );

            console.log(
                "Reject success:",
                data
            );
        } catch (error) {
            console.error(
                "Reject error:",
                error
            );
        } finally {
            setProcessingId(null);
        }
    };

    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {
        if (!date) {
            return "Not specified";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =========================
    // STATUS CLASS
    // =========================

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "border-green-200 bg-green-50 text-green-600";

            case "rejected":
                return "border-red-200 bg-red-50 text-red-600";

            default:
                return "border-amber-200 bg-amber-50 text-amber-600";
        }
    };

    return (
        <Modal>
            {/* OPEN MODAL */}

            <Button
                onPress={handleOpen}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-800 py-6 font-semibold text-secondary-100 transition hover:bg-emerald-700"
            >
                <PawPrint size={17} />
                Requests
            </Button>

            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-full sm:max-w-2xl">
                        <Modal.CloseTrigger />

                        {/* HEADER */}

                        <Modal.Header>
                            <Modal.Icon className="bg-primary-100 text-primary-800">
                                <PawPrint className="size-5" />
                            </Modal.Icon>

                            <div>
                                <Modal.Heading className="text-xl font-bold text-primary-800">
                                    Adoption Requests
                                </Modal.Heading>

                                <p className="mt-1 text-sm text-default-500">
                                    Review requests for
                                    this pet
                                </p>
                            </div>
                        </Modal.Header>

                        {/* BODY */}

                        <Modal.Body>
                            {loading ? (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-default-500">
                                        Loading
                                        requests...
                                    </p>
                                </div>
                            ) : requests.length ===
                                0 ? (
                                <div className="rounded-2xl border border-dashed border-default-300 py-12 text-center">
                                    <PawPrint
                                        size={40}
                                        className="mx-auto mb-3 text-default-400"
                                    />

                                    <h3 className="font-semibold text-default-700">
                                        No Adoption
                                        Requests
                                    </h3>

                                    <p className="mt-1 text-sm text-default-500">
                                        No one has
                                        requested to
                                        adopt this pet
                                        yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {requests.map(
                                        (request) => {
                                            const isPending =
                                                request.status?.toLowerCase() ===
                                                "pending";

                                            const isProcessing =
                                                processingId ===
                                                request._id;

                                            return (
                                                <div
                                                    key={
                                                        request._id
                                                    }
                                                    className="rounded-2xl border border-default-200 bg-secondary-50 p-5"
                                                >
                                                    {/* DEBUG */}

                                                    <p className="mb-3 text-xs text-default-400">
                                                        Request
                                                        ID:{" "}
                                                        {
                                                            request._id
                                                        }
                                                    </p>

                                                    {/* USER */}

                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                                                                Requested
                                                                User
                                                            </p>

                                                            <h3 className="mt-1 text-lg font-bold text-primary-900">
                                                                {
                                                                    request.adopterName
                                                                }
                                                            </h3>

                                                            <div className="mt-2 flex items-center gap-2 text-sm text-default-600">
                                                                <Mail
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="text-primary-800"
                                                                />

                                                                <span className="break-all">
                                                                    {
                                                                        request.email
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* STATUS */}

                                                        <span
                                                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                                request.status
                                                            )}`}
                                                        >
                                                            {
                                                                request.status
                                                            }
                                                        </span>
                                                    </div>

                                                    {/* PICKUP DATE */}

                                                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-default-200 bg-white p-3">
                                                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary-100">
                                                            <CalendarDays
                                                                size={
                                                                    17
                                                                }
                                                                className="text-primary-800"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-default-500">
                                                                Preferred
                                                                Pickup
                                                                Date
                                                            </p>

                                                            <p className="text-sm font-semibold text-default-800">
                                                                {formatDate(
                                                                    request.pickupDate
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* MESSAGE */}

                                                    {request.message && (
                                                        <div className="mt-4">
                                                            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                                                                Message
                                                            </p>

                                                            <p className="mt-1 text-sm leading-6 text-default-600">
                                                                {
                                                                    request.message
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* ACTION BUTTONS */}

                                                    {isPending && (
                                                        <div className="mt-5 flex gap-3 border-t border-default-200 pt-4">
                                                            {/* APPROVE */}

                                                            <Button
                                                                isDisabled={
                                                                    isProcessing
                                                                }
                                                                onPress={() =>
                                                                    handleApprove(
                                                                        request._id
                                                                    )
                                                                }
                                                                className="flex-1 rounded-xl bg-primary-800 font-semibold text-secondary-100 transition hover:bg-emerald-700"
                                                            >
                                                                <Check
                                                                    size={
                                                                        17
                                                                    }
                                                                />

                                                                {isProcessing
                                                                    ? "Processing..."
                                                                    : "Approve"}
                                                            </Button>

                                                            {/* REJECT */}

                                                            <Button
                                                                isDisabled={
                                                                    isProcessing
                                                                }
                                                                onPress={() =>
                                                                    handleReject(
                                                                        request._id
                                                                    )
                                                                }
                                                                className="flex-1 rounded-xl border border-red-200 bg-transparent font-semibold text-red-500 transition hover:bg-danger-50"
                                                            >
                                                                <X
                                                                    size={
                                                                        17
                                                                    }
                                                                />

                                                                {isProcessing
                                                                    ? "Processing..."
                                                                    : "Reject"}
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default RequestModal;