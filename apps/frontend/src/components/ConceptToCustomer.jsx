"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const videos = [
    "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
];

export default function ConceptToCustomer() {
    const sectionRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const isVideoInView = useInView(videoContainerRef, { once: true, margin: "200px" });

    useEffect(() => {
        if (isVideoInView) {
            setShouldLoadVideo(true);
        }
    }, [isVideoInView]);

    return (
        <section ref={sectionRef} className="relative w-full pt-12 md:pt-20 pb-8 px-6 lg:px-12 overflow-hidden bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 border-y border-zinc-200 dark:border-zinc-800">
            {/* ================= PREMIUM BACKGROUND ================= */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                {/* --- Noise Texture (Shared) --- */}
                <div className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-overlay z-20"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
                />

                {/* --- Light Mode: Clean & Airy --- */}
                <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-[#FDFBF7] to-white">
                    <motion.div
                        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-50/60 rounded-full blur-[100px] mix-blend-multiply"
                    />
                    <motion.div
                        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-50/60 rounded-full blur-[120px] mix-blend-multiply"
                    />
                </div>

                {/* --- Dark Mode: Luxury Charcoal/Purple --- */}
                <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700 bg-[#050505]">
                    {/* Radial Vignette Base */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#13131f] via-[#050505] to-[#000000]" />

                    {/* Deep Muted Gradients */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[140px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] mix-blend-screen"
                    />

                    {/* Center Highlight */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(120,119,198,0.03),transparent_60%)]" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

                {/* Left Content */}
                <div className="relative">

                    {/* Main Heading - Slow Upward Fade */}
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl md:text-7xl font-black dark:text-white text-slate-900 mb-12 uppercase dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] leading-none tracking-wider"
                    >
                        FROM <span className="text-red-600 dark:text-red-500">CONCEPT</span> TO CUSTOMER
                    </motion.h3>

                    {/* Paragraphs - Accordion Expansion Effect */}
                    <div className="dark:text-gray-200 text-slate-700 text-sm leading-relaxed mb-8 space-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            We transform ideas into reliable, scalable, and customer-ready solutions. At RVTS, we combine innovation, technology, and precision to deliver products and services that meet real-world demands. From planning to execution, every step is driven by quality, efficiency, and trust.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Our team works closely with clients to understand their vision, streamline processes, and ensure timely delivery without compromising performance or standards.
                        </motion.p>
                    </div>

                    {/* List Items - Staggered Slide Down */}
                    <ul className="space-y-3 mb-4">
                        {[
                            "End-to-End Project Management",
                            "Expert Research & Development Team",
                            "Strict Quality Assurance & Testing",
                            "Advanced & Reliable Manufacturing Solutions"
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-6 h-6 bg-red-600 flex items-center justify-center shrink-0 rounded-sm shadow-md shadow-red-500/20">
                                    <Plus className="text-white w-4 h-4" />
                                </div>
                                <span className="dark:text-white text-black font-medium text-sm">{item}</span>
                            </motion.li>
                        ))}
                    </ul>

                </div>

                {/* Right Image/Video Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex items-center justify-center lg:justify-end"
                >
                    {/* Button for Desktop - now part of the right column flex but hidden on mobile if we want strict separation, or we can just leave it as is if the user wants it specifically AFTER the video */}
                    <div className="flex flex-col items-center lg:items-end w-full">
                        <div className="relative w-full w-full md:max-w-lg lg:max-w-md aspect-video lg:aspect-square dark:bg-zinc-900 bg-zinc-100 overflow-hidden rounded-xl shadow-2xl group border dark:border-white/5 border-black/5">

                            {/* Single Video */}
                            {/* Lazy Loaded Video */}
                            <div ref={videoContainerRef} className="absolute inset-0 w-full h-full bg-zinc-200 dark:bg-zinc-800">
                                {shouldLoadVideo ? (
                                    <video
                                        src={videos[0]}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover fade-in"
                                    />
                                ) : (
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                                        <div className="w-10 h-10 border-4 border-[#ff3333] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Unified Centered Button Placement (Bottom of Section) */}
                <div className="w-full flex justify-center -mt-4 relative z-20 col-span-1 lg:col-span-2">
                    <Link href="/contact">
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 51, 51, 0.4)", backgroundColor: "#ff3333", color: "#ffffff" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-3 bg-transparent text-[#ff3333] font-black hover:text-white transition-all uppercase text-sm tracking-widest rounded-full shadow-lg border-2 border-[#ff3333] cursor-pointer"
                        >
                            START YOUR PROJECT TODAY
                        </motion.button>
                    </Link>
                </div>

            </div>
        </section>
    );
}