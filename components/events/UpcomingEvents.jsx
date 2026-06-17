"use client";

import { motion } from "framer-motion";

const events = [
    { id: 1, type: "Webinar", title: "Mastering Cloud-Native Microservices", date: "June 15, 2026", time: "10:00 AM EST", location: "Online", speakers: "Dr. Elena Rostova", color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-cyan-500/30" },
    { id: 2, type: "Conference", title: "Enterprise AI Summit 2026", date: "July 22, 2026", time: "9:00 AM EST", location: "New York, NY", speakers: "Industry Leaders", color: "from-purple-500/20 to-indigo-500/20", borderColor: "border-purple-500/30" },
    { id: 3, type: "Workshop", title: "Advanced React Three Fiber", date: "August 05, 2026", time: "2:00 PM EST", location: "Online", speakers: "Creative Tech Team", color: "from-emerald-500/20 to-teal-500/20", borderColor: "border-emerald-500/30" }
];

export default function UpcomingEvents() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1000px]">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-[clamp(2rem,3vw,3rem)] font-extrabold text-slate-900 dark:text-white">Upcoming Events</h2>
                    <button className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-slate-900 dark:hover:text-white transition-colors">View All &rarr;</button>
                </div>

                <div className="flex flex-col gap-8">
                    {events.map((event, index) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className={`relative bg-gradient-to-r ${event.color} border ${event.borderColor} p-8 lg:p-10 rounded-3xl backdrop-blur-xl group hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-colors" />
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-black/5 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider rounded-full border border-black/10 dark:border-white/20 mb-4">
                                        {event.type}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{event.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-slate-600 dark:text-gray-300 text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-start md:items-end gap-4">
                                    <p className="text-slate-600 dark:text-gray-400 text-sm">Speaker: <span className="text-slate-900 dark:text-white font-semibold">{event.speakers}</span></p>
                                    <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors shadow-lg">
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
