'use client';
import {
    Briefcase,
    GraduationCap,
    Hotel,
    ShoppingBag,
    Presentation,
    Plane,
    Church,
    Landmark
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Industries() {
    const industries = [
        {
            icon: Briefcase,
            label: "Corporate & \nEnterprise",
            description: "Advanced AV for modern offices.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: GraduationCap,
            label: "Education",
            description: "Smart learning environments.",
            image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: Hotel,
            label: "Hospitality & \nEvents",
            description: "Immersive guest experiences.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: ShoppingBag,
            label: "Retail & \nRestaurant",
            description: "Digital engagement for brands.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: Presentation,
            label: "Exhibition",
            description: "Stunning visual showcases.",
            image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: Plane,
            label: "Tourism",
            description: "Informative digital displays.",
            image: "/images/industries/tourism.png"
        },
        {
            icon: Church,
            label: "Houses of \nWorship",
            description: "Crystal clear sanctuary audio.",
            image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: Landmark,
            label: "Government & \nPublic Sector",
            description: "Secure communication hubs.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
        },
    ];

    return (
        <section className="w-full dark:bg-black bg-white pt-4 md:pt-10 pb-12 md:pb-20 px-6 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
            {/* Background Image with Overlays - Dark Mode Only */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
                    alt="Background"
                    fill
                    className="object-cover dark:opacity-20 opacity-0 hidden dark:block"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-white via-black/80 to-black dark:via-black/80 dark:to-black via-white/80 to-white hidden dark:block" />
                <div className="absolute inset-0 bg-gradient-to-r dark:from-black/60 from-white/60 via-transparent dark:to-black/60 to-white/60 hidden dark:block" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <div className="text-center mb-12">
                    {/* HEADING with Zoom and Sweep */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-7xl font-black dark:text-white text-black uppercase tracking-wider"
                    >
                        Industries We Serve
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {industries.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }} // Staggered grid pulse
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="group relative flex flex-col items-center justify-center p-8 overflow-hidden rounded-2xl aspect-square cursor-pointer transition-shadow duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
                            >
                                {/* Industry Background Image */}
                                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        fill
                                        className="object-cover opacity-100 transition-opacity duration-500"
                                    />
                                    {/* Subtle overlay only for text legibility, much lighter now */}
                                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10" />
                                </div>

                                {/* Border line */}
                                <div className="absolute inset-0 border dark:border-zinc-800/50 border-zinc-200/50 group-hover:border-brand-red/50 rounded-2xl transition-colors duration-500 z-10" />

                                {/* Content */}
                                <div className="relative z-20 flex flex-col items-center text-center">
                                    <motion.div
                                        initial={{ rotateY: 90, opacity: 0 }}
                                        whileInView={{ rotateY: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                                        className="mb-6 p-4 rounded-full dark:bg-zinc-950/80 bg-white/80 backdrop-blur-sm border dark:border-zinc-800 border-zinc-200 group-hover:border-brand-red/50 transition-colors duration-500"
                                    >
                                        <Icon size={56} className="dark:text-zinc-400 text-zinc-600 group-hover:text-brand-red transition-all duration-500 group-hover:scale-110" strokeWidth={1} />
                                    </motion.div>

                                    <span className="text-white font-[900] uppercase text-sm tracking-widest transition-colors whitespace-pre-line leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                        {item.label}
                                    </span>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                                        className="mt-2 text-white font-bold text-[10px] uppercase tracking-wider transition-colors drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]"
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}