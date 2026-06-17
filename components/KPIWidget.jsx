"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";

/* Color tokens — must match StatsDashboard.jsx */
const C = {
  primary:   "#06E6FF",
  secondary: "#3B82F6",
  accent:    "#8B5CF6",
  gradient:  "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/**
 * KPIWidget – glassmorphism mini-card with mouse-tilt,
 * animated gradient border, neon edge glow, and floating motion.
 * Uses unified cyan → blue → violet palette.
 */
export default function KPIWidget({ label, value, color, trend = "up", icon, index = 0 }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouse = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }, [mx, my]);

  const resetMouse = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const arrow = trend === "up" ? (
    <svg viewBox="0 0 20 20" fill={color} className="w-3 h-3 ml-1 opacity-70">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill={color} className="w-3 h-3 ml-1 opacity-70">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
    </svg>
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl cursor-pointer overflow-hidden animate-neonEdge"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Animated gradient border — uses unified palette */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, ${C.primary}20, transparent 40%, ${C.secondary}15, transparent 80%, ${C.accent}10)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl bg-slate-50/50 dark:bg-white/[0.025] backdrop-blur-xl p-4 h-full">
        {/* Floating motion */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4.5 + index, ease: "easeInOut" }}
        >
          {/* Icon + label */}
          <div className="flex items-center gap-2 mb-2">
            {icon && <span className="text-sm">{icon}</span>}
            <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-[0.15em] font-semibold">
              {label}
            </p>
          </div>

          {/* Value */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {value}
            </span>
            {arrow}
          </div>
        </motion.div>

        {/* Subtle hover glow — matches card's accent color */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
