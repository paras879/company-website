"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";


export default function PremiumFooter() {
    return (
        <footer className="relative bg-slate-50 dark:bg-[#020617] pt-10 md:pt-14 lg:pt-20 pb-8 md:pb-12 lg:pb-16 border-t border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-600/20 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-8 lg:gap-8 mb-6 md:mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
                                RECENTURE<span className="text-cyan-500 dark:text-cyan-400">SOFT</span>
                            </span>
                        </Link>
                        <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed mb-8 max-w-sm">
                            Engineering extraordinary digital experiences. We partner with visionaries to build high-performance software, web, and mobile solutions.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-12 h-12 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaFacebookF size={18} />
                            </a>

                            <a className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaTwitter size={18} />
                            </a>

                            <a className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaLinkedinIn size={18} />
                            </a>

                            <a className="w-12 h-12 rounded-full bg-[#E60023] flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaPinterestP size={18} />
                            </a>

                            <a className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaInstagram size={18} />
                            </a>

                            <a className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-all">
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 md:mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-2 md:space-y-4">
                            {["About Us", "Portfolio", "Careers", "News", "Contact"].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(" ", "")}`} className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors text-sm font-light">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-6 tracking-wide">Services</h4>
                        <ul className="space-y-2 md:space-y-4">
                            {["Software Dev", "Web Development", "Mobile Apps", "UI/UX Design", "Marketing"].map((link) => (
                                <li key={link}>
                                    <Link href="/solutions" className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors text-sm font-light">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-6 tracking-wide">Newsletter</h4>
                        <p className="text-slate-500 dark:text-gray-400 text-sm font-light mb-2 md:mb-4 leading-relaxed">
                            Subscribe to our newsletter for the latest insights in enterprise tech.
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 dark:text-gray-500 text-sm font-light">
                        &copy; {new Date().getFullYear()} RecentureSoft. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy_policy" className="text-slate-500 hover:text-slate-800 dark:text-gray-500 dark:hover:text-gray-300 text-sm font-light transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-slate-800 dark:text-gray-500 dark:hover:text-gray-300 text-sm font-light transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
