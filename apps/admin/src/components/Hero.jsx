'use client';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] bg-black flex flex-col md:flex-row items-center justify-between p-6 md:p-20 overflow-hidden">
            {/* Left Content */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

            <div className="z-10 w-full md:w-1/2 flex flex-col gap-6 md:gap-8 pt-20 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-2"
                >
                    <h2 className="text-brand-red font-bold text-xl tracking-wider">TRANSFORMING SPACES</h2>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
                        THE NEW AGE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">DIGITAL</span> REVOLUTION
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-lg mt-4">
                        Cutting-edge AV solutions, interactive displays, and control systems designed for the modern world.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-4"
                >
                    <button className="bg-brand-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors flex items-center gap-2 group">
                        EXPLORE NOW <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="border border-zinc-700 text-white px-8 py-3 rounded-full font-bold hover:border-brand-red hover:text-brand-red transition-colors">
                        CONTACT US
                    </button>
                </motion.div>
            </div>

            {/* Right Image / Video Placeholder */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center p-6 md:p-0">
                <div className="relative w-full h-full min-h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group cursor-pointer">

                    {/* Animated Background Image */}
                    <div className="absolute inset-0 w-full h-full bg-black">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'}/uploads/hero-hud.png`}
                                alt="Digital HUD Interface"
                                fill
                                className="object-cover opacity-80"
                            />
                        </motion.div>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-red/10 to-transparent" />
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-red/50 rounded-full blur-xl animate-pulse" />
                            <div className="w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center pl-1 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                                <Play size={32} fill="white" className="text-white" />
                            </div>
                        </div>
                        <span className="mt-4 text-white font-bold tracking-widest text-sm uppercase bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            Watch Showreel
                        </span>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-red/20 rounded-full blur-[100px]" />
                </div>
            </div>

            {/* Statistics Banner */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] bg-gradient-to-r from-brand-red to-red-900 rounded-2xl p-6 flex flex-wrap items-center justify-around gap-4 shadow-[0_0_50px_rgba(208,0,0,0.3)] border border-red-500/30">
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-white">10+</span>
                    <span className="text-xs text-red-100 uppercase font-bold">Years<br />Experience</span>
                </div>
                <div className="w-px h-10 bg-red-400/50 hidden md:block" />
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-white">500+</span>
                    <span className="text-xs text-red-100 uppercase font-bold">Projects<br />Completed</span>
                </div>
                <div className="w-px h-10 bg-red-400/50 hidden md:block" />
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-white">24/7</span>
                    <span className="text-xs text-red-100 uppercase font-bold">Support<br />Services</span>
                </div>
            </div>
        </section>
    )
}
