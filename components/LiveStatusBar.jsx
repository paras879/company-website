"use client";

import { motion } from "framer-motion";

/* Color token — must match StatsDashboard.jsx */
const PRIMARY = "#06E6FF";

/**
 * LiveStatusBar – subtle animated "Live Data Streaming" indicator.
 * Uses unified primary cyan.
 */
export default function LiveStatusBar() {
  return (
    <motion.div
      className="flex items-center justify-center py-2 text-sm bg-slate-50 dark:bg-[#080c14] border-t border-slate-200 dark:border-[#06E6FF18] transition-colors duration-300"
      style={{
        color: `${PRIMARY}cc`,
      }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    >
      <span>Live Data Streaming</span>
      <motion.span
        className="ml-2 w-2 h-2 rounded-full"
        style={{ background: PRIMARY }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
