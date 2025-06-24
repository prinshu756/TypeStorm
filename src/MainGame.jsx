import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileKeyboard from "./MobileKeyboard.jsx";
import GameOverScreen from "./GameOver.jsx";
import generateRandomWords from "./randomWords.js";
import "./index.css";
import "./app.css";
import "./style.css";

const wordsList = generateRandomWords(100)

console.log(wordsList);


function MainGame() {
  const canvasRef = useRef(null);
  const shootRef = useRef(null);
  const explosionRef = useRef(null);
  const activeRef = useRef([]);

  const [active, setActive] = useState([]);
  const [score, setScore] = useState(0);
  const [particles, setParticles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const speedRef = useRef(0.6);
  const lastSpawn = useRef(0);
  const lastSpeedIncrease = useRef(0);
  const gameLoopRef = useRef(null);

  const spawnWord = () => {
    const txt = wordsList[Math.floor(Math.random() * wordsList.length)];
    const canvasWidth = window.innerWidth;
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "28px 'Share Tech Mono', monospace"; 
    const wordWidth = ctx.measureText(txt).width;
    const x = Math.random() * (canvasWidth - wordWidth - 40) + 20;

    setActive((prev) => {
      const updated = [
        ...prev,
        {
          text: txt,
          typed: "",
          x: x,
          y: -40,
          speed: speedRef.current,
        },
      ];
      activeRef.current = updated;
      return updated;
    });
  };

  const updateParticles = () => {
    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          alpha: p.alpha - 0.02,
        }))
        .filter((p) => p.alpha > 0)
    );
  };

  const drawParticles = (ctx) => {
    particles.forEach((p) => {
      ctx.fillStyle = `rgba(255,255,200,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const explodeWord = (word) => {
    let newParticles = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        x: word.x,
        y: word.y,
        vx: Math.random() * 4 - 1,
        vy: Math.random() * 4 - 1,
        alpha: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleKey = (e) => {
    const ch = typeof e === "string" ? e : e.key.toLowerCase();
    if (!ch || !activeRef.current.length) return;

    document
      .querySelectorAll(".key-btn")
      .forEach((btn) => (btn.style.background = "#222"));
    const target = document.querySelector(`.key-btn[data-key='${ch}']`);
    if (target) target.style.background = "#0f0";

    let [first, ...rest] = activeRef.current;
    let updatedFirst = { ...first };

    if (first.text.startsWith(first.typed + ch)) {
      updatedFirst.typed += ch;
      shootRef.current.currentTime = 0;
      shootRef.current.play();

      if (updatedFirst.typed === updatedFirst.text) {
        explosionRef.current.currentTime = 0;
        explosionRef.current.play();
        explodeWord(updatedFirst);
        setScore((prev) => prev + updatedFirst.text.length * 10);

        activeRef.current = rest;
        setActive(rest);
        return;
      }

      activeRef.current = [updatedFirst, ...rest];
      setActive([updatedFirst, ...rest]);
    } else {
      updatedFirst.typed = "";
      activeRef.current = [updatedFirst, ...rest];
      setActive([updatedFirst, ...rest]);
    }
  };

  const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    const listener = (e) => {
      if (!isTouchDevice()) handleKey(e);
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const loop = (timestamp) => {
      if (lastSpawn.current === 0 || timestamp - lastSpawn.current > 2500) {
        spawnWord();
        lastSpawn.current = timestamp;
      }

      if (timestamp - lastSpeedIncrease.current > 20000) {
        speedRef.current += 0.25 * level;
        lastSpeedIncrease.current = timestamp;
        setLevel((prev) => prev + 1);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawParticles(ctx);

      const updated = activeRef.current.map((w) => ({
        ...w,
        y: w.y + w.speed,
      }));

      updated.forEach((w, i) => {
        ctx.font = "28px 'Press Start 2P', monospace";
        const typed = w.typed;
        const rest = w.text.substring(typed.length);
        ctx.fillStyle = i === 0 ? "#0ff" : "#aaa";
        ctx.fillText(typed, w.x, w.y);
        ctx.fillStyle = "#fff";
        ctx.fillText(rest, w.x + ctx.measureText(typed).width, w.y);
      });

      if (updated.some((w) => w.y > canvas.height - 10)) {
        if (!gameOver) setGameOver(true);
        return;
      }

      setActive(updated);
      activeRef.current = updated;

      if (!gameOver) gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (!gameOver) {
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameOver]);

  return (
    <div className="w-screen h-screen  bg-cover bg-center relative  overflow-hidden">
      {/* Background image */}
      <div id="hey">
        <div id="layer-up"></div>
      </div>
      <div id="layer-0">
        <div id="layer-1">
          <div id="layer-2">
            <div id="lines">
              <div id="layer-corner"></div>
            </div>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0  w-full h-full"
      ></canvas>

      <div className="absolute top-4 left-6 text-white font-semibold text-xl">
        Score: <span className="text-lime-400">{score}</span>
      </div>
      <div className="absolute top-4 right-6 text-white font-semibold text-xl">
        Level: <span className="text-yellow-300">{level}</span>
      </div>

      <MobileKeyboard onKeyPress={handleKey} />

      {gameOver && (
        <GameOverScreen
          score={score}
          level={level}
          onRestart={() => {
            setScore(0);
            setLevel(0);
            setActive([]);
            setParticles([]);
            activeRef.current = [];
            speedRef.current = 0.5;
            lastSpawn.current = 0;
            lastSpeedIncrease.current = 0;
            setGameOver(false);
          }}
        />
      )}

      <audio ref={shootRef} src="shoot.wav"></audio>
      <audio ref={explosionRef} src="explode.wav"></audio>
    </div>
  );
}

export default MainGame;
