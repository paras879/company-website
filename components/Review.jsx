"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ── Testimonials Data ──
const TESTIMONIALS = [
    {
        id: "franklin",
        name: "Franklin Brice",
        role: "Director",
        company: "Alpha Digital",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        text: "Revamping my company's official website using Recenturesoft's SEO services did wonders for my website's online search engine ranking! It was a great experience working with a team of such flexible and responsive employees."
    },
    {
        id: "philip",
        name: "Philip Dixon",
        role: "Creative Director",
        company: "Vivid Studio",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
        text: "Recenturesoft has completely changed the appearance of my website in terms of the design and customisation options. They have given me something that I can be proud of."
    },
    {
        id: "timothy",
        name: "Timothy Rios",
        role: "Marketing Manager",
        company: "Nova Solutions",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        text: "My company's online search engine ranking improved marginally using Recenturesoft's SEO services. They did not take it as just another URL and worked on it with complete dedication. It was a great experience working with the team!"
    },
    {
        id: "sophia",
        name: "Sophia Alvarez",
        role: "Product Lead",
        company: "CloudSync",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        text: "The team delivered our SaaS dashboard two weeks ahead of schedule. The animations are fluid, the WebGL maps are extremely responsive, and the code architecture is clean. 10/10."
    },
    {
        id: "marcus",
        name: "Marcus Chen",
        role: "CTO",
        company: "NeuralFlow AI",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        text: "Recenturesoft restructured our legacy API pipeline into a lightning-fast serverless structure. Core latency dropped under 80ms globally. Their engineering capabilities are exceptional."
    },
    {
        id: "emily",
        name: "Emily Watson",
        role: "VP of Operations",
        company: "Zenith Retail",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        text: "From UI/UX redesign to automated deployments, their full-stack Laravel/React team exceeded our expectations. Our checkout conversion rates increased by 40% immediately."
    }
];

// Duplicate items 3 times for seamless continuous marquee looping
const DUPLICATED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function ReviewCard({ review, index, cardOffset, x, cardsRef }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]), { stiffness: 150, damping: 22 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]), { stiffness: 150, damping: 22 });

    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 22 });
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 150, damping: 22 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // GPU-accelerated calculations for center card focus (scale, opacity, blur)
    const cardX = useTransform(x, (latestX) => latestX + cardOffset);
    const scale = useTransform(cardX, [-450, 0, 450], [0.92, 1.06, 0.92]);
    const opacity = useTransform(cardX, [-450, 0, 450], [0.45, 1, 0.45]);
    const blurVal = useTransform(cardX, [-450, 0, 450], [2, 0, 2]);
    const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

    return (
        <div
            ref={(el) => {
                if (cardsRef) cardsRef.current[index] = el;
            }}
            className="testimonial-float-card flex-shrink-0"
            style={{ animationDelay: `${index * 0.4}s` }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    scale,
                    opacity,
                    filter,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: 1000
                }}
                whileHover={{
                    y: -12,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group w-[85vw] sm:w-[400px] md:w-[440px] relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950/50 dark:to-slate-950/20 backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] rounded-[28px] p-5 md:p-6 lg:p-8 flex flex-col justify-between cursor-pointer transition-colors duration-500 overflow-hidden select-none hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:shadow-premium dark:hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]" >
                    {/* Glowing border outline tracking mouse */ }
                    < motion.div
                    className="absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                        border: "1px solid transparent",
            backgroundImage: useTransform(
            [glowX, glowY],
                            ([gx, gy]) => `
            linear-gradient(transparent, transparent) padding-box,
            radial-gradient(140px circle at ${gx} ${gy}, rgba(6, 182, 212, 0.45), transparent 50%) border-box
            `
            )
                    }}
                />

            {/* Soft Cyan Glow Spot on Hover */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                    background: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) => `radial-gradient(200px circle at ${gx} ${gy}, rgba(6, 182, 212, 0.08), transparent 60%)`
                    )
                }}
            />

            {/* Quote and Stars */}
            <div style={{ transform: "translateZ(25px)" }} className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    {/* Stars */}
                    <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <svg key={i} className="w-4.5 h-4.5 text-cyan-400 fill-current drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    {/* Quote Icon */}
                    <svg className="w-8 h-8 text-cyan-500/20 group-hover:text-cyan-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 21c3 0 7-9 7-14h-5v-3h7v6c0 6-3 11-9 11zm11 0c3 0 7-9 7-14h-5v-3h7v6c0 6-3 11-9 11z" />
                    </svg>
                </div>

                <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8 select-text">
                    "{review.text}"
                </p>
            </div>

            {/* Author info */}
            <div style={{ transform: "translateZ(15px)" }} className="relative z-10 flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 dark:border-white/10 group-hover:border-cyan-500/70 dark:group-hover:border-cyan-400/70 transition-colors duration-500 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-md dark:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                <div>
                    <h4 className="text-slate-800 dark:text-gray-200 text-sm font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                        {review.name}
                    </h4>
                    <p className="text-slate-500 dark:text-gray-500 text-xs mt-0.5">
                        {review.role} <span className="text-cyan-600 dark:text-cyan-400 font-semibold ml-1">@{review.company}</span>
                    </p>
                </div>
            </div>
        </motion.div>
        </div >
    );
}

export default function Review() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const x = useMotionValue(0);
    const [W, setW] = useState(0);
    const [offsets, setOffsets] = useState(() => {
        // Safe initial layout offsets centered around index 9 to prevent layout shift on first frame
        return DUPLICATED_TESTIMONIALS.map((_, idx) => (idx - 9) * 464);
    });

    const speed = 1.5; // Increased scroll speed for fast, premium right-to-left marquee motion

    // Sync state values to refs for the requestAnimationFrame tick loop
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const WRef = useRef(0);

    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    useEffect(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging]);

    useEffect(() => {
        WRef.current = W;
    }, [W]);

    // Measure card widths and calculate looping boundary W
    useEffect(() => {
        const updateWidth = () => {
            if (cardsRef.current[0]) {
                const cardWidth = cardsRef.current[0].getBoundingClientRect().width;
                const computedW = (cardWidth + 24) * TESTIMONIALS.length; // 24px is gap-6 spacing
                setW(computedW);
            }
        };

        const timer = setTimeout(updateWidth, 100);
        window.addEventListener("resize", updateWidth);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    // Recalculate precise card center offsets relative to the viewport center
    useEffect(() => {
        if (W === 0) return;
        const calcOffsets = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const newOffsets = cardsRef.current.map((card) => {
                if (!card) return 0;
                const cardWidth = card.getBoundingClientRect().width;
                return card.offsetLeft + cardWidth / 2 - containerWidth / 2;
            });
            setOffsets(newOffsets);
        };
        const timer = setTimeout(calcOffsets, 100);
        return () => clearTimeout(timer);
    }, [W]);

    // Continuous marquee tick loop driven by requestAnimationFrame (pauses on hover)
    useEffect(() => {
        let animationFrameId;

        const tick = () => {
            if (WRef.current > 0) {
                if (!isHoveredRef.current && !isDraggingRef.current) {
                    let currentX = x.get();
                    currentX -= speed;
                    if (currentX <= -WRef.current) {
                        currentX += WRef.current;
                    }
                    x.set(currentX);
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        };

        animationFrameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrameId);
    }, [x]);

    // Seamlessly normalize x position after user releases drag gesture
    const handleDragEnd = () => {
        isDraggingRef.current = false;
        setIsDragging(false);

        if (WRef.current > 0) {
            let currentX = x.get();
            const remainder = currentX % WRef.current;
            let normalizedX = remainder;
            if (normalizedX > 0) {
                normalizedX -= WRef.current;
            }
            x.set(normalizedX);
        }
    };

    // Stagger reveal animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    return (
        <section className="relative pt-[clamp(1.5rem,4vw,4.5rem)] pb-0 bg-background transition-colors duration-300 overflow-hidden select-none border-t border-slate-200 dark:border-white/5">
            {/* Inject organic card floating CSS animation */}
            <style>{`
                @keyframes testimonial-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-7px); }
                }
                .testimonial-float-card {
                    animation: testimonial-float 6s ease-in-out infinite;
                }
            `}</style>

            {/* Glowing Accent Spotlights */}
            <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-cyan-100/50 dark:bg-cyan-950/15 blur-[100px] md:blur-[130px] rounded-full pointer-events-none transition-colors duration-300" />
            <div className="absolute bottom-1/3 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-100/50 dark:bg-purple-950/15 blur-[100px] md:blur-[130px] rounded-full pointer-events-none transition-colors duration-300" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-6 md:mb-10">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mt-2 tracking-tight leading-[1.15]">
                        What Our Clients Say
                        <span className="block bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mt-1.5">
                            About RecentureSoft
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed font-light">
                        We partner with industry-leading brands and fast-growing startups to craft next-generation engineering architectures.
                    </p>
                </motion.div>
            </motion.div>

            {/* Testimonials Carousel Container */}
            <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full overflow-hidden py-10 cursor-grab active:cursor-grabbing select-none"
            >
                {/* Side gradient blur masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-64 bg-gradient-to-r from-background via-background/75 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-64 bg-gradient-to-l from-background via-background/75 to-transparent z-20 pointer-events-none" />

                <motion.div
                    drag="x"
                    dragConstraints={{ left: W ? -W * 2 : -2000, right: 0 }}
                    style={{ x }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    className="flex gap-6 w-max pl-[15vw] pr-[15vw]"
                >
                    {DUPLICATED_TESTIMONIALS.map((review, idx) => (
                        <ReviewCard
                            key={`${review.id}-${idx}`}
                            review={review}
                            index={idx}
                            cardOffset={offsets[idx] || 0}
                            x={x}
                            cardsRef={cardsRef}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
