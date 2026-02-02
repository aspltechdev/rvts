'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Services() {
    const containerRef = useRef(null);


    return (

        <section ref={containerRef} data-scroll="services" className="relative w-full dark:bg-[#050505] bg-white py-12 md:py-20 px-4 overflow-hidden flex flex-col justify-center items-center">

            {/* --- CLEAN BACKGROUND --- */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:bg-[#050505] bg-white" />

            <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">

                {/* --- STANDARD HEADING --- */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black dark:font-extrabold text-black dark:text-white uppercase tracking-wider"
                    >
                        Our Services
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center mt-2"
                    >
                        <p className="text-[#ff3333] text-sm font-bold uppercase tracking-[0.2em]">
                            End-to-End Technology Solutions
                        </p>
                    </motion.div>
                </div>

                {/* --- CAROUSEL / CARD SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center w-full"
                >
                    <div className="w-full max-w-[1100px] relative dark:bg-white/[0.03] bg-white/50 backdrop-blur-md rounded-[32px] dark:border-white/40 border-black/20 p-4 md:p-8 group hover:border-[#ff3333]/30 transition-all duration-500 shadow-2xl border">

                        <div className="flex flex-col md:flex-row items-center gap-12">

                            {/* Image Container with Custom Shape (Notch) */}
                            <div className="relative w-full md:w-[45%] aspect-[16/10] md:aspect-[4/3]">
                                <div className="w-full h-full dark:bg-zinc-900 bg-zinc-200 rounded-[30px] rounded-tr-[80px] overflow-hidden relative dark:border-white/30 border-black/5 border">
                                    <motion.img
                                        initial={{ scale: 1.1 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        src="/images/services/implementation.png"
                                        alt="Service Preview"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#ff3333] mix-blend-multiply dark:opacity-60 opacity-0 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                                </div>

                                {/* Floating Action Button */}
                                <div className="absolute -top-3 -right-3 z-20">
                                    <Link href="/services">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 45 }}
                                            className="w-16 h-16 bg-[#ff3333] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,51,51,0.4)] cursor-pointer border-4 dark:border-[#050505] border-white"
                                        >
                                            <ArrowUpRight size={28} strokeWidth={2.5} />
                                        </motion.div>
                                    </Link>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <motion.h3
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="text-2xl font-bold dark:text-white text-black mb-3 uppercase tracking-wider"
                                >
                                    PROJECT <span className="text-[#ff3333]">IMPLEMENTATION</span>
                                </motion.h3>

                                <div className="mb-4">
                                    {[
                                        "Our skilled professionals manage the complete deployment of your technology infrastructure—from initial planning to final activation. Every system is installed with precision, optimized for performance, and aligned with industry best practices.",
                                        "We ensure seamless coordination across hardware, software, and control systems, delivering solutions that are reliable, efficient, and ready for real-world use."
                                    ].map((sentence, index) => (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.2) }} // Stagger lines
                                            className="dark:text-zinc-200 text-zinc-600 text-sm md:text-base leading-6 mb-1 last:mb-0"
                                        >
                                            {sentence}
                                        </motion.p>
                                    ))}
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    {['PRODUCT CONSULTATION', 'TECHNICAL SUPPORT', 'WARRANTY & MAINTENANCE', 'ON-TIME DELIVERY'].map((tag, i) => (
                                        <motion.span
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                                            className="px-4 py-1.5 dark:bg-white/10 bg-white rounded-full text-[10px] dark:text-white text-black uppercase font-[900] tracking-wider border-[#ff3333] border-2 cursor-default transition-all duration-300 shadow-[0_0_15px_rgba(255,51,51,0.4)]"
                                        >
                                            {tag}
                                        </motion.span>
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
