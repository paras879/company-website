"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const BlogBackground = dynamic(() => import("./BlogBackground"), {
  ssr: false,
});

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  primary: "#06E6FF",
  secondary: "#3B82F6",
  accent: "#8B5CF6",
  gradient: "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/* ═══════════════════════════════════════════════════════
   BLOG DATA
   ═══════════════════════════════════════════════════════ */
const featuredBlog = {
  id: 1,
  title: "Master Claude AI Like a Pro: Complete Enterprise Guide 2026",
  excerpt:
    "Discover how leading enterprises leverage advanced AI assistants to transform workflows, automate complex decisions, and unlock unprecedented productivity across every department.",
  image: "/blog/ai-brain.jpg",
  category: "AI & Machine Learning",
  date: "Jun 8, 2026",
  readTime: "8 min",
  popularity: 97,
  views: "12.4K",
};

const sideBlogsData = [
  {
    id: 2,
    title: "Why 87% of Digital Transformations Fail Without the Right Partner",
    excerpt: "Learn the critical factors that separate successful transformations from costly failures.",
    image: "/blog/digital-transform.jpg",
    category: "Digital Strategy",
    date: "Jun 3, 2026",
    readTime: "6 min",
    popularity: 94,
  },
  {
    id: 3,
    title: "AI-Augmented Engineering: Building 10x Faster in 2026",
    excerpt: "Explore how next-gen development labs are redefining software velocity.",
    image: "/blog/code-lab.jpg",
    category: "Engineering",
    date: "May 28, 2026",
    readTime: "7 min",
    popularity: 95,
  },
  {
    id: 4,
    title: "Cloud-Native Architecture for Enterprise Scale",
    excerpt: "The definitive guide to building resilient, globally distributed systems.",
    image: "/blog/cloud-infra.jpg",
    category: "Infrastructure",
    date: "May 22, 2026",
    readTime: "5 min",
    popularity: 91,
  },
];

const marqueeBlogs = [
  { id: 10, title: "Zero-Trust Security in the AI Era", category: "Cybersecurity", readTime: "4 min", image: "/blog/cybersecurity.jpg", popularity: 92 },
  { id: 11, title: "Real-Time Analytics at Petabyte Scale", category: "Data", readTime: "6 min", image: "/blog/data-analytics.jpg", popularity: 89 },
  { id: 12, title: "Edge Computing: The Next Frontier", category: "Infrastructure", readTime: "5 min", image: "/blog/cloud-infra.jpg", popularity: 88 },
  { id: 13, title: "LLM Fine-Tuning for Enterprise", category: "AI & ML", readTime: "8 min", image: "/blog/ai-brain.jpg", popularity: 96 },
  { id: 14, title: "Design Systems That Scale", category: "Engineering", readTime: "4 min", image: "/blog/code-lab.jpg", popularity: 87 },
  { id: 15, title: "Autonomous DevOps Pipelines", category: "DevOps", readTime: "6 min", image: "/blog/digital-transform.jpg", popularity: 90 },
];


/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTON
   ═══════════════════════════════════════════════════════ */
function MagneticButton({ text = "Read Article", compact = false }) {
  const ref = useRef(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const sx = useSpring(bx, { stiffness: 250, damping: 18 });
  const sy = useSpring(by, { stiffness: 250, damping: 18 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        bx.set((e.clientX - r.left - r.width / 2) * 0.2);
        by.set((e.clientY - r.top - r.height / 2) * 0.2);
      }}
      onMouseLeave={() => { bx.set(0); by.set(0); }}
      style={{ x: sx, y: sy }}
      className={`group/btn relative inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer ${compact ? "px-4 py-2 text-[11px]" : "px-5 py-2.5 text-xs"}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <div
        className="absolute inset-0 rounded-full transition-all duration-400 group-hover/btn:shadow-[0_0_20px_rgba(6,230,255,0.12)]"
        style={{ border: `1px solid ${C.primary}25`, background: `${C.primary}06` }}
      />
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(135deg, ${C.primary}10, ${C.secondary}08)` }}
      />
      <span className="relative z-10" style={{ color: C.primary }}>{text}</span>
      <motion.svg
        className="relative z-10 w-3.5 h-3.5"
        viewBox="0 0 16 16" fill="none" stroke={C.primary} strokeWidth="2"
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </motion.svg>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   POPULARITY BAR
   ═══════════════════════════════════════════════════════ */
function PopularityBar({ score, compact = false }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "w-16" : "w-20"}`}>
      <div className={`flex-1 ${compact ? "h-1" : "h-1.5"} rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden`}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: C.gradient }}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </div>
      <span className={`${compact ? "text-[9px]" : "text-[10px]"} font-bold tabular-nums`} style={{ color: C.primary }}>{score}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURED CARD (60% left — text-primary, image-accent)
   ═══════════════════════════════════════════════════════ */
function FeaturedCard({ blog }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-3deg", "3deg"]);
  const imgX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const imgY = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const handle = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  }, [mx, my]);

  return (
    <motion.article
      ref={ref}
      onMouseMove={handle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative rounded-[24px] overflow-hidden cursor-pointer h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
    >
      {/* Card body */}
      <div
        className="relative h-full rounded-[24px] overflow-hidden flex flex-col bg-slate-50 dark:bg-[#0a1225]/90 border border-slate-200 dark:border-white/[0.04] transition-colors duration-400"
        style={{
          borderColor: hovered ? `${C.primary}50` : undefined,
        }}
      >
        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-[24px] pointer-events-none z-30"
          style={{
            padding: "1px",
            background: `conic-gradient(from 0deg, ${C.primary}18, transparent 30%, ${C.secondary}12, transparent 60%, ${C.accent}10, transparent 90%, ${C.primary}18)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          animate={hovered ? { rotate: [0, 360] } : {}}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />

        {/* ── Compact image area (top 40%) ── */}
        <div className="relative overflow-hidden rounded-t-[24px]" style={{ height: "42%", position: "relative" }}>
          <motion.div className="absolute inset-[-10px]" style={{ x: imgX, y: imgY, position: "absolute" }}>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              style={{
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
              }}
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </motion.div>

          {/* Gradient fade to card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#0a1225]/90" />

          {/* Category badge */}
          <div className="absolute top-4 left-5 z-10">
            <span
              className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-100/90 dark:bg-[#050816]/80 backdrop-blur-md transition-colors duration-400 border border-slate-200 dark:border-white/10"
              style={{
                color: C.primary,
                borderColor: hovered ? `${C.primary}50` : undefined,
              }}
            >
              {blog.category}
            </span>
          </div>

          {/* Trending badge */}
          <motion.div
            className="absolute top-4 right-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.12em]"
            style={{
              background: `linear-gradient(135deg, ${C.primary}20, ${C.accent}15)`,
              border: `1px solid ${C.primary}20`,
              backdropFilter: "blur(16px)",
            }}
            animate={{ borderColor: [`${C.primary}15`, `${C.primary}35`, `${C.primary}15`] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: C.primary }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            Trending
          </motion.div>
        </div>

        {/* ── Content area (primary focus, 58%) ── */}
        <div className="relative flex flex-col flex-1 px-[clamp(1.25rem,2.5vw,2rem)] pb-[clamp(1.25rem,2.5vw,2rem)] pt-2">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] text-gray-500">{blog.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="text-[11px] text-gray-500">{blog.readTime} read</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Score</span>
              <PopularityBar score={blog.popularity} />
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight mb-4 transition-colors duration-500 text-slate-900 dark:text-white"
            style={{ color: hovered ? C.primary : undefined }}
          >
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm sm:text-[15px] text-slate-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
            {blog.excerpt}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <MagneticButton />
            <motion.div
              className="flex items-center gap-1.5 text-gray-600"
              initial={{ opacity: 0 }}
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
              <span className="text-[11px] tabular-nums">{blog.views}</span>
            </motion.div>
          </div>
        </div>

        {/* Depth shadow on hover */}
        <div
          className="absolute inset-0 rounded-[24px] pointer-events-none transition-shadow duration-500 shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          style={{ boxShadow: hovered ? `0 25px 60px rgba(0,0,0,0.15), 0 0 40px ${C.primary}15` : undefined }}
        />
      </div>
    </motion.article >
  );
}

/* ═══════════════════════════════════════════════════════
   SIDE STACK CARD (compact, text-focused)
   ═══════════════════════════════════════════════════════ */
function SideCard({ blog, index, heightClass }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handle = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  }, [mx, my]);

  return (
    <motion.article
      ref={ref}
      onMouseMove={handle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative rounded-[20px] overflow-hidden cursor-pointer ${heightClass}`}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.6, type: "spring", stiffness: 90 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.975 }}
    >
      <div
        className="relative h-full rounded-[20px] overflow-hidden flex flex-row gap-0 bg-slate-50 dark:bg-[#0a1225]/90 border border-slate-200 dark:border-white/[0.04] transition-colors duration-400"
        style={{
          borderColor: hovered ? `${C.primary}40` : undefined,
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-20"
          style={{
            padding: "1px",
            background: `conic-gradient(from 0deg, ${C.primary}15, transparent 35%, ${C.accent}10, transparent 70%, ${C.primary}15)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          animate={hovered ? { rotate: [0, 360] } : {}}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />

        {/* Small thumbnail (left side, ~35%) */}
        <div className="relative w-[35%] min-w-[100px] overflow-hidden rounded-l-[20px]" style={{ position: "relative" }}>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
            sizes="200px"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50 dark:to-[#0a1225]/90" />
        </div>

        {/* Content (right side, ~65%) */}
        <div className="relative flex flex-col justify-center flex-1 p-4 sm:p-5 min-w-0">
          {/* Top meta */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider"
              style={{
                background: `${C.primary}08`,
                border: `1px solid ${C.primary}15`,
                color: C.primary,
              }}
            >
              {blog.category}
            </span>
            <span className="text-[10px] text-gray-600">{blog.readTime}</span>
          </div>

          {/* Title */}
          <h4
            className="text-sm sm:text-[15px] font-bold leading-snug mb-2 transition-colors duration-400 line-clamp-2 text-slate-900 dark:text-white"
            style={{ color: hovered ? C.primary : undefined }}
          >
            {blog.title}
          </h4>

          {/* Excerpt */}
          <p className="text-[12px] text-slate-600 dark:text-gray-500 leading-relaxed line-clamp-2 mb-3 hidden sm:block">
            {blog.excerpt}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600">{blog.date}</span>
              <PopularityBar score={blog.popularity} compact />
            </div>
            <MagneticButton text="Read" compact />
          </div>
        </div>

        {/* Hover shadow */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none transition-shadow duration-500 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          style={{ boxShadow: hovered ? `0 15px 40px rgba(0,0,0,0.1), 0 0 25px ${C.primary}10` : undefined }}
        />
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE CARD (compact glass card for slider)
   ═══════════════════════════════════════════════════════ */
function MarqueeCard({ blog }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handle = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex-shrink-0 w-[280px] sm:w-[340px] rounded-[18px] overflow-hidden cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="relative rounded-[18px] overflow-hidden bg-slate-50 dark:bg-[#0a1225]/90 border border-slate-200 dark:border-white/[0.04] transition-colors duration-300"
        style={{
          borderColor: hovered ? `${C.primary}40` : undefined,
        }}
      >
        {/* Image strip */}
        <div className="relative h-[130px] overflow-hidden" style={{ position: "relative" }}>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
            sizes="340px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-[#0a1225]/90" />
          <span
            className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-slate-100/90 dark:bg-[#050816]/80 backdrop-blur-md border border-slate-200 dark:border-white/10"
            style={{ color: C.primary }}
          >
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 pt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-gray-600">{blog.readTime}</span>
            <PopularityBar score={blog.popularity} compact />
          </div>
          <h5
            className="text-[13px] font-bold leading-snug line-clamp-2 transition-colors duration-300 text-slate-900 dark:text-white"
            style={{ color: hovered ? C.primary : undefined }}
          >
            {blog.title}
          </h5>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none transition-shadow duration-400"
          style={{ boxShadow: hovered ? `0 12px 35px rgba(0,0,0,0.4), 0 0 20px ${C.primary}05` : "none" }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   INFINITE MARQUEE
   ═══════════════════════════════════════════════════════ */
function BlogMarquee() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const doubled = [...marqueeBlogs, ...marqueeBlogs];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex gap-5 py-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
        }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((blog, i) => (
          <MarqueeCard key={`${blog.id}-${i}`} blog={blog} />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
export default function BlogSection() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Uniform height for side cards */
  const uniformHeight = "h-auto sm:h-[160px]";

  return (
    <section ref={sectionRef} className="relative py-[clamp(2rem,4vw,4rem)] overflow-hidden bg-background transition-colors duration-300">
      <BlogBackground />

      {/* ═══ PREMIUM SECTION HEADER ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          initial={{ opacity: 0, y: 25 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >


          <div>
            {/* Large gradient heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
              From the{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: C.gradient }}>
                Innovation Lab
              </span>
            </h2>

            <p className="text-slate-600 dark:text-gray-500 text-sm sm:text-base max-w-lg leading-relaxed">
              Deep dives into AI, engineering, and digital strategy — curated by our team of industry experts.
            </p>

            {/* Animated line accent */}
            <motion.div
              className="mt-5 h-[2px] rounded-full"
              style={{ background: C.gradient }}
              initial={{ width: 0 }}
              animate={headerInView ? { width: 80 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* View all CTA */}
          <motion.a
            href="#"
            className="hidden lg:inline-flex items-center gap-3 px-7 py-3 rounded-full text-sm font-semibold cursor-pointer border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.02]"
            whileHover={{ scale: 1.04, borderColor: `${C.primary}30`, boxShadow: `0 0 25px ${C.primary}10` }}
            whileTap={{ scale: 0.97 }}
          >
            View All Articles
            <motion.svg
              className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>

      {/* ═══ MAGAZINE LAYOUT: Featured (60%) + Side Stack (40%) ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-[clamp(1rem,2vw,2rem)]">
        <div className="flex flex-col lg:flex-row gap-6" style={{ perspective: "1200px" }}>
          {/* Featured card — 60% */}
          <div className="lg:w-[58%] min-h-[auto] lg:min-h-[500px]">
            <FeaturedCard blog={featuredBlog} />
          </div>

          {/* Side stack — 40%, 3 asymmetric cards */}
          <div className="lg:w-[42%] flex flex-col gap-4">
            {sideBlogsData.map((blog, i) => (
              <SideCard key={blog.id} blog={blog} index={i} heightClass={uniformHeight} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HORIZONTAL INFINITE MARQUEE ═══ */}
      <div className="relative z-10 max-w-[100vw]">
        <motion.div
          className="mb-6 max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">More Stories</h3>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
            <motion.div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: `${C.primary}08`, border: `1px solid ${C.primary}15` }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.primary }} />
              <span className="text-[10px] font-semibold uppercase" style={{ color: C.primary }}>Auto-scroll</span>
            </motion.div>
          </div>
        </motion.div>

        <BlogMarquee />
      </div>

      {/* ═══ Mobile view-all ═══ */}
      <motion.div
        className="lg:hidden relative z-10 text-center mt-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.a
          href="#"
          className="inline-flex items-center gap-3 px-7 py-3 rounded-full text-sm font-semibold cursor-pointer border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.02]"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          View All Articles
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
