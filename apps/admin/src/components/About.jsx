'use client';
import { Play } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="w-full bg-gradient-to-b from-black to-zinc-950 py-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-brand-red mb-12 uppercase tracking-wide">About Us</h2>

                {/* Video/Image Container */}
                <div className="relative w-full aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                    {/* Placeholder Content */}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                        <span className="text-zinc-700">[ABOUT US VIDEO/IMAGE ASSET]</span>
                    </div>

                    {/* Play Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-red/90 rounded-full flex items-center justify-center pl-1 text-white shadow-[0_0_30px_rgba(208,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                        <Play size={32} fill="currentColor" />
                    </div>

                    {/* Tech Overlay Lines */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[0.5px] border-white/5 opacity-50" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                        <span className="text-xs text-brand-red">LIVE_FEED_01</span>
                    </div>
                </div>

                <div className="mt-12 text-center max-w-3xl">
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                        We are pioneers in the audio-visual industry, delivering state-of-the-art solutions that redefine how people interact with technology. From immersive video walls to intelligent control systems, our mission is to empower businesses with tools that innovative and inspire.
                    </p>
                </div>
            </div>
        </section>
    )
}
