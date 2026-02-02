"use client";

import React, { useState } from 'react';
import { ChevronRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GetOurSupport() {
    const [activeFaq, setActiveFaq] = useState(1);

    const faqs = [
        {
            id: 0,
            question: "What services does RVTS support cover?",
            answer: "Our support includes consultation, deployment help, issue resolution, and continuous system monitoring."
        },
        {
            id: 1,
            question: "Is support available outside business hours?",
            answer: "Yes, RVTS offers 24/7 support to ensure minimal downtime."
        },
        {
            id: 2,
            question: "Do you help with system upgrades and improvements?",
            answer: "We assist with upgrades, enhancements, and performance optimization."
        },
        {
            id: 3,
            question: "Are RVTS solutions customizable?",
            answer: "Yes, all our services are designed to adapt to your specific business needs."
        },
        {
            id: 4,
            question: "Do you offer long-term support plans?",
            answer: "We provide flexible support plans for short-term and long-term requirements."
        }
    ];

    return (
        <section id="support" className="relative w-full dark:bg-[#050505] bg-white py-12 md:py-20 px-4 overflow-hidden flex flex-col justify-center items-center">

            {/* Background Base */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:bg-[#050505] bg-white" />

            <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">

                {/* --- STANDARD HEADING (Matching Services) --- */}
                <div className="text-center mb-12 text-center items-center flex flex-col">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black dark:font-extrabold text-black dark:text-white uppercase tracking-wider"
                    >
                        GET OUR SUPPORT
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[#ff3333] text-sm font-bold uppercase tracking-[0.2em] mt-2"
                    >
                        Reliable assistance, whenever you need it
                    </motion.p>
                </div>

                {/* --- MAIN CARD --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center w-full"
                >
                    <div className="w-full max-w-[1100px] relative dark:bg-white/[0.03] bg-white/50 backdrop-blur-md rounded-[40px] dark:border-white/40 border-black/20 p-6 md:p-12 group hover:border-[#ff3333]/30 transition-all duration-500 shadow-2xl border">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                            {/* Left Column - Support Query */}
                            <div>
                                <motion.h3
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="text-2xl md:text-3xl font-bold dark:text-white text-black mb-6 uppercase tracking-wider leading-tight"
                                >
                                    HOW CAN WE <span className="text-[#ff3333]">HELP YOU?</span>
                                </motion.h3>

                                <p className="dark:text-zinc-400 text-zinc-600 text-sm md:text-base mb-10 leading-relaxed">
                                    Our dedicated professionals are available around the clock to handle technical concerns, system checks, upgrades, and performance issues.
                                </p>

                                <div className="space-y-8">
                                    <div className="relative group p-6 bg-black/5 dark:bg-zinc-900/50 rounded-2xl border border-black/10 dark:border-white/5 flex flex-col gap-4 text-center items-center justify-center min-h-[150px]">
                                        <div className="w-16 h-16 rounded-full bg-brand-red/10 dark:bg-brand-red/20 flex items-center justify-center mb-2">
                                            <Send size={32} className="text-brand-red relative left-1 down-1" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg dark:text-white text-gray-900 mb-1">Direct Support Channel</h4>
                                            <p className="text-sm dark:text-zinc-400 text-gray-600">Connect directly with our technical team via our secure portal.</p>
                                        </div>
                                    </div>

                                    <div className="relative inline-block w-full group/btn">
                                        <a
                                            href="/contact?subject=Technical+Support"
                                            className="w-full py-4 bg-[#ff3333] text-white font-black uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(255,51,51,0.3)] hover:shadow-[0_15px_40px_rgba(255,51,51,0.5)] transition-all flex items-center justify-center gap-3 relative z-10 hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                            Open Support Ticket
                                        </a>

                                        {/* Improved Diamond Accent for Button */}
                                        <div className="absolute -top-4 right-6 w-8 h-8 dark:bg-white bg-white transform rotate-45 rounded-sm shadow-xl z-20 flex items-center justify-center dark:border-white/20 border-black/10 group-hover/btn:rotate-90 transition-transform duration-500 pointer-events-none border-2">
                                            <div className="w-2 h-2 dark:bg-[#ff3333] bg-[#ff3333] rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - FAQ */}
                            <div className="space-y-4">
                                <h4 className="text-xl font-black dark:text-white text-black uppercase tracking-wider mb-6">Frequently Asked Questions</h4>

                                <div className="space-y-3">
                                    {faqs.map((faq, index) => (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 * index }}
                                            className={`rounded-2xl border transition-all duration-300 ${activeFaq === faq.id
                                                ? 'dark:bg-white/10 bg-black/5 dark:border-[#ff3333]/50 border-[#ff3333]/30 p-5'
                                                : 'dark:bg-white/5 bg-black/5 border-transparent p-4'}`}
                                            onClick={() => setActiveFaq(faq.id === activeFaq ? null : faq.id)}
                                        >
                                            <div className="flex items-center justify-between cursor-pointer gap-4">
                                                <h5 className={`font-bold text-sm md:text-base uppercase leading-tight transition-colors ${activeFaq === faq.id ? 'text-[#ff3333]' : 'dark:text-zinc-300 text-zinc-700'}`}>
                                                    {faq.question}
                                                </h5>
                                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeFaq === faq.id ? 'bg-[#ff3333] text-white' : 'dark:bg-white/10 bg-black/10 dark:text-white text-black'}`}>
                                                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-90' : ''}`} />
                                                </div>
                                            </div>

                                            <motion.div
                                                initial={false}
                                                animate={{ height: activeFaq === faq.id ? 'auto' : 0, opacity: activeFaq === faq.id ? 1 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed mt-4 font-medium">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        </motion.div>
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
