import React, { createContext, useEffect, useState } from "react";

export const WindowSizeContext = createContext();

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={{ windowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
}
