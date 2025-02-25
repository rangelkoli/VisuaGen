import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  title: string;
}

export default function AuthForm({ children, title }: AuthFormProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <motion.div
          className='bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden'
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className='px-6 py-8'>
            <h2 className='text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white'>
              {title}
            </h2>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
