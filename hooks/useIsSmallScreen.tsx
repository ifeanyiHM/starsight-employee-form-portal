import { useEffect, useState } from "react";

export function useIsSmallScreen(breakpoint = 640) {
  // 640px = Tailwind's sm
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    // run only in the browser
    const check = () => setIsSmall(window.innerWidth < breakpoint);
    check(); // initial check
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isSmall;
}
