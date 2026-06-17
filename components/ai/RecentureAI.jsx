"use client";

if (typeof window !== 'undefined') {
    const originalWarn = console.warn;
    console.warn = function (...args) {
        if (typeof args[0] === 'string' && args[0].indexOf('THREE.Clock') !== -1) return;
        originalWarn.apply(console, args);
    };
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "./ChatInterface";

export default function RecentureAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1200);

    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);

        // First visit welcome trigger
        let welcomeTimeout;
        let hideTimeout;
        const dismissed = localStorage.getItem("recenture_ai_welcome_dismissed");
        if (!dismissed) {
            welcomeTimeout = setTimeout(() => {
                setShowWelcome(true);
                // Auto-hide after 8 seconds
                hideTimeout = setTimeout(() => {
                    setShowWelcome(false);
                }, 8000);
            }, 2000);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(welcomeTimeout);
            clearTimeout(hideTimeout);
        };
    }, []);

    const handleStartChat = () => {
        setIsOpen(true);
        setShowWelcome(false);
        localStorage.setItem("recenture_ai_welcome_dismissed", "true");
    };

    const handleDismissWelcome = () => {
        setShowWelcome(false);
        localStorage.setItem("recenture_ai_welcome_dismissed", "true");
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
            <AnimatePresence>
                {/* First-time Welcome Experience Popup */}
                {showWelcome && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-4 w-[280px] sm:w-[320px] p-5 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl relative text-left"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleDismissWelcome}
                            className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>👋</span> Welcome to RecentureSoft
                            </h4>
                            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex flex-col gap-1.5 mt-1">
                                <p className="font-semibold">Hi there! I'm your AI Assistant.</p>
                                <p>How may I help you today?</p>
                                <ul className="list-disc pl-4 space-y-0.5 text-slate-500 dark:text-slate-400 font-medium">
                                    <li>Explore our Services</li>
                                    <li>Get a Project Estimate</li>
                                    <li>Schedule a Consultation</li>
                                    <li>Learn about our Technologies</li>
                                </ul>
                            </div>

                            <div className="flex gap-2.5 mt-3.5">
                                <button
                                    onClick={handleStartChat}
                                    className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all text-center"
                                >
                                    Start Chat
                                </button>
                                <button
                                    onClick={handleDismissWelcome}
                                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? "auto" : windowWidth < 768 ? "min(500px, 65vh)" : windowWidth < 1024 ? "600px" : "min(720px, 85vh)",
                            width: isMinimized ? "300px" : windowWidth < 768 ? "min(250px, calc(100vw - 32px))" : windowWidth < 1024 ? "400px" : "450px"
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="mb-4 bg-slate-50/90 dark:bg-white/[0.03] backdrop-blur-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl rounded-3xl overflow-hidden flex flex-col origin-bottom-right"
                    >
                        <ChatInterface
                            onClose={() => setIsOpen(false)}
                            isMinimized={isMinimized}
                            onToggleMinimize={() => setIsMinimized(!isMinimized)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <div className="relative group">
                {/* Pulse Ring (visible only when chat is closed) */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping pointer-events-none scale-105" style={{ animationDuration: '3s' }} />
                )}

                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        if (showWelcome) setShowWelcome(false);
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/25 relative flex items-center justify-center transition-all duration-300 border border-white/10"
                >
                    <div className="w-full h-full bg-white dark:bg-[#090d16] rounded-full flex items-center justify-center relative overflow-hidden transition-colors duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

                        {isOpen ? (
                            <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                <line x1="12" x2="12" y1="19" y2="22"/>
                            </svg>
                        )}
                    </div>
                </motion.button>

                {/* Hover Tooltip (Desktop Only) */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:block px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold tracking-wide shadow-md whitespace-nowrap select-none pointer-events-none transition-all">
                    AI Assistant
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-slate-900" />
                </div>
            </div>
        </div>
    );
}
