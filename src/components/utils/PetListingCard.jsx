import Image from "next/image";
import Link from "next/link";

import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { playFairDisplay } from "@/lib/font";
import RequestModal from "./RequestModal";
import { getAdoptionRequest } from "@/lib/action";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PetListingCard = async ({ pet }) => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/adoption-requests`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const request = await res.json();

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {/* IMAGE */}

            <div className="relative h-65 overflow-hidden">

                <Image
                    src={pet.imageUrl}
                    alt={pet.petName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-primary-800 px-3 py-1 text-sm font-semibold text-white shadow">
                    {pet.adoptionStatus}
                </span>

            </div>

            {/* CONTENT */}

            <div className="flex flex-1 flex-col space-y-5 p-6">

                {/* NAME + PRICE */}

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <h3
                            className={`${playFairDisplay.className} truncate text-2xl font-bold text-neutral-900`}
                        >
                            {pet.petName}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                            {pet.breed}
                        </p>

                    </div>

                    <span className="shrink-0 text-2xl font-bold text-secondary-700">
                        ${pet.adoptionFee}
                    </span>

                </div>

                {/* REQUESTS */}

                <RequestModal
                    petId={pet._id}
                    request={request}
                />

                {/* VIEW + EDIT */}

                <div className=" w-full grid grid-cols-2 gap-3">

                    <Link
                        href={`/all-pet/${pet._id}`}
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary-800 py-3 font-semibold text-primary-800 transition hover:bg-neutral-100"
                    >
                        <Eye size={17} />
                        View
                    </Link>

                    <EditModal pet={pet} />

                </div>

                {/* DELETE */}

                <DeleteModal pet={pet} />

            </div>
        </article>
    );
};

export default PetListingCard;