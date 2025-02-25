import { motion } from "framer-motion";

const ProblemSolution = () => {
  return (
    <div className='py-12 px-4 md:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-4'
          >
            <h3 className='text-2xl md:text-3xl font-bold'>The Problem</h3>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Creating professional visualizations is time-consuming and often
              requires expensive software and design expertise. Many businesses
              struggle to produce high-quality visual content consistently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-4'
          >
            <h3 className='text-2xl md:text-3xl font-bold'>Our Solution</h3>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              VisuaGen leverages AI to automate the design process, making it
              possible for anyone to create stunning visualizations in minutes.
              No design experience needed - just describe what you want, and let
              our AI do the rest.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution;
