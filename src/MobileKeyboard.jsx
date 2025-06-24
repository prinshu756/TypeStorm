import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QWERTY_KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "-"],
];

const MobileKeyboard = ({ onKeyPress }) => {
  const inputRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const checkDevice = () => setIsTouchDevice(touchQuery.matches);
    checkDevice();
    touchQuery.addEventListener("change", checkDevice);
    return () => touchQuery.removeEventListener("change", checkDevice);
  }, []);

  // Focus and handle native input
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (e) => {
      const lastChar = e.target.value.slice(-1).toLowerCase();
      if (lastChar) onKeyPress(lastChar);
      e.target.value = "";
    };

    const handleBlur = () => {
      setTimeout(() => {
        if (!showVirtualKeyboard) input.focus(); // only refocus if not using virtual keyboard
      }, 100);
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);
    input.focus();

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("blur", handleBlur);
    };
  }, [onKeyPress, showVirtualKeyboard]);

  if (!isTouchDevice) return null;

  return (
    <div className="fixed bottom-3 mb-12 w-full z-50 bg-transparent flex flex-col items-center px-4 pb-2">
      {/* Native Hidden Input Field */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        className="absolute top-0 left-0 opacity-0 w-0 h-0 pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      {/* Toggle Button */}
      <button
        onClick={() => {
          setShowVirtualKeyboard((prev) => !prev);
          if (!showVirtualKeyboard) {
            inputRef.current.blur(); // hide native keyboard
          } else {
            inputRef.current.focus(); // re-show native keyboard
          }
        }}
        className="mb-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-blue-700 transition w-full max-w-md"
      >
        {showVirtualKeyboard ? "Use Device Keyboard" : "Show Virtual Keyboard"}
      </button>

      {/* Virtual Keyboard */}
      <AnimatePresence>
        {showVirtualKeyboard && (
          <motion.div
            className="w-full max-w-md flex flex-col items-center gap-1 bg-black/80 p-2 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {QWERTY_KEYS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-center w-full gap-1"
              >
                {row.map((key) => (
                  <button
                    key={key}
                    data-key={key}
                    onClick={() => onKeyPress(key)}
                    className="key-btn flex-1 min-w-[10%] max-w-[12%] bg-zinc-800 text-lime-300 font-bold aspect-square text-center rounded transition-colors text-base"
                  >
                    {key.toUpperCase()}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileKeyboard;
