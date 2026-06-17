"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ message, isLatest, onOptionSelect }) {
    const isAi = message.role === "assistant";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col w-full ${isAi ? "items-start" : "items-end"} mb-3 md:mb-4`}
        >
            <div 
                className={`
                    max-w-[90%] md:max-w-[85%] text-[14px] md:text-[15px] font-normal
                    ${isAi 
                        ? "text-slate-800 dark:text-gray-200" 
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl px-3 py-2 md:px-4 md:py-2.5 shadow-md rounded-tr-sm"}
                `}
            >
                {isAi ? (
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl p-3 md:p-4 rounded-tl-sm shadow-sm dark:shadow-none backdrop-blur-sm">
                        <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none leading-snug md:leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                            {/* Typing indicator if empty and latest */}
                            {isLatest && !message.content && (
                                <div className="flex gap-1 mt-2 h-4 items-center">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>{message.content}</p>
                )}
            </div>

            {/* Render Guided Options if present */}
            {isAi && message.options && message.options.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3 ml-1 md:ml-2"
                >
                    {message.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => onOptionSelect(opt)}
                            className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-[#0f172a] dark:hover:bg-[#1e293b] border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl text-[13px] md:text-sm font-medium text-cyan-700 dark:text-cyan-300 transition-all shadow-sm flex items-center gap-1.5 md:gap-2"
                        >
                            {opt.label}
                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}
