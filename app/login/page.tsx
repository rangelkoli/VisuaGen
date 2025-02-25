"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loginPromise = signIn(email, password);

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: () => {
        router.push("/");
        return "Successfully logged in!";
      },
      error: (err) => `Login failed: ${err.message}`,
    });

    const { error } = await loginPromise;
    setIsLoading(false);
  };

  return (
    <AuthForm title='Welcome Back'>
      <form onSubmit={handleLogin} className='space-y-6'>
        <div>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200'
          />
        </div>
        <div>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200'
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isLoading}
          className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200'
        >
          {isLoading ? "Logging in..." : "Login"}
        </motion.button>
        <p className='text-center text-gray-600 dark:text-gray-400 mt-4'>
          Don't have an account?{" "}
          <Link href='/signup' className='text-blue-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </AuthForm>
  );
}
