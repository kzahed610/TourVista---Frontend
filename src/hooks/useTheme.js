import { useEffect, useState } from "react";

export default function useTheme(initial = false) {
  const [isLightMode, setIsLightMode] = useState(initial);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
  }, [isLightMode]);

  return [isLightMode, setIsLightMode];
}
