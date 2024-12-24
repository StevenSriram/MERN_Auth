import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const isLoading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // ? Handle Verification
    if (code.every((digit) => digit !== "")) {
      console.log("Verification Code:", code.join(""));
    }
  }, [code]);

  const handleChange = (value, i) => {
    const newCode = [...code];

    // ! Handle Pasting of Verification Code
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let j = 0; j < pasted.length; j++) {
        newCode[j] = pasted[j];
      }
      setCode(newCode);

      // * Focus Next Input after paste
      const focusIdx = pasted.length < 6 ? pasted.length : 5;
      inputRefs.current[focusIdx]?.focus();
    }
    // ! Handle Normal Typing of Input
    else {
      newCode[i] = value;
      setCode(newCode);

      if (value && i < 5) {
        // ?. - Optional Chaining (handles null || undefined errors)
        inputRefs.current[i + 1]?.focus();
      }
    }
  };

  // ! Handle Clearing of Input
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={index === 5 ? 1 : 6} // ! Restrict to Type more than 6
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
