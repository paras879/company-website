"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  primary: "#06E6FF",
  secondary: "#3B82F6",
  accent: "#8B5CF6",
  navy: "#020617",
  gradient: "linear-gradient(135deg, #06E6FF, #3B82F6, #8B5CF6)",
};

/* ═══════════════════════════════════════════════════════
   CUSTOM SVG LOGOS
   ═══════════════════════════════════════════════════════ */
const Logos = [
  {
    name: "Supertech",
    svg: (
      <svg viewBox="0 0 120 30" className="h-7 w-auto fill-current">
        <path d="M15 5 L25 5 L20 15 L30 15 L15 28 L18 18 L8 18 Z" fill="url(#grad1)" />
        <text x="35" y="22" className="text-xl font-bold tracking-tight" fill="currentColor">Supertech</text>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.secondary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Aurobindo",
    svg: (
      <svg viewBox="0 0 120 30" className="h-7 w-auto fill-current">
        <circle cx="15" cy="15" r="10" fill="none" stroke="url(#grad2)" strokeWidth="3" />
        <circle cx="20" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <text x="38" y="22" className="text-xl font-bold tracking-wide" fill="currentColor">Aurobindo</text>
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.secondary} />
            <stop offset="100%" stopColor={C.accent} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Flaxley Tyres",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <path d="M10 5 Q 25 5 25 15 T 10 25 Z" fill="url(#grad3)" />
        <path d="M15 5 Q 30 5 30 15 T 15 25 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
        <text x="38" y="22" className="text-xl font-bold italic tracking-tighter" fill="currentColor">Flaxley Tyres</text>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.accent} />
            <stop offset="100%" stopColor={C.primary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "ExxonMobil",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <rect x="5" y="5" width="20" height="20" rx="4" fill="url(#grad4)" />
        <path d="M10 10 L20 20 M20 10 L10 20" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        <text x="35" y="22" className="text-xl font-bold tracking-normal" fill="currentColor">ExxonMobil</text>
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.accent} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "GoGuardian",
    svg: (
      <svg viewBox="0 0 140 30" className="h-7 w-auto fill-current">
        <path d="M15 2 L28 8 L28 20 Q15 28 15 28 Q2 20 2 8 Z" fill="url(#grad5)" />
        <circle cx="15" cy="13" r="4" fill="#020617" />
        <text x="36" y="22" className="text-xl font-bold tracking-tight" fill="currentColor">GoGuardian</text>
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.secondary} />
            <stop offset="100%" stopColor={C.primary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Vertex",
    svg: (
      <svg viewBox="0 0 110 30" className="h-7 w-auto fill-current">
        <path d="M5 25 L15 5 L25 25" fill="none" stroke="url(#grad6)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 15 L25 5 L35 25" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="40" y="22" className="text-xl font-bold uppercase tracking-widest" fill="currentColor">Vertex</text>
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.primary} />
            <stop offset="100%" stopColor={C.secondary} />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════ */
function Counter({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: C.gradient }}>
          {displayValue}
        </span>
        <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{suffix}</span>
      </div>
      <span className="text-sm text-slate-500 dark:text-gray-400 mt-2 uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PREMIUM LOGO CARD
   ═══════════════════════════════════════════════════════ */
function LogoCard({ logo }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouse = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex-shrink-0 w-[280px] h-[120px] rounded-2xl cursor-pointer"
      whileHover={{ scale: 1.05, z: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 bg-slate-50/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/[0.05]"
        style={{
          boxShadow: hovered ? `0 20px 40px -10px rgba(0,0,0,0.15)` : `0 4px 20px rgba(0,0,0,0.05)`,
        }}
      >
        {/* Animated border light */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            padding: "1px",
            background: `conic-gradient(from 0deg, ${C.primary}00 0%, ${C.primary}60 20%, ${C.secondary}80 40%, ${C.primary}00 60%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          animate={hovered ? { rotate: [0, 360] } : {}}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* Ambient glow beneath logo */}
        <motion.div
          className="absolute pointer-events-none z-0 rounded-full"
          style={{
            width: "80%",
            height: "80%",
            background: `radial-gradient(circle, ${C.primary}30, transparent 70%)`,
            filter: "blur(20px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Dynamic glare reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.1) 0%, transparent 50%)`
            ),
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Logo container */}
        <motion.div
          className="relative z-10 transition-colors duration-500 text-slate-500 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-white"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {logo.svg}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   INFINITE DRAGGABLE MARQUEE
   ═══════════════════════════════════════════════════════ */
function InfiniteMarquee() {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // We duplicate the logos array a few times to create a seamless loop
  const duplicatedLogos = [...Logos, ...Logos, ...Logos, ...Logos];

  // Manual animation loop
  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging) return;
    
    // Speed of auto-scroll
    let moveBy = 0.5 * (delta / 16);
    
    let newX = baseX.get() - moveBy;
    
    // Seamless wrapping logic
    // Assuming each card is ~280px + 32px gap = ~312px
    // 6 logos = 1872px per set. We wrap before we run out of content.
    // Wrap at a precise offset to make it seamless.
    const wrapOffset = -(Logos.length * 312); // Approximate width of one original set
    
    if (newX <= wrapOffset) {
      newX += Math.abs(wrapOffset);
    } else if (newX > 0) {
      newX -= Math.abs(wrapOffset);
    }
    
    baseX.set(newX);
  });

  return (
    <div className="relative overflow-hidden py-10 w-full" style={{ perspective: "1000px" }}>
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-8 px-4 cursor-grab active:cursor-grabbing w-max"
        style={{ x: baseX }}
        drag="x"
        dragConstraints={{ left: -3000, right: 3000 }} // Allow large drag space
        dragElastic={0.1}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {duplicatedLogos.map((logo, idx) => (
          <LogoCard key={`${logo.name}-${idx}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function TrustedClients() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        width: 2 + Math.random() * 2,
        height: 2 + Math.random() * 2,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        background: i % 2 === 0 ? C.primary : C.accent,
        duration: 8 + Math.random() * 5,
        delay: i * 0.5,
      }))
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 lg:py-20 overflow-hidden bg-background border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Aurora */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full opacity-[0.03]" style={{ background: `radial-gradient(ellipse, ${C.primary}, transparent 70%)`, filter: "blur(120px)" }} />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] rounded-full opacity-[0.03]" style={{ background: `radial-gradient(ellipse, ${C.accent}, transparent 70%)`, filter: "blur(120px)" }} />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-screen" style={{ backgroundImage: `linear-gradient(${C.primary}10 1px, transparent 1px), linear-gradient(90deg, ${C.primary}10 1px, transparent 1px)`, backgroundSize: "40px 40px", transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)" }} />
        
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.width, height: p.height, top: p.top, left: p.left, background: p.background }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: p.duration, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-[clamp(1rem,2vw,2rem)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >

          
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-foreground leading-tight mb-6 max-w-3xl">
            Powering digital transformation for startups, enterprises, and global organizations.
          </h2>
        </motion.div>

        {/* Live Counters */}
        <motion.div
          className="mt-10 md:mt-16 pt-8 md:pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Counter value={500} suffix="+" label="Projects Delivered" />
          <Counter value={120} suffix="+" label="Enterprise Clients" />
          <Counter value={98} suffix="%" label="Client Satisfaction" />
        </motion.div>
      </div>

      <div className="relative z-10 mt-10 md:mt-16">
        <InfiniteMarquee />
      </div>
    </section>
  );
}
