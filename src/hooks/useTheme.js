import { useEffect, useState } from "react";

export default function useTheme(initial = false) {
  const [isLightMode, setIsLightMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light"; 
  });

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return [isLightMode, setIsLightMode];
}
