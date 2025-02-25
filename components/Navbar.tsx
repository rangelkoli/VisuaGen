"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase"; // use supabase from lib

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-900 dark:text-white" : "text-white"
              }`}
            >
              VisuaGen
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <NavLink href='/features' isScrolled={isScrolled}>
              Features
            </NavLink>
            <NavLink href='/pricing' isScrolled={isScrolled}>
              Pricing
            </NavLink>
            {user ? (
              <>
                <NavLink href='/dashboard' isScrolled={isScrolled}>
                  Dashboard
                </NavLink>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors'
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
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href='/signup'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 rounded-md'
          >
            <div className='space-y-2'>
              <span
                className={`block w-6 h-0.5 ${
                  isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 ${
                  isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 ${
                  isScrolled ? "bg-gray-900 dark:bg-white" : "bg-white"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95'
          >
            <div className='flex justify-end p-4'>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='p-2'
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
                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className='text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md'
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
                  >
                    Login
                  </Link>
                  <Link
                    href='/signup'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md'
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
        isScrolled ? "text-gray-900 dark:text-white" : "text-white"
      } hover:text-blue-500 transition-colors`}
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
    className='px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
  >
    {children}
  </Link>
);

export default Navbar;
