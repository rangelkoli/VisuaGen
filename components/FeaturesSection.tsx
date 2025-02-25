import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Generation",
    description:
      "Create professional visuals in seconds using advanced AI technology.",
    icon: "🤖",
  },
  {
    title: "Customizable Templates",
    description:
      "Choose from hundreds of templates or create your own unique designs.",
    icon: "🎨",
  },
  {
    title: "Easy Sharing",
    description: "Share your creations instantly with team members or clients.",
    icon: "🔄",
  },
  {
    title: "Export Options",
    description: "Export in multiple formats suitable for any platform.",
    icon: "💾",
  },
];

export default function FeaturesSection() {
  return (
    <div className='py-12 px-4 md:px-8'>
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-8'>
        Features
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow'
          >
            <div className='text-4xl mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
