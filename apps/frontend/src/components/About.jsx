'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Image from 'next/image';

const AnimatedCounter = ({ value, label }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const numericValue = parseInt(value, 10);
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (inView) {
            const controls = animate(0, numericValue, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(latest) + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, numericValue, suffix]);

    return (
        <div className="flex flex-col items-center md:items-start">
            <span ref={ref} className="text-3xl md:text-4xl font-black dark:text-white text-black mb-1">
                0{suffix}
            </span>
            <span className="text-[10px] dark:text-zinc-400 text-zinc-600 font-bold uppercase tracking-wider">{label}</span>
        </div>
    );
};

export default function About() {


    return (
        <section id="about" className="relative w-full dark:bg-[#050505] bg-white py-12 md:py-20 px-4 overflow-hidden flex flex-col justify-center items-center">

            {/* Background Base */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:bg-[#050505] bg-white" />

            <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">

                {/* --- STANDARD HEADING (Matching Services) --- */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black dark:font-extrabold text-black dark:text-white uppercase tracking-wider"
                    >
                        About <span className="text-[text-black] dark:text-white">RVTS</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[#ff3333] text-sm font-bold uppercase tracking-[0.2em] mt-2"
                    >
                        Innovation & Excellence Since 2004
                    </motion.p>
                </div>

                {/* --- MAIN CARD --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center w-full"
                >
                    <div className="w-full relative dark:bg-white/[0.03] bg-white/50 backdrop-blur-md rounded-[40px] dark:border-white/40 border-black/20 p-6 md:p-10 group hover:border-[#ff3333]/30 transition-all duration-500 shadow-2xl border">

                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                            {/* Image Container with Custom Shape */}
                            <div className="relative w-full lg:w-5/12 aspect-video lg:aspect-[4/3] xl:aspect-[16/10]">
                                <div className="w-full h-full dark:bg-zinc-900 bg-zinc-200 rounded-[30px] rounded-tr-[80px] overflow-hidden relative dark:border-white/30 border-black/5 border">
                                    <motion.div
                                        initial={{ scale: 1.1 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src="/images/about-us.png"
                                            alt="About RVTS"
                                            fill
                                            className="object-cover transition-all duration-700"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-[#ff3333] mix-blend-multiply dark:opacity-40 opacity-0 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />

                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full lg:w-7/12">
                                <motion.h3
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="text-2xl md:text-3xl font-bold dark:text-white text-black mb-6 uppercase tracking-wider leading-tight"
                                >
                                    CREATING SMART AV SOLUTIONS <br className="hidden md:block" />
                                    <span className="text-[#ff3333]">FOR MODERN SPACES</span>
                                </motion.h3>

                                <div className="mb-8 space-y-4">
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="dark:text-zinc-200 text-zinc-600 text-base md:text-lg leading-relaxed"
                                    >
                                        Research Vision Tech Services (RVTS) is a technology-focused organization delivering advanced visual and AV solutions tailored for today&apos;s dynamic environments. We bridge the gap between innovation and execution by transforming complex ideas into reliable, high-performance systems.
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="dark:text-zinc-200 text-zinc-600 text-base md:text-lg leading-relaxed"
                                    >
                                        At RVTS, we blend technical expertise with thoughtful design to build solutions that are scalable, efficient, and future-ready. From corporate environments to large-scale installations, our work reflects precision, reliability, and attention to detail—ensuring every project meets both functional and visual excellence.
                                    </motion.p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t dark:border-white/10 border-black/10">
                                    {[
                                        { label: "Years of Industry Expertise", value: "20+" },
                                        { label: "Successful Projects Delivered", value: "500+" },
                                        { label: "Trusted Enterprise Clients", value: "150+" },
                                        { label: "Technology & Solution Partners", value: "25+" }
                                    ].map((stat, i) => (
                                        <AnimatedCounter key={i} value={stat.value} label={stat.label} />
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}