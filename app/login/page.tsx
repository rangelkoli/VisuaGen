"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { signIn, signInWithGoogle } from "@/lib/auth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        // Log the error for debugging
        console.error("Login error:", error);
        // Handle specific auth errors
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email first");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data?.user) {
        toast.success("Successfully logged in!");
        router.push("/");
      } else {
        toast.error("No user found with these credentials");
      }
    } catch (error) {
      toast.error("An unexpected error occurred" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await signInWithGoogle();

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Successfully logged in with Google!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to sign in with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthForm title='Welcome Back'>
      <div className='space-y-6'>
        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Email
            </label>
            <motion.input
              id='email'
              whileFocus={{ scale: 1.01 }}
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200'
              required
            />
          </div>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Password
              </label>
              <Link
                href='/forgot-password'
                className='text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
              >
                Forgot password?
              </Link>
            </div>
            <motion.input
              id='password'
              whileFocus={{ scale: 1.01 }}
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200'
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
            className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className='relative flex items-center my-6'>
          <div className='flex-grow border-t border-gray-300 dark:border-gray-700'></div>
          <span className='flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400'>
            or continue with
          </span>
          <div className='flex-grow border-t border-gray-300 dark:border-gray-700'></div>
        </div>

        {/* Google Sign-in */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
        >
          {isGoogleLoading ? (
            <span className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700 dark:text-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <>
              <FcGoogle className='text-xl' />
              <span>Sign in with Google</span>
            </>
          )}
        </motion.button>

        <p className='text-center text-gray-600 dark:text-gray-400 mt-6'>
          Don&apos;t have an account?{" "}
          <Link
            href='/signup'
            className='text-blue-500 hover:text-blue-700 font-medium hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthForm>
  );
}
