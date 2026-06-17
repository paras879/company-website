"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

// ==========================================
// IMAGE PLACEHOLDERS
// ==========================================
const IMAGES = {
    hero: "/images/events/hero.jpg",
    featured: "/images/events/featured.jpg",
    bento: [
        "/images/events/bento_0.jpg",
        "/images/events/bento_1.jpg",
        "/images/events/bento_2.jpg",
        "/images/events/bento_3.jpg",
        "/images/events/bento_4.jpg"
    ],
    videoThumb: "/images/events/video_thumb.jpg",
    marquee: [
        "/images/events/marquee_0.jpg",
        "/images/events/marquee_1.jpg",
        "/images/events/marquee_2.jpg",
        "/images/events/marquee_3.jpg",
        "/images/events/bento_0.jpg" // Fallback since marquee_4 failed
    ],
    testimonials: [
        "/images/events/testimonial_0.jpg",
        "/images/events/testimonial_1.jpg",
        "/images/events/testimonial_2.jpg"
    ]
};

// ==========================================
// SECTION 1: HERO
// ==========================================
function EventsHero() {
    const [particles, setParticles] = useState([]);
    useEffect(() => {
        setParticles(
            [...Array(20)].map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 5,
            }))
        );
    }, []);

    return (
        <section className="relative min-h-[auto] lg:min-h-[50vh] w-full flex flex-col items-center justify-center pt-20 md:pt-24 lg:pt-28 pb-10 md:pb-14 lg:pb-20 overflow-hidden bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            {/* Particles & Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />

                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
                        style={{
                            top: p.top,
                            left: p.left,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[clamp(2rem,6vw,5rem)] font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6 leading-none"
                >
                    Life At <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                        RecentureSoft
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6 md:mb-8"
                >
                    Experience the passion, innovation, and global collaboration that drives our engineering teams to build the future.
                </motion.p>
            </div>
        </section>
    );
}


// ==========================================
// SECTION 2: FEATURED EVENT
// ==========================================
function FeaturedEvent() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left - width / 2) / 25);
        mouseY.set((clientY - top - height / 2) / 25);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 flex justify-center transition-colors duration-300">
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX: mouseY, rotateY: mouseX }}
                className="relative w-full max-w-7xl h-[320px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                    <Image src={IMAGES.featured} alt="Featured Event" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-5 md:p-6 lg:p-8 w-full flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-tight">
                            Annual Global <br /> Tech Meetup 2026
                        </h2>
                        <div className="flex items-center gap-4 text-slate-300 font-medium">
                            <span>📅 December 15, 2026</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <span>📍 Dubai, UAE</span>
                        </div>
                    </div>

                    <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold transition-all group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                        View Gallery
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

// ==========================================
// SECTION 3: EVENT BENTO GALLERY
// ==========================================
function BentoCard({ src, colSpan, rowSpan, title, date }) {
    return (
        <motion.div
            className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm dark:shadow-none ${colSpan} ${rowSpan}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, zIndex: 10 }}
        >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image src={src} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Animated Gradient Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-3xl transition-colors duration-500" />

            <div className="absolute bottom-0 left-0 p-4 md:p-6 lg:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-cyan-400 font-medium">{date}</p>
            </div>
        </motion.div>
    );
}

function EventBentoGallery() {
    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
                <div className="flex flex-col gap-3 text-center items-center">
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-slate-900 dark:text-white">Moments <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Captured</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-[clamp(0.9rem,1.5vw,1.1rem)]">A glimpse into our collaborative workspaces, team celebrations, and global initiatives.</p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[300px] gap-4 md:gap-5 lg:gap-6">
                    <BentoCard src={IMAGES.bento[0]} colSpan="md:col-span-2 lg:col-span-2" rowSpan="md:row-span-1 lg:row-span-2" title="Hackathon 2026" date="October" />
                    <BentoCard src={IMAGES.bento[1]} colSpan="md:col-span-1 lg:col-span-2" rowSpan="row-span-1" title="Product Launch" date="September" />
                    <BentoCard src={IMAGES.bento[2]} colSpan="md:col-span-1 lg:col-span-1" rowSpan="row-span-1" title="Diwali Celebration" date="November" />
                    <BentoCard src={IMAGES.bento[3]} colSpan="md:col-span-2 lg:col-span-1" rowSpan="row-span-1" title="AI Workshop" date="August" />
                    <BentoCard src={IMAGES.bento[4]} colSpan="md:col-span-3 lg:col-span-4" rowSpan="row-span-1" title="Global Awards Night" date="December" />
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 4: EVENT TIMELINE
// ==========================================
const TIMELINE_EVENTS = [
    { year: "2026", title: "Global Team Retreat", desc: "Our teams from 5 countries gathered for a massive synergy event." },
    { year: "2025", title: "Series B Celebration", desc: "Celebrating our massive growth phase with the entire engineering crew." },
    { year: "2024", title: "Women's Day Summit", desc: "Empowering our female leaders across the technology landscape." },
    { year: "2023", title: "First Office Inauguration", desc: "The foundation of RecentureSoft's core engineering hub." },
];

function EventTimeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section ref={ref} className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto relative">
                {/* Animated Center Line */}
                <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full transform md:-translate-x-1/2" />
                <motion.div
                    className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full transform md:-translate-x-1/2 origin-top"
                    style={{ scaleY }}
                />

                <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
                    {TIMELINE_EVENTS.map((item, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} pl-12 md:pl-0`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-[24px] md:left-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-50 dark:border-[#020617] shadow-[0_0_15px_rgba(6,182,212,0.8)] transform -translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                                {/* Content Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`w-full md:w-[45%] flex flex-col gap-3 p-4 md:p-6 lg:p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none ${isEven ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-sm">{item.year}</span>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </motion.div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 5: CULTURE STATS
// ==========================================
function CultureStats() {
    const stats = [
        { num: "500+", label: "Projects Delivered" },
        { num: "120+", label: "Global Clients" },
        { num: "98%", label: "Client Satisfaction" },
        { num: "24/7", label: "Enterprise Support" }
    ];

    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 border-y border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-screen dark:mix-blend-screen" />
            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:bg-slate-50 dark:hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group shadow-sm dark:shadow-none"
                    >
                        <span className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{stat.num}</span>
                        <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium tracking-wide text-center">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ==========================================
// SECTION 6: VIDEO REEL PREVIEW
// ==========================================
function VideoReelPreview() {
    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 flex justify-center transition-colors duration-300">
            <motion.div
                className="relative w-full max-w-6xl h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Image src={IMAGES.videoThumb} alt="Culture Reel" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all duration-500">
                        <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ==========================================
// SECTION 7: INFINITE MARQUEE
// ==========================================
function InfiniteEventMarquee() {
    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-300">
            <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-[200%]">
                {[...IMAGES.marquee, ...IMAGES.marquee].map((src, i) => (
                    <div key={i} className="relative w-[300px] md:w-[400px] h-[250px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                        <Image src={src} alt="Event" fill sizes="400px" className="object-cover" />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}

// ==========================================
// SECTION 8: TESTIMONIALS
// ==========================================
function EmployeeTestimonials() {
    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
                <div className="text-center">
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-slate-900 dark:text-white mb-3 md:mb-4">Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-600 dark:from-purple-400 dark:to-cyan-500">Team</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="p-4 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
                        >
                            <div className="text-cyan-500 dark:text-cyan-400 mb-6 text-4xl">"</div>
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 line-clamp-4">
                                "Joining RecentureSoft was the best career move. The events, the global culture, and the absolute focus on engineering excellence makes every day exciting."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                    <Image src={IMAGES.testimonials[i]} alt="Employee" fill sizes="48px" className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-slate-900 dark:text-white font-bold">Sarah Jenkins</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Senior Cloud Architect</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// SECTION 9: CTA
// ==========================================
function EventsCTA() {
    return (
        <section className="relative w-full py-10 md:py-14 lg:py-20 bg-slate-50 dark:bg-[#020617] px-6 lg:px-12 overflow-hidden flex justify-center transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-50 dark:to-cyan-950/20 pointer-events-none" />
            <motion.div
                className="relative z-10 max-w-4xl w-full p-5 md:p-10 lg:p-16 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl text-center flex flex-col items-center gap-6 md:gap-8 shadow-sm dark:shadow-none"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Want To Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Future</span> With Us?
                </h2>
                <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-slate-600 dark:text-slate-400 max-w-xl">
                    Whether you're looking to join our engineering teams or partner with us for your next digital transformation, we're ready.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                        Join Our Team
                    </button>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-sm hover:-translate-y-1">
                        Contact Us
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

// ==========================================
// MAIN EXPORT ASSEMBLY
// ==========================================
export default function CinematicEvents() {
    return (
        <div className="w-full flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <EventsHero />
            <FeaturedEvent />
            <EventBentoGallery />
            <EventTimeline />
            <CultureStats />
            <VideoReelPreview />
            <InfiniteEventMarquee />
            <EmployeeTestimonials />
            <EventsCTA />
        </div>
    );
}
