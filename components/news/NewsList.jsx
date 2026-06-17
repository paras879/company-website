"use client";

import { motion } from "framer-motion";

const newsItems = [
    { id: 1, date: "May 20, 2026", type: "Press Release", title: "RecentureSoft Acquiring Stellar AI to Expand Machine Learning Offerings", link: "#" },
    { id: 2, date: "April 15, 2026", type: "Company News", title: "Announcing Our New European Headquarters in London", link: "#" },
    { id: 3, date: "March 10, 2026", type: "Award", title: "RecentureSoft Recognized as Top Enterprise Development Agency 2026", link: "#" },
    { id: 4, date: "February 28, 2026", type: "Product Launch", title: "Introducing Nexus: The Ultimate API Gateway for FinTech", link: "#" },
    { id: 5, date: "January 15, 2026", type: "Press Release", title: "Q4 2025 Financial Results Exceed All Expectations", link: "#" }
];

export default function NewsList() {
    return (
        <section className="py-[clamp(1.5rem,5vw,5rem)] bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="mb-6 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-[clamp(1.8rem,4vw,3rem)] font-semibold md:font-extrabold text-slate-900 dark:text-white mb-2 md:mb-4">Latest Announcements</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm md:text-lg font-normal">Stay up to date with our company milestones and press releases.</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {newsItems.map((item, index) => (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="block bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 md:p-6 lg:p-8 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 group shadow-sm dark:shadow-none"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                                        <span className="text-emerald-400 text-xs md:text-sm font-semibold">{item.date}</span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                        <span className="text-slate-500 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wider">{item.type}</span>
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium md:font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors leading-snug">{item.title}</h3>
                                </div>
                                <div className="shrink-0 self-start w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all">
                                    <svg className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-6 md:mt-10 lg:mt-12 text-center">
                    <button className="px-8 py-3 bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        Load More Announcements
                    </button>
                </div>
            </div>
        </section>
    );
}
