"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import AIAvatar from "./AIAvatar";

const CATEGORIES = [
    { label: "Website Development", value: "web" },
    { label: "Mobile App Development", value: "mobile" },
    { label: "AI Solutions", value: "ai" },
    { label: "Cloud Services", value: "cloud" },
    { label: "UI/UX Design", value: "design" },
    { label: "Project Cost Estimation", value: "cost" },
    { label: "Talk to Sales", value: "sales" }
];

const FLOWS = {
    home: {
        message: "How else can we help you today?",
        options: [
            { label: "Website Development", value: "web" },
            { label: "Mobile App Development", value: "mobile" },
            { label: "AI Solutions", value: "ai" },
            { label: "Cloud Services", value: "cloud" },
            { label: "UI/UX Design", value: "design" },
            { label: "Project Cost Estimation", value: "cost" },
            { label: "Talk to Sales", value: "sales" }
        ]
    },
    web: {
        message: "Great! What type of website are you looking to build?",
        options: [
            { label: "E-Commerce", next: "budget" },
            { label: "Corporate Site", next: "budget" },
            { label: "Web Application (SaaS)", next: "budget" },
            { label: "Not sure yet", next: "budget" }
        ]
    },
    mobile: {
        message: "Awesome. Which platform are you targeting?",
        options: [
            { label: "iOS (Apple)", next: "budget" },
            { label: "Android", next: "budget" },
            { label: "Cross-platform (Both)", next: "budget" }
        ]
    },
    ai: {
        message: "AI is our specialty. What is your primary goal?",
        options: [
            { label: "Automate Workflows", next: "budget" },
            { label: "Custom Chatbot", next: "budget" },
            { label: "Predictive Analytics", next: "budget" },
            { label: "Need Advice", next: "sales" }
        ]
    },
    budget: {
        message: "To give you the best recommendation, what is your estimated budget?",
        options: [
            { label: "< $10k", next: "timeline" },
            { label: "$10k - $50k", next: "timeline" },
            { label: "$50k+", next: "timeline" },
            { label: "Not sure", next: "timeline" }
        ]
    },
    timeline: {
        message: "Got it. When do you need this completed?",
        options: [
            { label: "ASAP", next: "sales" },
            { label: "1-3 Months", next: "sales" },
            { label: "3-6 Months", next: "sales" },
            { label: "Just researching", next: "sales" }
        ]
    },
    sales: {
        message: "Perfect. Let's get you connected with our senior technical team to discuss the exact requirements.",
        options: [
            { label: "Schedule Meeting", next: "handoff" },
            { label: "Request Proposal", next: "handoff" },
            { label: "Contact Team", next: "handoff" }
        ]
    },
    handoff: {
        message: "Thank you! Please provide your email address so our team can reach out to you directly.",
        options: [] // Expecting text input here
    }
};

export default function ChatInterface({ onClose, isMinimized, onToggleMinimize }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const saved = localStorage.getItem("recenture_ai_chat_history");
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setMessages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse chat history");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("recenture_ai_chat_history", JSON.stringify(messages));
        }
    }, [messages, isLoaded]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`;
        }
    }, [input]);

    useEffect(() => {
        if (isLoaded && messages.length === 0) {
            setIsStreaming(true);
            const t1 = setTimeout(() => {
                setMessages([{ role: "assistant", content: "Hello 👋" }]);
            }, 600);
            const t2 = setTimeout(() => {
                setMessages(prev => [...prev, { role: "assistant", content: "Welcome to RecentureSoft." }]);
            }, 1800);
            const t3 = setTimeout(() => {
                setMessages(prev => [...prev, { 
                    role: "assistant", 
                    content: "How can I help you today?",
                    options: [
                        { label: "🚀 Get Project Quote", value: "budget" },
                        { label: "💼 Explore Services", value: "home" },
                        { label: "🤖 AI Consultation", value: "ai" },
                        { label: "📅 Schedule Meeting", value: "sales" },
                        { label: "📞 Contact Team", value: "sales" }
                    ]
                }]);
                setIsStreaming(false);
            }, 3200);
            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, [isLoaded, messages.length === 0]);

    const startNewChat = () => {
        setMessages([]);
        setIsStreaming(false);
        setInput("");
        if (typeof window !== "undefined") {
            localStorage.removeItem("recenture_ai_chat_history");
        }
    };

    const triggerFlow = (flowId, userText) => {
        if (userText) {
            setMessages(prev => [...prev, { role: "user", content: userText }]);
        }
        
        setTimeout(() => {
            const flow = FLOWS[flowId];
            if (flow) {
                setMessages(prev => [...prev, { 
                    role: "assistant", 
                    content: flow.message,
                    options: flow.options
                }]);
            }
        }, 500);
    };

    const handleOptionSelect = (option) => {
        if (option.value && FLOWS[option.value]) {
            triggerFlow(option.value, option.label);
        } else if (option.next && FLOWS[option.next]) {
            triggerFlow(option.next, option.label);
        } else {
            // Fallback for options that don't have a direct flow mapped
            handleSend(option.label);
        }
    };

    // Very basic intent router for free text
    const routeIntent = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes("website") || lower.includes("web")) return "web";
        if (lower.includes("app") || lower.includes("mobile") || lower.includes("ios")) return "mobile";
        if (lower.includes("ai") || lower.includes("bot")) return "ai";
        if (lower.includes("cost") || lower.includes("price") || lower.includes("budget")) return "budget";
        if (lower.includes("talk") || lower.includes("human") || lower.includes("sales")) return "sales";
        return null;
    };

    const handleSend = async (text = input) => {
        if (!text.trim() || isStreaming) return;
        
        const userMsg = { role: "user", content: text };
        setMessages(prev => {
            // Remove options from the last AI message so they can't be clicked again
            const newMessages = [...prev];
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === "assistant") {
                newMessages[newMessages.length - 1].options = [];
            }
            return [...newMessages, userMsg];
        });
        
        setInput("");
        
        // Check for specific handoff state
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.content.includes("email address")) {
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    role: "assistant", 
                    content: "Got it. Our team will contact you at that address shortly. Is there anything else you'd like to add regarding your requirements?",
                    options: [{ label: "No, that's all", next: "home" }]
                }]);
            }, 600);
            return;
        }

        // Try to route intent first
        const intent = routeIntent(text);
        if (intent) {
            triggerFlow(intent);
            return;
        }

        // Fallback to Gemini API if no direct flow matches
        setIsStreaming(true);
        const newMessages = [...messages, userMsg];
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }) // strip out options for API
            });

            if (!response.ok) throw new Error("API Response Error");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let aiText = "";

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });
                aiText += chunkValue;

                setMessages(prev => {
                    const latest = [...prev];
                    latest[latest.length - 1] = { ...latest[latest.length - 1], content: aiText };
                    return latest;
                });
            }
            
            // Append general guided options after a free-text response to keep the user in the funnel
            setMessages(prev => {
                const latest = [...prev];
                latest[latest.length - 1].options = [
                    { label: "Book Consultation", next: "sales" },
                    { label: "Estimate Cost", next: "budget" }
                ];
                return latest;
            });

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => {
                const latest = [...prev];
                latest[latest.length - 1].content = "I'm currently unable to connect. Please try again or talk to sales.";
                latest[latest.length - 1].options = [{ label: "Talk to Sales", next: "sales" }];
                return latest;
            });
        } finally {
            setIsStreaming(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-gray-200 transition-colors duration-300 relative font-sans overflow-hidden">
            
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-3 md:px-4 py-2 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors group" title="Close">
                        <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0f172a] dark:to-[#020617] border border-slate-200 dark:border-white/10 shadow-inner">
                            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[2px]" />
                            <AIAvatar isThinking={isStreaming} />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-medium text-sm tracking-wide leading-tight">Recenture AI</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-1">
                    <button onClick={startNewChat} className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors" title="Restart">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            {!isMinimized && (
                <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="p-4 max-w-3xl mx-auto w-full pb-32">
                        {messages.map((msg, idx) => (
                            <MessageBubble 
                                key={idx} 
                                message={msg} 
                                isLatest={idx === messages.length - 1} 
                                onOptionSelect={handleOptionSelect}
                            />
                        ))}
                        {isStreaming && messages.length === 0 && (
                            <div className="flex flex-col items-start w-full mb-3 md:mb-4">
                                <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl p-3 md:p-4 rounded-tl-sm shadow-sm dark:shadow-none backdrop-blur-sm">
                                    <div className="flex gap-1 h-4 items-center">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Input Area (Secondary, compact) */}
            {!isMinimized && (
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-slate-50 via-slate-50 dark:from-[#020617] dark:via-[#020617] to-transparent pt-6 md:pt-8">
                    <div className="max-w-3xl mx-auto">
                        <form 
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-end bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none rounded-xl overflow-hidden focus-within:border-cyan-500/40 focus-within:ring-1 focus-within:ring-cyan-500/40 transition-all"
                        >
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type a reply..."
                                className="flex-1 bg-transparent text-slate-800 dark:text-gray-300 text-[13px] md:text-sm px-3 py-2 md:px-4 md:py-3 resize-none focus:outline-none max-h-24 min-h-[40px] md:min-h-[44px]"
                                rows={1}
                            />
                            
                            <div className="flex items-center px-1.5 py-1.5 shrink-0 h-[40px] md:h-[44px]">
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isStreaming}
                                    className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-cyan-600 text-white disabled:opacity-30 disabled:bg-gray-600 hover:bg-cyan-500 transition-colors shadow-sm"
                                >
                                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
