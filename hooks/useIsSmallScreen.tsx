import { useEffect, useState } from "react";

export function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isSmall;
}
