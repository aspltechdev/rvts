'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Download, Share2 } from 'lucide-react';

export default function ProductDetailView({ product }) {
    const [activeImage, setActiveImage] = useState(0);

    // Fallback if product is missing or minimal
    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;
    }

    const images = product.images && product.images.length > 0 ? product.images : ['/images/video-wall.png'];
    const specs = product.specs || [
        { label: "Pixel Pitch", value: "1.25mm" },
        { label: "Brightness", value: "600 nits" },
        { label: "Refresh Rate", value: "3840Hz" },
        { label: "Module Size", value: "300x168.75mm" },
    ];

    return (
        <div className="min-h-screen dark:bg-[#050505] bg-white dark:text-white text-black pt-32 pb-20">
            <div className="container mx-auto px-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-10 uppercase tracking-wider font-semibold">
                    <span className="hover:text-white cursor-pointer transition-colors">Products</span>
                    <ChevronRight size={14} />
                    <span className="hover:text-white cursor-pointer transition-colors">{product.category || 'Hardware'}</span>
                    <ChevronRight size={14} />
                    <span className="text-brand-red">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT COLUMN - IMAGES */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-3xl overflow-hidden dark:bg-zinc-900 bg-zinc-100 dark:border-zinc-800 border-zinc-200 shadow-2xl group"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-red shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'dark:border-zinc-800 border-zinc-200 opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - DETAILS */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-block px-3 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-xs font-black uppercase tracking-widest mb-6">
                                {product.category || 'Premium Series'}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase dark:text-white text-black mb-6 leading-none">
                                {product.name}
                            </h1>

                            <p className="dark:text-zinc-400 text-zinc-600 text-lg leading-relaxed mb-10 max-w-xl">
                                {product.description || "Experience the pinnacle of visual technology. Designed for professional environments requiring the highest durability and performance standards."}
                            </p>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                {specs.map((spec, i) => (
                                    <div key={i} className="dark:bg-zinc-900/50 bg-zinc-50 dark:border-white/5 border-black/5 border p-4 rounded-xl hover:border-brand-red/30 transition-colors">
                                        <p className="dark:text-zinc-500 text-zinc-600 text-xs uppercase tracking-wider font-bold mb-1">{spec.label}</p>
                                        <p className="dark:text-white text-black font-medium">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-4">
                                <button className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl uppercase tracking-wider hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                                    Request Quote
                                </button>
                                <button className="px-8 py-4 bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black font-bold rounded-xl uppercase tracking-wider dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white transition-all flex items-center gap-2">
                                    <Download size={20} />
                                    Spec Sheet
                                </button>
                                <button className="p-4 bg-transparent border dark:border-white/10 border-black/10 dark:text-zinc-400 text-zinc-600 rounded-xl hover:text-brand-red hover:border-brand-red transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
