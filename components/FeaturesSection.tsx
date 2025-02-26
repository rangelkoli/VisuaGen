"use client";

import { motion } from "framer-motion";
import { FaRobot, FaImage, FaPalette, FaMagic } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className='text-3xl text-violet-500' />,
    title: "AI-Powered",
    description:
      "Our advanced AI models transform your text prompts into stunning visuals with minimal effort.",
  },
  {
    icon: <FaImage className='text-3xl text-violet-500' />,
    title: "High-Quality Output",
    description:
      "Generate professional-grade visuals suitable for presentations, social media, and marketing.",
  },
  {
    icon: <FaPalette className='text-3xl text-violet-500' />,
    title: "Customizable Styles",
    description:
      "Choose from various styles and customize the output to match your brand identity.",
  },
  {
    icon: <FaMagic className='text-3xl text-violet-500' />,
    title: "One-Click Editing",
    description:
      "Fine-tune your creations with our intuitive editing tools designed for non-designers.",
  },
];

export default function FeaturesSection() {
  return (
    <section className='py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
            Powerful Features
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            VisuaGen combines cutting-edge AI with user-friendly tools to help
            you create stunning visuals.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
            >
              <div className='mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                {feature.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
