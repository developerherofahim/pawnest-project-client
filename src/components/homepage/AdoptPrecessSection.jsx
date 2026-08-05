import { dmSans, playFairDisplay } from "@/lib/font";
import {
    Search,
    FileText,
    HeartHandshake,
    House,
} from "lucide-react";

const steps = [
    {
        id: "01",
        icon: Search,
        title: "Browse Pets",
        description:
            "Explore adorable pets by species, breed, age, personality, and location to find the perfect companion.",
    },
    {
        id: "02",
        icon: FileText,
        title: "Submit Request",
        description:
            "Complete a simple adoption request with your basic information and tell us why you'd love to adopt.",
    },
    {
        id: "03",
        icon: HeartHandshake,
        title: "Meet Your Pet",
        description:
            "Connect with the pet owner, arrange a safe meeting, and make sure it's the right match for both of you.",
    },
    {
        id: "04",
        icon: House,
        title: "Bring Home",
        description:
            "Welcome your new furry friend home and begin a lifetime filled with unconditional love and happiness.",
    },
];

export default function AdoptProcessSection() {
    return (
        <section className="bg-[#F2EDE2]">

            <div className="container mx-auto px-5 py-20">

                {/* Heading */}

                <div className="mx-auto mb-15 max-w-3xl text-center">

                    <span className={`${dmSans.className} text-[12px] text-[#C4711A] tracking-widest`}>
                        Adoption Process
                    </span>

                    <h2 className={`${playFairDisplay.className} text-[#1E3A2F] text-4xl font-semibold mt-5`}>
                        Adopt Your Perfect Companion
                    </h2>

                </div>

                {/* Process */}

                <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Connection Line */}

                    {/* <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-[#D7CCBE] xl:block" /> */}

                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className="group relative rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Number */}


                                {/* Icon */}

                                <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#1E3A2F] to-[#3D6B57] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">

                                    <Icon size={30} />

                                </div>

                                {/* Title */}

                                <h3 className={`${playFairDisplay.className} mb-4 text-2xl font-bold text-[#1E3A2F]`}>
                                    {step.title}
                                </h3>

                                {/* Description */}

                                <p className={`${dmSans.className} leading-7 text-[#6B5B47]`}>
                                    {step.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}