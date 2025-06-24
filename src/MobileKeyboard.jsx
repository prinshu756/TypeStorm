import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QWERTY_KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "-"]
];

const MobileKeyboard = ({ onKeyPress }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const checkDevice = () => setIsTouchDevice(touchQuery.matches);
    checkDevice();
    touchQuery.addEventListener("change", checkDevice);
    return () => touchQuery.removeEventListener("change", checkDevice);
  }, []);

  if (!isTouchDevice) return null;

  return (
    <div className="absolute mb-14 bottom-3 w-full flex flex-col items-center px-2">
      {/* Toggle Button */}
      <button
        className="mb-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-blue-700 transition w-full max-w-md"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "Use Device Keyboard" : "Show On-Screen Keyboard"}
      </button>

      {/* Animated Keyboard */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="w-full flex flex-col items-center gap-1 pb-3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {QWERTY_KEYS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-1 justify-center w-full flex-wrap"
              >
                {row.map((key) => (
                  <button
                    key={key}
                    data-key={key}
                    className="key-btn flex-1 min-w-[10%] max-w-[12%] bg-zinc-800 text-lime-300 font-bold aspect-square text-center rounded transition-colors text-base"
                    onClick={() => onKeyPress(key)}
                    style={{ flexGrow: 1 }}
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