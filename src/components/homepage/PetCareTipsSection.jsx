import Image from "next/image";
import {
    ArrowRight,
    Clock3,
    HeartPulse,
    Utensils,
    Dumbbell,
    Brush,
} from "lucide-react";
import { dmSans, playFairDisplay } from "@/lib/font";

const tips = [
  {
    id: 1,
    title: "Build a Healthy Feeding Routine",
    category: "Nutrition",
    readTime: "5 min read",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
    description:
      "Learn how balanced meals, proper portions, and fresh water keep your furry companion healthy and energetic every day.",
  },
  {
    id: 2,
    title: "Keep Vaccinations Up to Date",
    category: "Health",
    readTime: "4 min read",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&q=80",
    description:
      "Regular vaccinations and health checkups protect pets from preventable diseases and ensure a longer, happier life.",
  },
  {
    id: 3,
    title: "Daily Exercise for Happy Pets",
    category: "Lifestyle",
    readTime: "6 min read",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&q=80",
    description:
      "Simple playtime and outdoor activities strengthen your bond while keeping pets physically and mentally active.",
  },
  {
    id: 4,
    title: "Regular Grooming Keeps Pets Comfortable",
    category: "Grooming",
    readTime: "5 min read",
    icon: Brush,
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80",
    description:
      "Brushing, bathing, nail trimming, and coat care help maintain your pet's hygiene, comfort, and overall well-being.",
  },
];

export default function PetCareTipsSection() {
    return (
        <section className="bg-[#F7F2E8] py-24">

            <div className="container mx-auto px-4">

                {/* Header */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className={`${dmSans.className} text-[12px] text-[#C4711A] tracking-widest`}>
                        Pet Care Guide
                    </span>

                    <h2 className={`${playFairDisplay.className} text-4xl font-semibold text-[#1E3A2F] mt-5`}>
                        Helpful Tips for Happy & Healthy Pets
                    </h2>

                </div>

                {/* Grid */}

                <div className="grid gap-8 lg:grid-cols-12">

                    {/* Featured */}

                    <article className="group overflow-hidden rounded-3xl bg-white shadow-md lg:col-span-7">

                        <div className="relative h-80 overflow-hidden">

                            <Image
                                src={tips[0].image}
                                alt={tips[0].title}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />

                        </div>

                        <div className="space-y-5 p-8">

                            <div className="flex items-center justify-between">

                                <span className="rounded-full bg-[#C4711A]/10 px-3 py-1 text-sm font-semibold text-[#C4711A]">
                                    {tips[0].category}
                                </span>

                                <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                                    <Clock3 size={16} />
                                    {tips[0].readTime}
                                </div>

                            </div>

                            <h3 className="text-3xl font-bold text-[#1E3A2F]">
                                {tips[0].title}
                            </h3>

                            <p className="leading-8 text-[#6B5B47]">
                                {tips[0].description}
                            </p>

                            <button className="inline-flex items-center gap-2 font-semibold text-[#1E3A2F] transition hover:text-[#C4711A]">
                                Read Article
                                <ArrowRight size={18} />
                            </button>

                        </div>

                    </article>

                    {/* Side Cards */}

                    <div className="flex flex-col justify-between gap-8 lg:gap-0 lg:col-span-5">

                        {tips.slice(1).map((tip) => {
                            const Icon = tip.icon;

                            return (
                                <article
                                    key={tip.id}
                                    className="group flex gap-5 rounded-3xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl">

                                        <Image
                                            src={tip.image}
                                            alt={tip.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />

                                    </div>

                                    <div className="flex flex-col justify-between">

                                        <div>

                                            <div className="mb-3 flex items-center gap-2">

                                                <div className="rounded-xl bg-[#1E3A2F]/10 p-2 text-[#1E3A2F]">
                                                    <Icon size={18} />
                                                </div>

                                                <span className="text-sm font-semibold text-[#C4711A]">
                                                    {tip.category}
                                                </span>

                                            </div>

                                            <h3 className="text-xl font-bold text-[#1E3A2F]">
                                                {tip.title}
                                            </h3>

                                        </div>

                                        <div className="mt-4 flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm text-[#8B7355]">
                                                <Clock3 size={15} />
                                                {tip.readTime}
                                            </div>

                                            <button className="inline-flex items-center gap-2 font-medium text-[#1E3A2F] transition hover:text-[#C4711A]">
                                                Read
                                                <ArrowRight size={16} />
                                            </button>

                                        </div>

                                    </div>

                                </article>
                            );
                        })}

                    </div>

                </div>

            </div>

        </section>
    );
}