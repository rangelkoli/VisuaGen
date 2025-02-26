"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import LandingHeroImage from "@/public/LandingHeroImage.png";
import { supabase } from "@/lib/supabase";
import { FaArrowRight } from "react-icons/fa";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Define the phrases for the typewriter effect
  const headingPhrases = [
    "Transform Your Ideas Into Beautiful Visualizations",
    "Create Stunning Visual Content With AI",
    "Turn Concepts Into Eye-Catching Graphics",
    "Visualize Data In Seconds With AI",
  ];

  // Use the typewriter hook
  const currentHeading = useTypewriter(headingPhrases, 70, 40, 1000);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await supabase.from("waitlist").insert({
        email,
      });
      if (res.error) {
        throw new Error(res.error.message);
      }

      toast.success("Successfully joined the waitlist!");
      setHasJoined(true);
      setEmail("");
    } catch (_error) {
      toast.error("Failed to join waitlist. Please try again." + _error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If loading, you might want to show a loading state

  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full md:w-1/2 space-y-4 text-center md:text-left max-w-xl'
      >
        <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white min-h-[3em] md:min-h-[2.5em]'>
          {currentHeading}
          <span className='animate-pulse'>|</span>
        </h1>

        <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
          Create stunning visual content with AI-powered tools. Perfect for
          presentations, social media, and more.
        </p>

        {hasJoined ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300 mb-8 order-1'
          >
            <h3 className='font-semibold mb-2'>🎉 You&apos;re on the list!</h3>
            <p>
              Thank you for joining our waitlist. We&apos;ll notify you via
              email when VisuaGen launches.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleWaitlistSignup} className='mb-8'>
            <div className='flex flex-col md:flex-row gap-2 max-w-md'>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isSubmitting}
                className='group px-6 py-3 bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2'
              >
                <span>{isSubmitting ? "Joining..." : "Join Waitlist"}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <FaArrowRight className='text-lg group-hover:translate-x-1 transition-transform' />
                </motion.div>
              </motion.button>
            </div>
          </form>
        )}

        {/* <div className='flex flex-col md:flex-row gap-4'>
          <Link
            href='/signup'
            className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Get Started
          </Link>
          <Link
            href='/login'
            className='border border-gray-300 dark:border-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white'
          >
            Learn More
          </Link>
        </div> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full md:w-1/2 mb-8 md:mb-0 bg-transparent justify-center flex order-2 md:order-1'
      >
        <Image
          src={LandingHeroImage}
          alt='AI Visualization'
          className='rounded-lg bg-transparent dark:opacity-90'
        />
      </motion.div>
    </div>
  );
}
