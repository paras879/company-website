"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    { id: 1, title: "FinTech Dashboard", category: "Web App", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", metrics: "+40% Conversion" },
    { id: 2, title: "Global Logistics API", category: "Backend", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", metrics: "10x Faster API" },
    { id: 3, title: "Healthcare Portal", category: "Mobile", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", metrics: "1M+ Users" },
    { id: 4, title: "E-Commerce Replatform", category: "Web App", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", metrics: "0.8s Load Time" }
];

const categories = ["All", "Web App", "Mobile", "Backend"];

export default function ProjectGallery() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = projects.filter(p => activeFilter === "All" || p.category === activeFilter);

    return (
        <section className="py-14 md:py-20 lg:py-28 bg-background relative transition-colors duration-300">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1200px] xl:max-w-[1400px]">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.6rem] lg:text-[3rem] font-[600] text-foreground tracking-[-0.03em] leading-tight">Selected Works</h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 p-2 bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-xl w-full md:max-w-[600px] lg:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 md:px-5 py-2.5 text-xs md:text-sm rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeFilter === cat ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25" : "text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={project.id}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all duration-500 shadow-premium dark:shadow-none"
                            >
                                {/* Image */}
                                <div className="h-[280px] sm:h-[340px] md:h-[320px] lg:h-[450px] w-full relative">
                                    <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-20 flex flex-col justify-end p-5 md:p-5 lg:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-3 lg:gap-4">
                                        <div>
                                            <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                                            <h3 className="text-xl md:text-[1.5rem] lg:text-3xl font-bold text-foreground mb-2">{project.title}</h3>
                                        </div>
                                        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-3 md:px-3 py-1.5 md:py-1.5 lg:px-4 lg:py-2 rounded-full border border-white dark:border-white/20">
                                            <span className="text-slate-800 dark:text-white text-xs md:text-sm font-semibold">{project.metrics}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
