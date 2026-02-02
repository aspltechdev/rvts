'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';


export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[600px] bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
            {/* Background Image - Vibrant Red Network */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.jpeg"
                    alt="RVTS Research Vision"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Overlays - Always Dark for Cinematic Look */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Large Center Headline */}
            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10vw] md:text-[5vw] font-[1000] text-white leading-[0.9] tracking-[-0.05em] uppercase pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                    Research Vision <br />
                    <span className="text-brand-red">Tech Services </span>
                </motion.h1>
            </div>

            {/* Bottom Controls & Info Overlay */}
            <div className="absolute bottom-8 md:bottom-16 left-0 w-full px-6 md:px-16 md:pr-44 flex flex-col-reverse md:flex-row items-center md:items-end justify-end z-20 gap-8 md:gap-12">

                {/* Navigation Arrows */}


                {/* Right Side Info & Counter */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right">

                    {/* Social Proof Pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="dark:bg-white/5 bg-black/5 backdrop-blur-md rounded-full px-3 py-1.5 md:px-5 md:py-2 flex items-center gap-2 md:gap-3 dark:border-white/10 border-black/10 border mb-4 md:mb-6"
                    >
                        <span className="text-brand-red font-bold text-xs md:text-sm tracking-tight text-nowrap">2K+</span>
                        <div className="flex -space-x-2 md:-space-x-3">
                            {[
                                { name: 'Samsung', logo: '/assets/samsung-removebg-preview.png' },
                                { name: 'LG', logo: '/assets/LG-Logo.webp' },
                                { name: 'Sony', logo: '/assets/sony-removebg-preview.png' },
                                { name: 'Yamaha', logo: '/assets/yamaha-removebg-preview.png' }
                            ].map((partner, i) => (
                                <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 dark:border-black border-white bg-white shadow-sm relative overflow-hidden flex items-center justify-center p-1 md:p-1.5">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Description Text */}
                    <p className="text-sm font-medium text-white/90 leading-relaxed mb-2 uppercase tracking-wide max-w-xs drop-shadow-sm">
                        Research Vision Tech Services: Modular Hardware, Cinematic Displays & Control Automation.
                    </p>
                    <div className="w-12 h-[2px] bg-brand-red" />
                </div>
            </div>

            {/* Side Branding */}
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 hidden xl:block">
                <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40">CORTEX HARDWARE SYSTEMS</span>
            </div>
        </section>
    );
}