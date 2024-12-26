import React from "react";
import { motion } from "framer-motion";

const AnimatedLoader = () => {
  const loaderVariants = {
    animation: {
      y: ["0%", "100%", "0%"],
    },
  };

  const transition = (delay) => ({
    ease: "linear",
    duration: 0.6,
    delay: delay,
    repeat: Infinity,
  });

  return (
    <div className="min-h-screen space-x-3 bg-gradient-to-br from-gray-800 via-green-800 to-emerald-800 flex justify-center items-center relative overflow-hidden">
      <motion.span
        className="w-5 h-5 rounded-full shadow-lg bg-gradient-to-tr from-green-600 to-emerald-600"
        variants={loaderVariants}
        animate="animation"
        transition={transition(0.3)}
      />
      <motion.span
        className="w-5 h-5 rounded-full shadow-lg bg-gradient-to-tr from-green-600 to-emerald-600"
        variants={loaderVariants}
        animate="animation"
        transition={transition(0.2)}
      />
      <motion.span
        className="w-5 h-5 rounded-full shadow-lg bg-gradient-to-tr from-green-600 to-emerald-600"
        variants={loaderVariants}
        animate="animation"
        transition={transition(0.1)}
      />
    </div>
  );
};

export default AnimatedLoader;
