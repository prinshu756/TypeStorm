import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const StartScreen = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  

  if (redirectTo === "game") return <Navigate to="/game" />;
  if (redirectTo === "signup") return <Navigate to="/signup" />;
  if (redirectTo === "leaderboard") return <Navigate to="/leaderboard" />;

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* Glowing Particle Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-72 h-72 bg-pink-500 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-ping"></div>
      </div>

      {/* Title */}
      <motion.h1
        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-lime-400 text-center drop-shadow-[0_0_30px_rgba(163,230,53,0.85)] mb-16 z-10"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ⚡ TypeStorm
      </motion.h1>

      {/* Buttons */}
      <div className="flex flex-col gap-5 w-full max-w-xs sm:max-w-sm md:max-w-md z-10">
        <motion.button
          onClick={() => setRedirectTo("game")}
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px #a3e635" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-2xl transition-all duration-200 shadow-md"
        >
          ▶ Start Game
        </motion.button>

        {/* <motion.button
          onClick={() => setRedirectTo("signup")}
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px #c084fc" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition-all duration-200 shadow-md"
        >
          📝 Sign Up / Login
        </motion.button> */}

        {/* <motion.button
          onClick={() => setRedirectTo("leaderboard")}
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px #facc15" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-2xl transition-all duration-200 shadow-md"
        >
          🏆 Leaderboard
        </motion.button> */}
      </div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-6 text-gray-300 text-sm text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        🚀 Let the typing storm begin!
      </motion.p>
    </div>
  );
};

export default StartScreen;
