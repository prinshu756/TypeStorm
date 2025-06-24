import React,{useState} from "react";
import { Navigate } from "react-router-dom";

const GameOverScreen = ({ score,level, onRestart }) => {

  const [redirectTo, setRedirectTo] = useState(null); 
  if(redirectTo === "leaderboard") return <Navigate to="/leaderboard" />;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center font-mono animate-fade-in">
      <div className="text-center p-10 sm:p-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,255,0,0.2)] max-w-md mx-4 sm:mx-0">
        
        <h1 className="text-5xl font-extrabold text-red-500 mb-6 tracking-wide drop-shadow-glow animate-pulse">
          GAME OVER
        </h1>

        <p className="text-lg text-gray-300 mb-1">Your Score</p>
        <p className="text-4xl font-bold text-lime-400 mb-8">{score}</p>
        <p className="text-lg text-gray-300 mb-6">You reached level : {level}</p>
        <p className="text-lg text-gray-400 mb-6"> Keep it up and play again</p>

        {/* Optional: Display a motivational message */}  

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onRestart}
            className="bg-lime-500 hover:bg-lime-600 active:scale-95 transition-transform text-black font-semibold py-2 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            🔁 Play Again
          </button>

          {/* <button
            onClick={()=> setRedirectTo("leaderboard")}
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-transform text-white font-semibold py-2 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            🏆 Leaderboard
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
