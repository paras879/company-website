"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const C = {
  primary: "#06E6FF",
  accent: "#8B5CF6",
};

export default function BlogBackground() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        width: 2 + Math.random() * 2,
        height: 2 + Math.random() * 2,
        top: `${10 + Math.random() * 80}%`,
        left: `${Math.random() * 100}%`,
        duration: 6 + Math.random() * 4,
        background: i % 2 === 0 ? C.primary : C.accent,
        delay: i * 0.8,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Aurora gradient mesh */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: `radial-gradient(ellipse, ${C.primary}, transparent 70%)`, filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.025]"
        style={{ background: `radial-gradient(ellipse, ${C.accent}, transparent 70%)`, filter: "blur(80px)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${C.primary}15 1px, transparent 1px), linear-gradient(90deg, ${C.primary}15 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
            background: p.background,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.05, 0.18, 0.05] }}
          transition={{ repeat: Infinity, duration: p.duration, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}
