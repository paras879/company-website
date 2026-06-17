"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const articles = [
    { id: 1, title: "The Future of WebGL in Enterprise UI", category: "Design", date: "May 10, 2026", readTime: "5 min", excerpt: "Explore how next-generation WebGL and hardware acceleration are redefining visual fidelity and responsiveness in premium SaaS platforms.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Scaling PostgreSQL for 1M Requests/sec", category: "Backend", date: "May 08, 2026", readTime: "8 min", excerpt: "A deep dive into query optimizations, read replicas, and connection pooling techniques required to achieve high-throughput databases.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "React Native vs Flutter in 2026", category: "Mobile", date: "May 05, 2026", readTime: "6 min", excerpt: "An honest, developer-centric comparison of performance, ecosystem maturity, and hot reload capabilities of the top mobile SDKs.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Next.js App Router Masterclass", category: "Frontend", date: "May 02, 2026", readTime: "12 min", excerpt: "Master server components, parallel layouts, intercepting routes, and streaming responses to build lightning-fast web applications.", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Building a Design System from Scratch", category: "Design", date: "Apr 28, 2026", readTime: "7 min", excerpt: "How to translate design tokens, typography scales, and component libraries into a unified system that speeds up developer workflows.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "SEO Strategies for SPAs", category: "Marketing", date: "Apr 25, 2026", readTime: "4 min", excerpt: "Learn how modern search engines crawl JavaScript pages and how to set up metadata, dynamic sitemaps, and SSR to rank higher.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const categories = ["All", "Design", "Backend", "Mobile", "Frontend", "Marketing"];

export default function ArticleGrid() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = articles.filter(a => {
        const matchesCategory = activeFilter === "All" || a.category === activeFilter;
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-[clamp(1.5rem,5vw,5rem)] bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === cat ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/50" : "bg-transparent text-slate-600 dark:text-gray-400 border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input 
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 rounded-full py-2 pl-4 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 shadow-sm dark:shadow-none"
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredArticles.map((article) => (
                            <motion.article 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={article.id}
                                className="group flex flex-col h-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer shadow-sm dark:shadow-none"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex flex-col flex-grow p-5 md:p-6 lg:p-8">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">{article.category}</span>
                                        <span className="text-slate-500 dark:text-gray-500 text-xs">{article.readTime} read</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                                        <span className="text-slate-500 dark:text-gray-500 text-xs">{article.date}</span>
                                        <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Read Article
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-20 text-slate-500 dark:text-gray-500">
                        No articles found matching your criteria.
                    </div>
                )}
            </div>
        </section>
    );
}
