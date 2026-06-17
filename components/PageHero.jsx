"use client";

import { motion } from "framer-motion";

export default function PageHero({ badge, title, highlight, description, children }) {
    return (
        <section className="relative pt-24 md:pt-28 lg:pt-32 pb-2 md:pb-4 lg:pb-6 overflow-hidden bg-background min-h-fit flex items-center transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:mix-blend-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 dark:from-blue-900/20 via-background to-background" />
            <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -right-[20%] bottom-[10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-20 max-w-[1500px]">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

                    {/* Content Left */}
                    <div className="flex flex-col justify-center order-1 lg:order-1 text-center lg:text-left">


                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[2.25rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold tracking-[-0.02em] leading-[1] text-foreground mb-4 md:mb-6"
                        >
                            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500">{highlight}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="
max-w-2xl
mx-auto
lg:mx-0
text-slate-600
dark:text-slate-300
text-base
md:text-lg
lg:text-xl
font-normal
leading-8
"
                        >
                            {description}
                        </motion.p>
                    </div>

                    {/* 3D Visual Right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="
order-2
lg:order-2
h-[180px]
sm:h-[240px]
md:h-[320px]
lg:h-[420px]
w-full
relative
flex
items-center
justify-center
"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
                        {children}
                    </motion.div>

                </div>
            </div>

            {/* Bottom Gradient Fade to merge with next section */}
            <div className="absolute bottom-0 inset-x-0 h-12 md:h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>
    );
}
