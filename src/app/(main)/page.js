import AdoptProcessSection from "@/components/homepage/AdoptPrecessSection";
import Banner from "@/components/homepage/Banner";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import PetCareTipsSection from "@/components/homepage/PetCareTipsSection";
import SuccessStoriesSection from "@/components/homepage/SuccessStoriesSection";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedSection/>
      <AdoptProcessSection/>
      <SuccessStoriesSection/>
      <PetCareTipsSection/>
    </div>
  );
}
