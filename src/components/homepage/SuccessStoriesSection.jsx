import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { dmSans, playFairDisplay } from "@/lib/font";

const stories = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
    petName: "Bella",
    breed: "Golden Retriever",
    adopter: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    review:
      "Adopting Bella through PawNest was one of the best decisions we've ever made. The process was simple, transparent, and filled with support. She has brought endless happiness to our family.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800",
    petName: "Max",
    breed: "Labrador Retriever",
    adopter: "Nafis Rahman",
    location: "Chattogram, Bangladesh",
    review:
      "I was searching for a loyal companion, and PawNest made it possible. Max settled into our home from day one. Every day feels brighter with him around.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    petName: "Luna",
    breed: "British Shorthair",
    adopter: "Tanisha Karim",
    location: "Sylhet, Bangladesh",
    review:
      "Everything from browsing pets to meeting Luna was effortless. PawNest helped us find a loving companion who truly completed our family.",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-white py-24">

      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className={`${dmSans.className} text-[12px] text-[#C4711A] tracking-widest`}>
            Happy Tails
          </span>

          <h2 className={`${playFairDisplay.className} text-4xl font-semibold text-[#1E3A2F] mt-5`}>
            Success Stories from Our Community
          </h2>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">

          {stories.map((story) => (
            <article
              key={story.id}
              className="group overflow-hidden rounded-3xl border border-[#E7DFD2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex-1"
            >
              {/* Image */}

              <div className="relative h-72 overflow-hidden">

                <Image
                  src={story.image}
                  alt={story.petName}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-5 top-5 rounded-full bg-white p-3 shadow-lg">
                  <Quote
                    size={22}
                    className="text-[#C4711A]"
                  />
                </div>

              </div>

              {/* Content */}

              <div className="space-y-6 p-8">

                {/* Rating */}

                <div className="flex gap-1">

                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-[#C4711A] text-[#C4711A]"
                    />
                  ))}

                </div>

                {/* Review */}

                <p className="leading-8 text-[#6B5B47] line-clamp-4">
                  {story.review}
                </p>

                {/* Divider */}

                <div className="border-t border-[#ECE5DA]" />

                {/* Footer */}

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="font-bold text-[#1E3A2F]">
                      {story.adopter}
                    </h4>

                    <p className="text-sm text-[#8B7355]">
                      {story.location}
                    </p>

                  </div>

                  <div className="text-right">

                    <h5 className="font-semibold text-[#1E3A2F]">
                      {story.petName}
                    </h5>

                    <p className="text-sm text-[#8B7355]">
                      {story.breed}
                    </p>

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}