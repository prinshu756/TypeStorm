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
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(true);

  // Detect touch devices
  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const checkDevice = () => setIsTouchDevice(touchQuery.matches);
    checkDevice();
    touchQuery.addEventListener("change", checkDevice);
    return () => touchQuery.removeEventListener("change", checkDevice);
  }, []);

  // Native input handling
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (e) => {
      const lastChar = e.target.value.slice(-1).toLowerCase();
      if (lastChar) onKeyPress(lastChar);
      e.target.value = "";
    };

    const handleBlur = () => {
      if (!showVirtualKeyboard) {
        setTimeout(() => input.focus(), 100);
      }
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);

    // Manage focus based on keyboard mode
    if (!showVirtualKeyboard) {
      input.focus();
    } else {
      input.blur();
    }

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("blur", handleBlur);
    };
  }, [onKeyPress, showVirtualKeyboard]);

  if (!isTouchDevice) return null;

  return (
    <div
      className="fixed bottom-0 w-full z-50 flex flex-col items-center px-4 pb-3 bg-transparent"
      style={{ touchAction: "manipulation" }} // smoother taps
    >
      {/* Hidden input positioned FAR outside the screen to prevent layout shift */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        style={{ position: "absolute", top: "-9999px" }}
      />

      {/* Toggle Keyboard Mode Button */}
      <button
        onClick={() => {
          setShowVirtualKeyboard((prev) => !prev);
          setTimeout(() => {
            if (inputRef.current) {
              if (!showVirtualKeyboard) {
                inputRef.current.focus(); // Switch to native
              } else {
                inputRef.current.blur(); // Switch to virtual
              }
            }
          }, 50);
        }}
        className="mb-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-blue-700 transition w-full max-w-md"
      >
        {showVirtualKeyboard ? "Use Device Keyboard" : "Show Virtual Keyboard"}
      </button>

      {/* Virtual Keyboard */}
      <AnimatePresence>
        {showVirtualKeyboard && (
          <motion.div
            className="w-full max-w-md flex flex-col items-center gap-1 bg-black/90 p-3 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
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
                    className="flex-1 min-w-[9%] max-w-[13%] text-center py-3 bg-zinc-800 text-lime-300 rounded-md font-semibold text-base active:scale-95 transition-transform"
                    style={{
                      touchAction: "manipulation",
                      userSelect: "none",
                    }}
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
