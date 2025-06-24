import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
};

const containerVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SignupLogin = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="w-screen h-screen m-5 flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black font-mono relative overflow-hidden">
      {/* Card Container */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl px-10 py-12 w-[400px] z-10 overflow-hidden"
      >
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 opacity-40 blur-md animate-pulse z-[-1]" />

        <h2 className="text-3xl text-center text-white font-bold tracking-wide mb-8">
          {isSignup ? "SIGN UP" : "LOGIN"}
        </h2>

        <AnimatePresence mode="wait">
          {isSignup ? (
            <motion.form
              key="signup"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Username"
                className="bg-black/60 border border-purple-400 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-black/60 border border-purple-400 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-black/60 border border-purple-400 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300"
              />
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-black font-bold py-2 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Create Account
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="login"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                placeholder="Email"
                className="bg-black/60 border border-teal-400 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-teal-300"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-black/60 border border-teal-400 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-teal-300"
              />
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-black font-bold py-2 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Log In
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-sm text-gray-200">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-300 underline ml-1 hover:text-blue-400 transition-all"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupLogin;
