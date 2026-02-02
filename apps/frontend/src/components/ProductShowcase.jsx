'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';


const products = [
    {
        id: 1,
        title: "Display Mounts",
        description: "Secure and flexible mounting solutions for all display types.",
        image: "images/category/display mount.jpeg",
        slug: "display-mounts"
    },
    {
        id: 2,
        title: "Sound Bar Mounts",
        description: "Seamless integration for superior audio experiences.",
        image: "images/category/Professional sound bar mounts.png",
        slug: "professional-sound-bar-mounts"
    },
    {
        id: 3,
        title: "PTZ Camera Mounts",
        description: "Precision mounting for professional camera systems.",
        image: "images/category/PTZ-Camera-Mounts.png",
        slug: "ptz-camera-mounts"
    },
    {
        id: 4,
        title: "Motorized Mount Solutions",
        description: "Automated positioning for dynamic viewing environments.",
        image: "images/category/Motorized Mount Solutions.jpeg",
        slug: "motorized-mount-solutions"
    },
    {
        id: 5,
        title: "Mobile Trolley Solutions",
        description: "Portable display stands for versatile collaboration.",
        image: "images/category/Mobile Trolley Solutions.jpeg",
        slug: "mobile-trolley-solutions"
    },
    {
        id: 6,
        title: "Digital Kiosk",
        description: "Interactive self-service and information stations.",
        image: "images/category/Digital Kiosk.png",
        slug: "digital-kiosk"
    },
    {
        id: 7,
        title: "Digital Podium",
        description: "Smart lecterns for modern presentations and lectures.",
        image: "images/category/Digital-Podium.png",
        slug: "digital-podium"
    },
    {
        id: 8,
        title: "Audio Visual Accessories",
        description: "Essential components for complete AV setups.",
        image: "images/category/Audio Visual Accessorie.png",
        slug: "audio-visual-accessories"
    }
];

export default function ProductShowcase() {
    const [activeIndex, setActiveIndex] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    // Performance: Only animate when in view
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-rotation
    useEffect(() => {
        if (isPaused || !isInView) return; // Pause if user interaction or off-screen
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused, isInView]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const isVisible = (index) => {
        const diff = (index - activeIndex + products.length) % products.length;
        return diff === 0 || diff === 1 || diff === products.length - 1;
    };

    const handleCardClick = (title) => {
        // Map showcase titles to actual categories in the Products Listing page
        const categoryMap = {
            "Display Mounts": "Mounting Solutions",
            "Sound Bar Mounts": "PTZ / Soundbars / Trolleys",
            "PTZ Camera Mounts": "PTZ / Soundbars / Trolleys",
            "Motorized Mount Solutions": "Mounting Solutions",
            "Mobile Trolley Solutions": "PTZ / Soundbars / Trolleys",
            "Digital Kiosk": "Touch Screen Kiosks",
            "Digital Podium": "Touch Screen Kiosks",
            "Audio Visual Accessories": "Cables & Accessories"
        };
        const category = categoryMap[title] || title;
        router.push(`/products?category=${encodeURIComponent(category)}`);
    };

    return (
        <section
            id="products-showcase"
            ref={containerRef}
            className="w-full pt-10 md:pt-16 pb-0 overflow-hidden min-h-[600px] flex flex-col items-center justify-center relative bg-zinc-50 dark:bg-black"
        >
            {/* Background Pattern & Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle Grid - Technical Feel */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block"></div>

                {/* Primary Spotlight Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-red-500/5 dark:bg-red-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen overflow-visible" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-400/5 dark:bg-red-900/10 blur-[120px] rounded-full" />
            </div>

            {/* Ambient Background Glows - Removed as background handles it */}

            {/* Edge Gradients - Reduced opacity for better visibility */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r dark:from-black from-zinc-50 via-zinc-50/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l dark:from-black from-zinc-50 via-zinc-50/80 to-transparent z-20 pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-12 z-20 relative px-4">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-7xl font-black dark:text-white text-black uppercase tracking-tight drop-shadow-lg flex justify-center gap-4"
                >
                    {/* "OUR" with slide-in from left */}
                    <motion.span
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block"
                    >
                        Our
                    </motion.span>

                    {/* "PRODUCTS" with slide-in from right */}
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block dark:text-white text-black"
                    >
                        Products
                    </motion.span>
                </motion.h2>
                <p className="text-[#ff3333] mt-2 max-w-2xl mx-auto text-sm font-bold uppercase tracking-[0.2em] text-center">
                    Discover our cutting-edge solutions designed to transform your space.
                </p>
            </div>

            {/* Carousel Container */}
            <div
                className="relative w-full max-w-[1400px] mx-auto h-[450px] flex items-center justify-center mb-12"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >

                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 md:left-20 top-[40%] z-30 w-12 h-12 rounded-full bg-[#ff3333] text-black shadow-[0_0_20px_rgba(255,51,51,0.3)] flex items-center justify-center dark:hover:bg-white dark:hover:text-[#ff3333] hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Cards */}
                <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
                    <AnimatePresence initial={false}>
                        {products.map((product, index) => {
                            let offset = (index - activeIndex);
                            if (offset < -Math.floor(products.length / 2)) offset += products.length;
                            if (offset > Math.floor(products.length / 2)) offset -= products.length;

                            const isCenter = offset === 0;
                            const isRight = offset === 1;

                            if (Math.abs(offset) > 1 && !isVisible(index)) return null;

                            return (
                                <motion.div
                                    key={product.id}
                                    onClick={() => handleCardClick(product.title)}
                                    className={`absolute rounded-[24px] overflow-hidden dark:bg-zinc-900 bg-white cursor-pointer
                                        ${isCenter ? 'w-[280px] h-[380px] md:w-[320px] md:h-[400px]' : 'w-[220px] h-[280px] md:w-[260px] md:h-[320px]'} // Scaled down
                                    `}
                                    initial={{ opacity: 0, scale: 0.5, x: isRight ? 500 : -500 }}
                                    animate={{
                                        opacity: Math.abs(offset) > 1 ? 0 : 1,
                                        scale: isCenter ? 1 : 0.8,
                                        x: isCenter ? 0 : (offset * (!isMounted ? 340 : (window?.innerWidth < 768 ? 200 : 340))),
                                        zIndex: isCenter ? 20 : 10,
                                        filter: isCenter ? 'brightness(1.1) contrast(1.1)' : 'brightness(1.0) blur(0px)',
                                        rotateY: isCenter ? 0 : (offset * 25),
                                        translateZ: isCenter ? 0 : -100,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    style={{
                                        boxShadow: isCenter
                                            ? '0 0 50px -10px rgba(255, 51, 51, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: '2px solid rgba(255, 51, 51, 0.3)',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="relative w-full h-full group">
                                        <div className="absolute inset-0 z-10 border dark:border-white/20 border-transparent rounded-[24px] pointer-events-none" />
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={`/${product.image}`}
                                                alt={product.title}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                sizes="(max-width: 768px) 220px, 320px"
                                            />
                                        </div>

                                        {/* Cinematic Overlay - visible in both modes for text readability */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 ${isCenter ? 'opacity-80' : 'opacity-40'} group-hover:opacity-90`} />

                                        {/* Text Overlay */}
                                        <div className={`absolute bottom-0 left-0 w-full p-6 text-center transform transition-all duration-500`}>
                                            <h3 className={`text-2xl md:text-3xl dark:text-white font-black text-white mb-2 uppercase tracking-wide transition-colors`}>
                                                {product.title}
                                            </h3>
                                            <p className={`text-sm dark:text-zinc-100 text-zinc-100 line-clamp-2 transition-all duration-500 overflow-hidden ${isCenter ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
                                                {product.description}
                                            </p>
                                            {isCenter && (
                                                <div className="flex flex-col items-center gap-3 mt-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                    <a
                                                        href={`/products?category=${encodeURIComponent(product.title)}`}
                                                        target="_self"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCardClick(product.title);
                                                        }}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333] hover:bg-[#ff3333]/90 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
                                                    >
                                                        <FileText size={14} />
                                                        View Full Specs
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 md:right-20 top-[40%] z-30 w-12 h-12 rounded-full bg-[#ff3333] text-black shadow-[0_0_20px_rgba(255,51,51,0.3)] flex items-center justify-center dark:hover:bg-white dark:hover:text-[#ff3333] hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>


        </section>
    );
}