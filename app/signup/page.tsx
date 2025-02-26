"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { signUp } from "@/lib/auth";
import toast from "react-hot-toast";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const signUpPromise = signUp(email, password);

    toast.promise(signUpPromise, {
      loading: "Creating account...",
      success: () => {
        router.push("/login");
        return "Account created successfully!";
      },
      error: (err) => `Sign up failed: ${err.message}`,
    });

    const { error } = await signUpPromise;
    setIsLoading(false);
  };

  return (
    <AuthForm title='Create Account'>
      <form onSubmit={handleSignUp} className='space-y-6'>
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
          className='w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors duration-200'
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </motion.button>
        <p className='text-center text-gray-600 dark:text-gray-400 mt-4'>
          Already have an account?{" "}
          <Link href='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </AuthForm>
  );
}
