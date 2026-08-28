"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Modal } from "@heroui/react";
import { PawPrint, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { dmSans } from "@/lib/font";
import { authClient } from "@/lib/auth-client";

/* =========================================================
   API
========================================================= */

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";



/* =========================================================
   DELETE MODAL
========================================================= */

const DeleteModal = ({ pet }) => {
    const router = useRouter();

    const [isDeleting, setIsDeleting] =
        useState(false);

    if (!pet?._id) {
        return null;
    }

    const getToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error("Token error:", error);
            return null;
        }

        return data?.token;
    };

    /* =====================================================
       DELETE HANDLER
    ===================================================== */

    const handleDelete = async () => {
        if (isDeleting) {
            return;
        }

        try {
            setIsDeleting(true);

            const token = await getToken();

            const response = await fetch(
                `${API_URL}/pets/${pet._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        authorization: `Bearer ${token}`
                    },
                }
            );

            /* =============================================
               SAFE RESPONSE PARSING
            ============================================= */

            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";

            let result = {};

            if (
                contentType.includes(
                    "application/json"
                )
            ) {
                result = await response.json();
            } else {
                const text =
                    await response.text();

                result = {
                    message:
                        text ||
                        "Server returned an unexpected response.",
                };
            }

            /* =============================================
               ERROR
            ============================================= */

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    result?.error ||
                    `Failed to delete pet. Server returned ${response.status}.`
                );
            }

            /* =============================================
               SUCCESS
            ============================================= */

            toast.success(
                `"${pet.petName || "Pet"}" deleted successfully!`
            );

            /*
             * Refresh the current Next.js page.
             */
            router.refresh();

        } catch (error) {
            console.error(
                "Delete pet error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete pet. Please try again."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    /* =====================================================
       UI
    ===================================================== */

    return (
        <Modal className={dmSans.className}>

            {/* =================================================
                DELETE BUTTON
            ================================================= */}

            <Modal.Trigger>
                <Button
                    type="button"
                    variant="bordered"
                    className="
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border-2
                        border-danger
                        bg-white
                        px-5
                        font-semibold
                        text-danger
                        transition-colors
                        hover:bg-danger-50
                    "
                >
                    <Trash2 size={17} />

                    <span>
                        Delete
                    </span>
                </Button>
            </Modal.Trigger>

            {/* =================================================
                MODAL
            ================================================= */}

            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog
                        className="
                            w-full
                            sm:max-w-md
                        "
                    >

                        <Modal.CloseTrigger />

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <Modal.Header>
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-danger-100
                                        text-danger
                                    "
                                >
                                    <Trash2
                                        size={20}
                                    />
                                </div>

                                <div>
                                    <Modal.Heading
                                        className="
                                            text-xl
                                            font-bold
                                            text-primary-800
                                        "
                                    >
                                        Delete Pet
                                    </Modal.Heading>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-default-500
                                        "
                                    >
                                        Remove this pet
                                        from your listing.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        {/* =================================================
                            BODY
                        ================================================= */}

                        <Modal.Body>
                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-danger-200
                                    bg-danger-50
                                    p-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        gap-3
                                    "
                                >
                                    <PawPrint
                                        className="
                                            mt-0.5
                                            size-5
                                            shrink-0
                                            text-danger
                                        "
                                    />

                                    <div>
                                        <p
                                            className="
                                                font-semibold
                                                text-danger-800
                                            "
                                        >
                                            Are you sure?
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                leading-6
                                                text-danger-700
                                            "
                                        >
                                            You are about
                                            to permanently
                                            delete{" "}

                                            <strong>
                                                {pet.petName ||
                                                    "this pet"}
                                            </strong>

                                            . This action
                                            cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <Modal.Footer
                            className="
                                border-t
                                border-default-200
                                px-6
                                py-4
                            "
                        >

                            {/* CANCEL */}

                            <Button
                                type="button"
                                variant="bordered"
                                isDisabled={
                                    isDeleting
                                }
                                className="
                                    h-11
                                    flex-1
                                    rounded-xl
                                    font-semibold
                                "
                                onPress={() => {
                                    /*
                                     * HeroUI's modal closes
                                     * through its close trigger.
                                     *
                                     * We don't need any
                                     * additional state here.
                                     */
                                }}
                            >
                                Cancel
                            </Button>

                            {/* DELETE */}

                            <Button
                                type="button"
                                color="danger"
                                isDisabled={
                                    isDeleting
                                }
                                onPress={
                                    handleDelete
                                }
                                className="
                                    h-11
                                    flex-1
                                    rounded-xl
                                    font-semibold
                                "
                            >
                                <Trash2 size={17} />

                                <span>
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete Pet"}
                                </span>
                            </Button>

                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteModal;