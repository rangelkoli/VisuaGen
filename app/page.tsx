"use client";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSolution from "@/components/ProblemSolution";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className='min-h-screen max-w-screen bg-gray-50 dark:bg-gray-900'>
      <HeroSection />
      <FeaturesSection />
      <ProblemSolution />
      <Footer />
    </div>
  );
}
