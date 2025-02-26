"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase"; // use supabase from lib
import { UserCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md dark:shadow-gray-800/30"
          : ""
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-bold ${
                isScrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-black dark:text-white"
              } transition-colors duration-200`}
            >
              VisuaGen
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {user ? (
              <>
                <NavLink href='/gallery' isScrolled={isScrolled}>
                  Gallery
                </NavLink>
                <Link href='/generate'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors'
                  >
                    Generate
                  </motion.button>
                </Link>
                <Link href='/profile'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  >
                    <UserCircle className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors'
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </motion.button>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${
                      isScrolled
                        ? "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        : "text-black dark:text-white hover:bg-gray-100/10 dark:hover:bg-gray-800/20"
                    } transition-colors duration-200`}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href='/signup'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors'
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center gap-2'>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            >
              <div className='space-y-2'>
                <span
                  className={`block w-6 h-0.5 ${
                    isScrolled
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-black dark:bg-white"
                  } transition-colors duration-200`}
                />
                <span
                  className={`block w-6 h-0.5 ${
                    isScrolled
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-black dark:bg-white"
                  } transition-colors duration-200`}
                />
                <span
                  className={`block w-6 h-0.5 ${
                    isScrolled
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-black dark:bg-white"
                  } transition-colors duration-200`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
          >
            <div className='flex justify-end p-4'>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-gray-900 dark:text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-col items-center justify-center space-y-4 h-full'>
              <MobileNavLink
                href='/features'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </MobileNavLink>
              <MobileNavLink
                href='/pricing'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </MobileNavLink>
              {user ? (
                <>
                  <MobileNavLink
                    href='/dashboard'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </MobileNavLink>
                  <MobileNavLink
                    href='/generate'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Generate
                  </MobileNavLink>
                  <MobileNavLink
                    href='/profile'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className='flex items-center gap-2'>
                      <UserCircle className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                      <span>Profile</span>
                    </div>
                  </MobileNavLink>
                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className='text-left px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors'
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors'
                  >
                    Login
                  </Link>
                  <Link
                    href='/signup'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors'
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

const NavLink = ({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) => (
  <Link href={href}>
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`cursor-pointer ${
        isScrolled
          ? "text-gray-900 dark:text-white"
          : "text-black dark:text-white"
      } hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}
    >
      {children}
    </motion.span>
  </Link>
);

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className='px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors w-full text-center'
  >
    {children}
  </Link>
);

export default Navbar;
