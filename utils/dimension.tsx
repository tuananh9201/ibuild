import { useState, useEffect } from "react";
interface Size {
  width: number;
  height: number;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(): Size {
  const [windowDimensions, setWindowDimensions] = useState<Size>({
    width: -1,
    height: -1,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
