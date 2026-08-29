
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    Cake,
    CheckCircle2,
    Heart,
    MapPin,
    PawPrint,
    ShieldCheck,
    Weight,
} from "lucide-react";

import { GoDotFill } from "react-icons/go";
import { dmSans, playFairDisplay } from "@/lib/font";
import { Surface, Form, Fieldset, Description, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { FloppyDisk } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import AdoptionCard from "@/components/utils/AdoptionCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PetDetailsPage = async ({ params }) => {

    const { id } = await params;

      const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res1 = await fetch(`${process.env.NEXT_PUBLIC_URL}/adoption-requests`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const requests = await res1.json();

  

    const res2 = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    console.log(token)

    const pet = await res2.json();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!pet) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="text-center">
                    <PawPrint className="mx-auto mb-4 text-primary-800" size={48} />

                    <h2
                        className={`${playFairDisplay.className} text-3xl font-bold text-neutral-900`}
                    >
                        Pet Not Found
                    </h2>

                    <p className="mt-2 text-neutral-500">
                        The pet you are looking for could not be found.
                    </p>

                    <Link
                        href="/all-pet"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Pets
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50">

            {/* Breadcrumb / Back Button */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <Link
                    href="/all-pet"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-800 transition hover:text-secondary-700"
                >
                    <ArrowLeft size={18} />
                    Back to All Pets
                </Link>
            </section>

            {/* Main Details */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-8">

                    {/* ================= IMAGE SECTION ================= */}
                    <div className="relative">

                        <div className="group relative h-105 overflow-hidden rounded-3xl bg-neutral-200 shadow-xl sm:h-130 lg:h-150">

                            <Image
                                src={pet.imageUrl}
                                alt={pet.petName}
                                fill
                                priority
                                className="object-cover transition duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 55vw"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/50 to-transparent" />

                            {/* Available Badge */}
                            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-primary-800 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                                <GoDotFill className="text-green-300" />
                                {pet.adoptionStatus}
                            </span>

                            {/* Favorite */}
                            <button
                                type="button"
                                aria-label="Add to favorites"
                                className="absolute right-5 top-5 rounded-full bg-white/90 p-3 text-neutral-700 shadow-lg backdrop-blur transition hover:bg-red-500 hover:text-white"
                            >
                                <Heart size={22} />
                            </button>

                            {/* Pet Name */}
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-white/80">
                                    Meet your new best friend
                                </p>

                                <h1
                                    className={`${playFairDisplay.className} text-4xl font-bold sm:text-5xl`}
                                >
                                    {pet.petName}
                                </h1>
                            </div>
                        </div>

                        {/* ================= DETAILS SECTION ================= */}

                        <div className="flex flex-col mt-8">

                            {/* Heading */}
                            <div className="border-b border-neutral-200 pb-6">

                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <p className="mb-2 font-medium text-primary-800">
                                            {pet.species || "Pet"}
                                        </p>

                                        <h2
                                            className={`${playFairDisplay.className} text-4xl font-bold text-neutral-900 sm:text-5xl`}
                                        >
                                            {pet.petName}
                                        </h2>

                                        <div className="mt-3 flex flex-wrap items-center gap-2 text-earth-500">
                                            <span>{pet.breed}</span>

                                            <GoDotFill size={10} />

                                            <span>{pet.age.value} {pet.age.unit}</span>

                                            <GoDotFill size={10} />

                                            <span>{pet.gender}</span>
                                        </div>
                                    </div>

                                    <div className="shrink-0 text-right">
                                        <p className="text-sm text-neutral-500">
                                            Adoption Fee
                                        </p>

                                        <p className="text-3xl font-bold text-secondary-700">
                                            ${pet.adoptionFee}
                                        </p>
                                    </div>

                                </div>

                                {/* Location */}
                                <div className="mt-5 flex items-center gap-2 text-neutral-500">
                                    <MapPin
                                        size={19}
                                        className="text-primary-800"
                                    />

                                    <span>{pet.location}</span>
                                </div>

                            </div>


                            {/* About */}
                            <div className="py-6">

                                <h3
                                    className={`${playFairDisplay.className} text-2xl font-bold text-neutral-900`}
                                >
                                    About {pet.petName}
                                </h3>

                                <p className="mt-3 leading-7 text-neutral-600">
                                    {pet.description ||
                                        `${pet.petName} is a wonderful ${pet.species || "pet"} looking for a loving forever home. This adorable companion is ready to become a special part of your family.`}
                                </p>

                            </div>


                            {/* Quick Information */}
                            <div>

                                <h3
                                    className={`${playFairDisplay.className} mb-4 text-2xl font-bold text-neutral-900`}
                                >
                                    Quick Information
                                </h3>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                                    <InfoItem
                                        icon={<PawPrint size={19} />}
                                        label="Species"
                                        value={pet.species || "Pet"}
                                    />

                                    <InfoItem
                                        icon={<Cake size={19} />}
                                        label="Age"
                                        value={`${pet.age?.value} ${pet.age?.unit}`}
                                    />

                                    <InfoItem
                                        icon={<Weight size={19} />}
                                        label="Weight"
                                        value={`${pet.weight?.value} ${pet.weight?.unit}`}
                                    />

                                    <InfoItem
                                        icon={<PawPrint size={19} />}
                                        label="Gender"
                                        value={pet.gender}
                                    />

                                    <InfoItem
                                        icon={<ShieldCheck size={19} />}
                                        label="Health"
                                        value={pet.healthStatus || "Healthy"}
                                    />

                                    <InfoItem
                                        icon={<CheckCircle2 size={19} />}
                                        label="Vaccinated"
                                        value={pet.vaccinationStatus || "Yes"}
                                    />

                                </div>

                            </div>


                            {/* Personality */}
                            {pet.personality?.length > 0 && (
                                <div className="mt-6">

                                    <h3
                                        className={`${playFairDisplay.className} mb-4 text-2xl font-bold text-neutral-900`}
                                    >
                                        Personality
                                    </h3>

                                    <div className="flex flex-wrap gap-2">

                                        {pet.personality.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full bg-[#c4711a1a] px-4 py-2 text-sm font-medium text-secondary-700"
                                            >
                                                {item}
                                            </span>
                                        ))}

                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                    {/*================= Adoption Card=============== */}
                    {
                        pet.ownerEmail === user?.email
                            ? (<section className="h-105 flex items-center justify-center rounded-3xl bg-neutral-200 shadow-xl sm:h-130 lg:h-150">
                                <div className="text-center">
                                    <PawPrint className="mx-auto mb-4 text-primary-800" size={48} />

                                    <h2
                                        className={`${playFairDisplay.className} text-3xl font-bold text-neutral-900`}
                                    >
                                        You Cant Adopt {pet.petName}
                                    </h2>

                                    <p className="mt-2 text-neutral-500">
                                        You cant adopt a pet you have listed yourself.
                                    </p>

                                    <Link
                                        href="/all-pet"
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Explore Another Pets
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </section>)
                            : (<AdoptionCard pet={pet} requests={requests} />)
                    }
                </div>

            </section>

        </main>
    );
}


/* =========================================================
   Reusable Information Item
========================================================= */

function InfoItem({ icon, label, value }) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-primary-800/20 hover:shadow-md">

            <div className="mb-2 flex items-center gap-2 text-primary-800">
                {icon}

                <span className="text-xs font-medium text-neutral-500">
                    {label}
                </span>
            </div>

            <p className="truncate text-sm font-semibold text-neutral-900">
                {value || "Not specified"}
            </p>

        </div>
    );
}

export default PetDetailsPage;
