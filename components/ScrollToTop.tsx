"use client";
import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200); // show after 200px
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-[#333232] p-3 text-white shadow-lg transition hover:bg-[#444343]"
    >
      <FaArrowUpLong className="h-5 w-5" />
    </button>
  );
}
