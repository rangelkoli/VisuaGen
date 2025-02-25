"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Add your waitlist signup API call here
      // For now, we'll just simulate a success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Added to waitlist! We'll notify you soon.");
      setEmail("");
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-8 py-8 md:py-16'>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full md:w-1/2 space-y-4 text-center md:text-left'
      >
        <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
          Transform Your Ideas Into Beautiful Visualizations
        </h1>
        <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
          Create stunning visual content with AI-powered tools. Perfect for
          presentations, social media, and more.
        </p>

        {/* Waitlist Form */}
        <form onSubmit={handleWaitlistSignup} className='mb-8'>
          <div className='flex flex-col md:flex-row gap-2 max-w-md'>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={isSubmitting}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </motion.button>
          </div>
        </form>

        <div className='flex flex-col md:flex-row gap-4'>
          <Link
            href='/signup'
            className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Get Started
          </Link>
          <Link
            href='/login'
            className='border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full md:w-1/2 mb-8 md:mb-0'
      >
        <Image
          src='/hero-image.png'
          alt='AI Visualization'
          width={600}
          height={400}
          className='rounded-lg shadow-2xl'
        />
      </motion.div>
    </div>
  );
}
