import Image from "next/image";
import bannerImage from "../../assets/pet-hero.png";

const HeroImageSection = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">

      {/* Main Glow */}
      <div className="absolute bg-radial from-[#FFEFD8]/60 via-[#FFEFD8]/20 to-transparent blur-3xl" />

      {/* Outer Ring */}
      <div
        className="
        absolute
        h-70 w-70
        rounded-full
        border
        border-[#F4D8AE]
        shadow-[0_0_20px_rgba(244,216,174,.40)]
        sm:h-[420px]
        sm:w-[420px]
        lg:h-[560px]
        lg:w-[560px]
        rotate-ring
        ring-glow
      "
      />

      {/* Middle Ring */}
      <div
        className="
        absolute
        h-55 w-55
        rounded-full
        border
        border-dashed
        border-[#E7CCA3]
        shadow-[0_0_20px_rgba(231,204,163,.45)]
        sm:h-[340px]
        sm:w-[340px]
        lg:h-[450px]
        lg:w-[450px]
        rotate-ring
        ring-glow
      "
      />

      {/* Inner Ring */}
      <div
        className="
        absolute
        h-[170px] w-[170px]
        rounded-full
        border
        border-[#F5E7D4]
        shadow-[0_0_20px_rgba(245,231,212,.7)]
        sm:h-[260px]
        sm:w-[260px]
        lg:h-[340px]
        lg:w-[340px]
        rotate-ring
        ring-glow
      "
      />

      {/* Floating Shadow */}
      <div className="absolute bottom-14 h-8 w-44 rounded-full bg-black/10 blur-2xl sm:w-60 lg:bottom-20 lg:h-10 lg:w-80" />

      {/* Pet */}
      <Image
        src={bannerImage}
        alt="Pet Adoption"
        priority
        className="
          relative
          rounded-full
          z-20
          select-none
          drop-shadow-[0_35px_60px_rgba(0,0,0,.18)]
        "
      />

      {/* Paw */}
      <div className="absolute left-6 top-10 hidden text-4xl text-[#E8D2B4] opacity-60 lg:block">
        🐾
      </div>

      <div className="absolute right-8 bottom-20 hidden text-4xl text-[#E8D2B4] opacity-60 lg:block">
        🐾
      </div>
    </div>
  );
};

export default HeroImageSection;