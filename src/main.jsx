import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./StartScreen";
import MainGame from "./MainGame.jsx";
import SignUp from "./SignUp.jsx";
import "./index.css";
import "./App.css";
import LeaderBoard from "./LeaderBoard.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<MainGame />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
    </Routes>
  </BrowserRouter>
);
