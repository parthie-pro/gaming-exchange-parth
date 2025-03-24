import { FeaturesSection } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="pb-20">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
} 