"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* Color token — must match StatsDashboard.jsx */
const PRIMARY = "#06E6FF";

/**
 * BackgroundEffect – subtle animated particles and moving grid.
 * Reduced particle count and opacity for clean, enterprise look.
 */
export default function BackgroundEffect() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      [...Array(18)].map((_, i) => ({
        id: i,
        width: Math.random() * 3 + 1.5,
        height: Math.random() * 3 + 1.5,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Moving grid overlay — low opacity */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.15] animate-gridMove" />
      {/* Particles — fewer, subtler */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
            background: PRIMARY,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
