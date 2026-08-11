
import bannerImage from '../../assets/pet-hero.png'
import React from 'react';
import Image from 'next/image';
import { dmSans, playFairDisplay } from '@/lib/font';
import HeroImageSection from '../utils/HeroImageSection';
import { FaArrowRight, FaPaw } from 'react-icons/fa';
import Link from 'next/link';

const Banner = () => {

    const stats = [
        {
            value: "1200+",
            title: "Pets Rescued",
            icon: "🐾",
        },
        {
            value: "840+",
            title: "Happy Families",
            icon: "❤️",
        },
        {
            value: "98%",
            title: "Success Rate",
            icon: "⭐",
        },
        {
            value: "25+",
            title: "Verified Shelters",
            icon: "📍",
        },
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{
                backgroundImage: "url('/hero-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-28">

                <div className="flex flex-col-reverse items-center gap-14 lg:flex-row lg:gap-8">

                    {/* LEFT */}
                    <div className="flex-1 text-center lg:text-left">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs sm:text-sm font-medium text-orange-200">
                            🐾 Trusted by 840+ Happy Families
                        </div>

                        {/* Heading */}
                        <h1
                            className={`${playFairDisplay.className}
          mt-6
          text-4xl
          leading-tight
          font-bold
          text-white
          sm:text-5xl
          md:text-6xl
          xl:text-7xl`}
                        >
                            Rescue A Heart,
                            <br />
                            <span className="italic text-secondary-500">
                                Find Your Forever Friend
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className={`${dmSans.className}
          mx-auto
          mt-6
          max-w-xl
          text-base
          leading-7
          text-white/90
          sm:text-lg
          lg:mx-0`}
                        >
                            Discover loving pets waiting for a second chance.
                            Browse verified adoption listings, connect with trusted shelters,
                            and welcome a loyal companion into your home.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row lg:mt-10">

                            {/* Primary Button */}
                            <button
                                className="
      group relative flex w-full items-center justify-center
      overflow-hidden rounded-2xl

      bg-linear-to-r
      from-secondary-700
      via-secondary-600
      to-secondary-500

      px-5 py-3
      sm:px-6 sm:py-3.5
      lg:px-8 lg:py-4

      text-sm
      sm:text-base
      lg:text-lg

      font-semibold
      text-white

      shadow-button
      transition-all
      duration-500

      hover:-translate-y-1
      hover:button-hover
      active:scale-95
    "
                            >
                                {/* Shine */}
                                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                <span className="relative flex items-center gap-2 sm:gap-3">
                                    <FaPaw className="text-base sm:text-lg lg:text-xl transition-transform group-hover:rotate-12" />

                                    <span>Adopt Now</span>

                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>

                            {/* Secondary Button */}
                            <Link
                            href="/all-pet"
                                className="
      group flex w-full items-center justify-center cursor-pointer

      rounded-2xl
      border border-white/40

      bg-white/10
      backdrop-blur-md

      px-5 py-3
      sm:px-6 sm:py-3.5
      lg:px-8 lg:py-4

      text-sm
      sm:text-base
      lg:text-lg

      font-semibold
      text-white

      transition-all
      duration-500

      hover:-translate-y-1
      hover:border-secondary-500
      hover:bg-white
      hover:text-primary-800
      hover:shadow-xl

      active:scale-95
    "
                            >
                                <span className="flex items-center gap-2 sm:gap-3">
                                    Browse Pets

                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                        </div>
                        {/* Features */}
                        <div className="mt-10 grid grid-cols-1 gap-4 text-white sm:grid-cols-2 lg:grid-cols-3">

                            <div className="flex items-center justify-center gap-2 lg:justify-start">
                                ✅ <span>Verified Shelters</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 lg:justify-start">
                                ❤️ <span>Safe Adoption</span>
                            </div>

                            <div className="flex items-center justify-center gap-2 lg:justify-start">
                                🐾 <span>Lifetime Companion</span>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-1 w-full justify-center">

                        <div className="w-full max-w-[320px] sm:max-w-105 md:max-w-130 lg:max-w-162.5">
                            <HeroImageSection />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Banner;