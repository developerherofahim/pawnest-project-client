import Image from "next/image";
import Link from "next/link";

import {
    Heart,
    MapPin,
    PawPrint,
    Cake,
    Weight,
    ShieldCheck,
} from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { playFairDisplay } from "@/lib/font";

export default function PetCard({pet}) {

    

    return (
        <article className="group overflow-hidden h-full rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {/* Image */}
            <div className="relative h-65 overflow-hidden">

                <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Favorite */}
                <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 backdrop-blur transition hover:bg-red-500 hover:text-white">
                    <Heart size={20} />
                </button>

                {/* Status */}
                <span className="absolute left-4 top-4 rounded-full bg-[#1e3a2f] px-3 py-1 text-sm font-semibold text-white shadow">
                    Available
                </span>
            </div>

            {/* Content */}
            <div className="space-y-3 p-6">

                {/* Heading */}
                <div className={`text-[#1e3a2f] flex items-start justify-between`}>
                    <div>
                        <h3 className={`${playFairDisplay.className} text-2xl font-bold text-neutral-900`}>
                            {pet.name}
                        </h3>

                        <p className="text-[#8B7355] flex items-center justify-center gap-2">
                            <span>{pet.breed}</span>
                            <span className="text-xs"><GoDotFill /></span>
                            <span>{pet.age}</span>
                            <span className="text-xs"><GoDotFill /></span>
                            <span>{pet.weight}</span>
                        </p>
                    </div>

                    <span className="text-2xl font-bold text-[#C4711A]">
                        {pet.price}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin size={18} />
                    <span>{pet.location}</span>
                </div>

                {/* Quick Info */}
               

                {/* Personality */}

                <div className="flex flex-wrap gap-2">

                    {pet.personality.map((item) => (
                        <span
                            key={item}
                            className="rounded-full bg-[#c4711a1a] px-3 py-1 text-sm font-medium text-[#c4711a]"
                        >
                            {item}
                        </span>
                    ))}

                </div>

                {/* Vaccinated */}

                {/* Buttons */}

                <div className="flex gap-3 pt-2">

                    <Link
                        href={`/pets/${pet._id}`}
                        className="flex-1 rounded-xl border-2 border-[#1e3a2f] text-[##1e3a2f] py-3 text-center font-semibold transition hover:bg-neutral-100"
                    >
                        View Details
                    </Link>

                    <button className="flex-1 rounded-xl bg-[#1e3a2f] py-3 font-semibold text-[#f7f2e8] transition hover:bg-emerald-700">
                        Adopt Now →
                    </button>

                </div>

            </div>
        </article>
    );
}