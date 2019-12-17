import { useEffect, useState } from "react";

export default function useWindowSize(cb) {
  const [[windowWidth, windowHeight], setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight
  ]);
  console.log("hello from WindowSize custom hook");

  useEffect(() => {
    const handleResize = () => {
      // Allow creating a new canvas upon resize
      cb();
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    // Cleanup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cb]);
  return [windowWidth, windowHeight];
}
