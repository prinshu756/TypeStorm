import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileKeyboard from "./MobileKeyboard.jsx";
import GameOverScreen from "./GameOver.jsx";
import generateRandomWords from "./randomWords.js";
import "./index.css";
import "./style.css";

const wordsList = generateRandomWords(100);

function MainGame() {
  const canvasRef = useRef(null);
  const shootRef = useRef(null);
  const explosionRef = useRef(null);
  const activeRef = useRef([]);

  const [active, setActive] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [particles, setParticles] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const speedRef = useRef(0.27);
  const lastSpawn = useRef(0);
  const gameLoopRef = useRef(null);

  const spawnWord = () => {
    const txt = wordsList[Math.floor(Math.random() * wordsList.length)];
    const canvasWidth = window.innerWidth;
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "28px 'Share Tech Mono', monospace";
    const wordWidth = ctx.measureText(txt).width;
    const x = Math.random() * (canvasWidth - wordWidth - 40) + 20;

    const newWord = {
      text: txt,
      typed: "",
      x,
      y: -40,
      speed: speedRef.current + level * 0.05,
    };

    setActive((prev) => {
      const updated = [...prev, newWord];
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
    const newParticles = Array.from({ length: 10 }).map(() => ({
      x: word.x,
      y: word.y,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
      alpha: 1,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleKey = (e) => {
    const ch = typeof e === "string" ? e : e.key.toLowerCase();
    if (!ch || !activeRef.current.length) return;

    document.querySelectorAll(".key-btn").forEach((btn) => (btn.style.background = "#222"));
    const target = document.querySelector(`.key-btn[data-key='${ch}']`);
    if (target) target.style.background = "#0f0";

    let updatedWords = [...activeRef.current];
    const targetIndex = updatedWords.findIndex((w) => w.typed.length > 0 || w.text.startsWith(ch));

    if (targetIndex !== -1) {
      const word = updatedWords[targetIndex];
      if (word.text.startsWith(word.typed + ch)) {
        word.typed += ch;
        shootRef.current?.play();

        if (word.typed === word.text) {
          explosionRef.current?.play();
          explodeWord(word);
          const gained = word.text.length * 10;
          setScore((prevScore) => prevScore + gained);
          updatedWords.splice(targetIndex, 1);
        }
      } else {
        word.typed = ""; // wrong key resets
      }
    }

    activeRef.current = updatedWords;
    setActive(updatedWords);
  };

  // Recalculate level based on score
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [score]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
      const listener = (e) => handleKey(e);
      document.addEventListener("keydown", listener);
      return () => document.removeEventListener("keydown", listener);
    }
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawParticles(ctx);

      const updated = activeRef.current.map((w) => ({ ...w, y: w.y + w.speed }));

      updated.forEach((w) => {
        ctx.font = "28px 'Press Start 2P', monospace";
        const { typed, text, x, y } = w;
        const rest = text.substring(typed.length);
        ctx.fillStyle = "#0ff";
        ctx.fillText(typed, x, y);
        ctx.fillStyle = "#fff";
        ctx.fillText(rest, x + ctx.measureText(typed).width, y);
      });

      if (updated.some((w) => w.y > canvas.height - 10)) {
        if (!gameOver) setGameOver(true);
        return;
      }

      activeRef.current = updated;
      setActive(updated);

      if (!gameOver) gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (!gameOver) gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameOver]);

  return (
    <div className="w-screen h-screen bg-cover bg-center relative overflow-hidden">
      <div id="hey"><div id="layer-up" /></div>
      <div id="layer-0">
        <div id="layer-1">
          <div id="layer-2">
            <div id="lines">
              <div id="layer-corner" />
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute top-4 left-6 text-white font-semibold text-xl">
        Score: <span className="text-lime-400">{score}</span>
      </div>
      <div className="absolute top-4 right-6 text-white font-semibold text-xl">
        Level: <span className="text-yellow-300">{level}</span>
      </div>

      <MobileKeyboard onKeyPress={handleKey} />

      <AnimatePresence>
        {gameOver && (
          <GameOverScreen
            score={score}
            level={level}
            onRestart={() => {
              setScore(0);
              setLevel(1);
              setActive([]);
              setParticles([]);
              activeRef.current = [];
              speedRef.current = 0.25;
              lastSpawn.current = 0;
              setGameOver(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* <audio ref={shootRef} src="/shoot.wav" preload="auto" /> */}
      {/* <audio ref={explosionRef} src="/explode.wav" preload="auto" /> */}
    </div>
  );
}

export default MainGame;
