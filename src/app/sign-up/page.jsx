

import SignUpForm from "@/components/auth/SignUpForm";
import { dmSans } from "@/lib/font";

export default function SignUpPage() {
    return (
        <section
            className={`${dmSans.className} min-h-screen bg-[#F7F2E8]`}
        >
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* ================= LEFT ================= */}

                <div
                    style={{
                        backgroundImage: "url('/pet adoption.jpg')",
                    }}
                    className="relative hidden  bg-cover bg-center bg-no-repeat overflow-hidden lg:flex">

                    {/* Background */}

                    <div className="absolute inset-0 bg-linear-to-br from-[#173328] via-[#1E3A2F] to-[#3D6B57] opacity-85" />

                    {/* Decorative Blur */}

                    <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-[#C4711A]/20 blur-3xl" />

                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    {/* Content */}

                    <div className="relative z-10 flex w-full flex-col justify-end gap-8 p-16">

                        {/* Logo */}


                        {/* Hero */}

                        <div className="max-w-xl">

                            <span className="rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur">
                                Join the PawNest Family
                            </span>

                            <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
                                Open Your Heart to a New Best Friend.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-white/75">
                                Create your PawNest account to explore adorable pets, save your favorites,
                                submit adoption requests, and help give every furry companion the forever
                                home they have been waiting for.
                            </p>

                        </div>

                        {/* Bottom */}

                        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">

                            <p className="text-lg italic text-white">
                               	&quot; A home filled with love has room for four paws. Your journey toward a
                                lifelong friendship begins today. &quot;
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= RIGHT ================= */}

                <div className="flex items-center justify-center p-6 md:p-10">

                    <SignUpForm />

                </div>

            </div>
        </section>
    );
}