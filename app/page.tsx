"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import toast from "react-hot-toast";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProblemSolution from "@/components/ProblemSolution";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <FeaturesSection />
      <ProblemSolution />
      <Footer />
    </div>
  );
}
