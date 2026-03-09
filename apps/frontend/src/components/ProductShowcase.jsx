'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

export default function ProductShowcase() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

    useEffect(() => {
        setIsMounted(true);
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/categories`);
                if (!res.ok) throw new Error("Failed to fetch categories");
                const data = await res.json();
                const fetched = data.categories || data;

                // Category Assets Map
                const categoryAssets = {
                    "DISPLAY MOUNTS": { img: "images/category/display mount.jpeg", desc: "Secure and flexible mounting solutions." },
                    "TV MOUNTS": { img: "images/category/display mount.jpeg", desc: "Professional grade mounts for televisions." },
                    "SOUND BAR MOUNTS": { img: "images/category/Professional sound bar mounts.png", desc: "Seamless integration for superior audio." },
                    "SPEAKER MOUNTS": { img: "images/category/Professional sound bar mounts.png", desc: "Versatile speaker mounting options." },
                    "PTZ CAMERA MOUNTS": { img: "images/category/PTZ-Camera-Mounts.png", desc: "Precision mounting for pro camera systems." },
                    "MOTORIZED PROJECTOR LIFT": { img: "images/category/PTZ-Camera-Mounts.png", desc: "Automated lift systems for projectors." },
                    "MOTORIZED MOUNT SOLUTIONS": { img: "images/category/Motorized Mount Solutions.jpeg", desc: "Automated positioning for dynamic viewing." },
                    "MOTORIZED TV LIFT": { img: "images/category/Motorized Mount Solutions.jpeg", desc: "Elegant concealment for flat panels." },
                    "MOBILE TROLLEY SOLUTIONS": { img: "images/category/Mobile Trolley Solutions.jpeg", desc: "Portable stands for versatile collaboration." },
                    "TV FLOOR STAND": { img: "images/category/Mobile Trolley Solutions.jpeg", desc: "Sturdy and stylish floor standing solutions." },
                    "DIGITAL KIOSK": { img: "images/category/Digital Kiosk.png", desc: "Interactive information stations." },
                    "CONFERENCE TABLE BOX": { img: "images/category/Digital Kiosk.png", desc: "Meeting room connectivity solutions." },
                    "DIGITAL PODIUM": { img: "images/category/Digital-Podium.png", desc: "Smart lecterns for modern presentations." },
                    "PROJECTION SCREENS": { img: "images/category/Digital-Podium.png", desc: "High-quality projection surfaces." },
                    "AUDIO VISUAL ACCESSORIES": { img: "images/category/Audio Visual Accessorie.png", desc: "Essential components for complete AV." },
                    "MONITOR MOUNTS": { img: "images/category/Audio Visual Accessorie.png", desc: "Ergonomic monitor mounting solutions." },
                    "MOTORIZED BAR LIFT": { img: "images/category/Motorized Mount Solutions.jpeg", desc: "Specialized lift systems for bars." },
                    "MONITOR LIFT": { img: "images/category/display mount.jpeg", desc: "Retractable lift for desktop monitors." },
                    "PROJECTOR MOUNTS": { img: "images/category/PTZ-Camera-Mounts.png", desc: "Secure systems for all projectors." }
                };

                const transformed = fetched.map((cat, index) => {
                    const name = cat.category || cat.name;
                    const asset = categoryAssets[name] || {
                        img: cat.products?.[0]?.images?.[0] || "images/category/display mount.jpeg",
                        desc: "Professional AV solutions for your space."
                    };
                    return {
                        id: index,
                        title: name,
                        description: asset.desc,
                        image: asset.img,
                        slug: name.toLowerCase().replace(/\s+/g, '-'),
                        category: name
                    };
                });

                setCategories(transformed);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const products = categories; // Alias for the carousel logic

    // Auto-rotation
    useEffect(() => {
        if (isPaused || !isInView || products.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused, isInView, products.length]);

    const nextSlide = () => {
        if (products.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        if (products.length === 0) return;
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const isVisible = (index) => {
        if (products.length === 0) return false;
        const diff = (index - activeIndex + products.length) % products.length;
        return diff === 0 || diff === 1 || diff === products.length - 1;
    };

    const handleCardClick = (category) => {
        router.push(`/products?category=${encodeURIComponent(category || 'All Categories')}`);
    };

    if (loading || products.length === 0) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center bg-zinc-50 dark:bg-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Architecting Showroom...</p>
                </div>
            </div>
        );
    }

    return (
        <section
            id="products-showcase"
            ref={containerRef}
            className="w-full pt-10 md:pt-16 pb-0 overflow-hidden min-h-[600px] flex flex-col items-center justify-center relative bg-zinc-50 dark:bg-black"
        >
            {/* Background Pattern & Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-soft-light" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] hidden dark:block" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-red-500/5 dark:bg-red-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen overflow-visible" />
            </div>

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
                    <motion.span
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Our
                    </motion.span>
                    <motion.span
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
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
                    className="absolute left-4 md:left-20 top-[40%] z-40 w-12 h-12 rounded-full bg-[#ff3333] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Cards */}
                <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
                    <AnimatePresence initial={false}>
                        {products.map((product, index) => {
                            let offset = (index - activeIndex);
                            if (offset < -Math.floor(products.length / 2)) offset += products.length;
                            if (offset > Math.floor(products.length / 2)) offset -= products.length;

                            const isCenter = offset === 0;
                            if (Math.abs(offset) > 1 && !isVisible(index)) return null;

                            return (
                                <motion.div
                                    key={product.id}
                                    onClick={() => handleCardClick(product.category)}
                                    className={`absolute rounded-[24px] overflow-hidden dark:bg-zinc-900 bg-white cursor-pointer
                                        ${isCenter ? 'w-[280px] h-[380px] md:w-[320px] md:h-[400px]' : 'w-[220px] h-[280px] md:w-[260px] md:h-[320px]'}
                                    `}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: Math.abs(offset) > 1 ? 0 : 1,
                                        scale: isCenter ? 1 : 0.8,
                                        x: isCenter ? 0 : (offset * (isMounted && typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 340)),
                                        zIndex: isCenter ? 20 : 10,
                                        rotateY: isCenter ? 0 : (offset * 25),
                                        translateZ: isCenter ? 0 : -100,
                                    }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        boxShadow: isCenter ? '0 0 50px -10px rgba(255, 51, 51, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: '2px solid rgba(255, 51, 51, 0.3)',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="relative w-full h-full group">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`}
                                                alt={product.title}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 220px, 320px"
                                                unoptimized
                                            />
                                        </div>
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent ${isCenter ? 'opacity-80' : 'opacity-40'}`} />
                                        <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">
                                                {product.title}
                                            </h3>
                                            <p className={`text-xs text-zinc-100 line-clamp-2 transition-opacity ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                                                {product.description}
                                            </p>
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
                    className="absolute right-4 md:right-20 top-[40%] z-40 w-12 h-12 rounded-full bg-[#ff3333] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}