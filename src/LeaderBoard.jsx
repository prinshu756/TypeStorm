import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const dummyScores = [
  { username: "Mummy", score: 1520 },
  { username: "Prinshu", score: 1280 },
  { username: "Neeraj Pepsu", score: 1170 },
  { username: "Anonymous", score: 980 },
  { username: "SharpFingers", score: 850 },
  { username:"Gandmarnewala",score:690},
];

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1,},
  }),
};


const Leaderboard = ({ scores = dummyScores }) => {
const [redirectTo, setRedirectTo] = useState(null);
if(redirectTo === "/") return <Navigate to="/" />;      

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-900 flex items-center justify-center font-mono text-white px-4 py-10">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-lime-300 mb-6">🏆 Leaderboard</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-lime-200 uppercase text-sm border-b border-lime-500">
                <th className="py-2">Position</th>
                <th className="py-2">Player</th>
                <th className="py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((player, index) => (
                <motion.tr
                  key={player.username}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-lg ${
                    index === 0
                      ? "text-red-400"
                      : index === 1
                      ? "text-orange-300"
                      : index === 2
                      ? "text-blue-300"
                      : "text-white"
                  }`}
                >
                  <td className="py-2 px-6 bg">{index + 1}</td>
                  <td className="py-2 ">{player.username}</td>
                  <td className="py-2 text-right font-semibold">{player.score}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <motion.div
        className="absolute bottom-4 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}>
          <motion.button
            onClick={() => setRedirectTo("/")}
            whileHover={{ scale: 1.05, color: "#a3e635" }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
          
          >🏠 Home</motion.button>
        </motion.div>
    </div>

  );
};

export default Leaderboard;
