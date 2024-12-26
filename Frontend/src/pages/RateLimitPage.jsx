import { motion } from "framer-motion";
import { Clock, Info } from "lucide-react"; // Use the clock icon to indicate waiting/timeout

const RateLimitPage = () => {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-800
     via-green-800 to-emerald-800 flex justify-center items-center
      relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text">
            Rate Limited
          </h2>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Clock className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-yellow-400 mt-6">
              You've made too many requests in a short period. Please try again
              1 Min later.
            </p>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-xs text-center text-yellow-500 hover:underline flex items-center">
            This protects your account and our infrastructure from overuse
            <Info className="h-4 w-4 ml-2" />
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default RateLimitPage;
