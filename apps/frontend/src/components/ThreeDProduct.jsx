'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    "Advanced High-Resolution Display Technology",
    "Sleek, Modern & Minimal Design",
    "Optimized Power Efficiency",
    "Built for Continuous Performance"
];

export default function ThreeDProduct() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    // Auto-load on scroll when in view
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" });

    if (isInView && !isModelLoaded) {
        setIsModelLoaded(true);
    }

    return (
        <section ref={containerRef} className="w-full pt-12 md:pt-20 pb-8 bg-zinc-50 dark:bg-black overflow-hidden relative border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <div className="mb-8">
                            <span className="text-[#ff3333] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                                INTERACTIVE INNOVATION
                            </span>
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight dark:text-white text-black leading-none">
                                DISCOVER <br />
                                <span>
                                    EVERY ANGLE
                                </span>
                            </h2>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            Step into the next level of visual technology with RVTS&apos;s immersive product experience. Explore, rotate, and analyze every component to understand the precision and performance engineered into each solution. Our systems are built to deliver clarity, efficiency, and long-term reliability.
                        </p>

                        <ul className="space-y-2">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-[#ff3333]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 hidden lg:block">
                            <Link
                                href="/products"
                                className="px-6 py-2.5 bg-[#ff3333] text-white font-bold rounded-full transition-all flex items-center gap-2 group inline-flex hover:bg-white hover:text-[#ff3333] border-2 border-transparent hover:border-[#ff3333] shadow-lg hover:shadow-xl"
                            >
                                View All Products
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: 3D Viewer (Smaller Container) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative Background Blob behind model */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl -z-10" />

                        <div className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 relative group transform hover:scale-[1.02] transition-transform duration-500">

                            {/* Loading State / Iframe */}
                            {!isModelLoaded ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                                    <div className="w-8 h-8 border-4 border-[#ff3333] border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#ff3333]">Loading 3D Model...</p>
                                </div>
                            ) : (
                                <div className="w-full h-full relative overflow-hidden">
                                    <iframe
                                        src="https://a360.co/43xuQql"
                                        width="100%"
                                        height="100%"
                                        allowFullScreen={true}
                                        webkitallowfullscreen="true"
                                        mozallowfullscreen="true"
                                        frameBorder="10"
                                        className="w-full h-[calc(100%+60px)] -mt-[60px]"
                                        title="3D Product Viewer"
                                    />
                                    {/* Mask ViewCube and Home Button */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-transparent z-10 sm:hidden" /> {/* Mobile mask */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-transparent z-10 cursor-default" /> {/* Prevent clicking */}

                                    {/* Instruction Hint (Fades out on hover) */}
                                    <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0 delay-1000">
                                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md">
                                            Click & Drag to Rotate
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Button: View All Products */}
                        <div className="pt-8 flex justify-center lg:hidden">
                            <Link
                                href="/products"
                                className="px-6 py-2.5 bg-[#ff3333] text-white font-bold rounded-full transition-all flex items-center gap-2 group inline-flex hover:bg-white hover:text-[#ff3333] border-2 border-transparent hover:border-[#ff3333] shadow-lg hover:shadow-xl"
                            >
                                View All Products
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}