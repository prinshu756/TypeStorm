import React, { useEffect, useRef, useState } from "react";

const MobileKeyboard = ({ onKeyPress }) => {
  const inputRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const checkDevice = () => setIsTouchDevice(touchQuery.matches);
    checkDevice();
    touchQuery.addEventListener("change", checkDevice);
    return () => touchQuery.removeEventListener("change", checkDevice);
  }, []);

  // Focus the input on load and keep it focused
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const handleInput = (e) => {
      const lastChar = e.target.value.slice(-1).toLowerCase();
      if (lastChar) onKeyPress(lastChar);
      e.target.value = ""; // Clear after each input
    };

    input.addEventListener("input", handleInput);
    input.focus();

    // Auto-refocus if blurred
    const handleBlur = () => {
      setTimeout(() => input.focus(), 100);
    };
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("blur", handleBlur);
    };
  }, [onKeyPress]);

  if (!isTouchDevice) return null;

  return (
    <div className="absolute bottom-4 w-full flex justify-center px-4">
      <input
        ref={inputRef}
        type="text"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-md text-lg bg-white"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        placeholder="Tap to start typing..."
      />
    </div>
  );
};

export default MobileKeyboard;
