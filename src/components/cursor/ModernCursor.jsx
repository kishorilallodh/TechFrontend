import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ModernCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);


  const variants = {
    // Sirf 'default' aur 'dot' variants rakhein
    default: {
      height: 32,
      width: 32,
      border: "2px solid #4859da", // Aap yahan color badal sakte hain
      backgroundColor: "transparent",
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    dot: {
      height: 8,
      width: 8,
      backgroundColor: "#03286d", // Aap yahan color badal sakte hain
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
    }
  };

  return (
    <>
      {/* 1. Outlined Cursor (Outer Ring) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate="default"
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* 2. Solid Dot Cursor (Inner Dot) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate="dot"
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
};

export default ModernCursor;