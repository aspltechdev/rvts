'use client';

import React from 'react';
import Image from 'next/image';

const clients = [
    { name: 'Samsung', logo: '/assets/samsung-removebg-preview.png' },
    { name: 'Sony', logo: '/assets/sony-removebg-preview.png' },
    { name: 'LG', logo: '/assets/LG-Logo.webp' },
    { name: 'Yamaha', logo: '/assets/yamaha-removebg-preview.png' },
    { name: 'Audio Technica', logo: '/assets/audio-technica.png' },
    { name: 'Sennheiser', logo: '/assets/Sennheiser-logo-removebg-preview.png' },
    { name: 'Viewsonic', logo: '/assets/viewsonic-removebg-preview.png' },
    { name: 'Liberty AV', logo: '/assets/liberty_av_solution-removebg-preview.png' },
    { name: 'Datapath', logo: '/assets/datapath-removebg-preview.png' },
];

export default function ClientsCarousel() {
    // Duplicate the array to create a seamless loop
    const marqueeClients = [...clients, ...clients, ...clients, ...clients];

    return (
        <section className="w-full pt-2 pb-6 md:pt-6 md:pb-14 overflow-hidden dark:bg-[#050505] bg-white relative">
            <div className="absolute inset-0 z-0 pointer-events-none dark:bg-[#050505] bg-white" />

            {/* Heading Section - Centered with max-width */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-7xl font-black uppercase text-[#ff3333] mb-3 tracking-wider">
                        Our Trusted Clients
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium max-w-2xl mx-auto uppercase tracking-wider">
                        Powering Innovation Through Strong Partnerships
                    </p>
                </div>
            </div>

            {/* Marquee Container - Full Width */}
            <div className="w-full relative z-10">
                <div
                    className="relative w-full overflow-hidden group pt-10 pb-10"
                >
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-white dark:from-[#050505] to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-white dark:from-[#050505] to-transparent pointer-events-none" />

                    {/* Scrolling Content */}
                    <div className="flex overflow-hidden">
                        <div
                            className="flex gap-8 md:gap-12 items-center animate-infinite-scroll group-hover:[animation-play-state:paused]"
                            style={{
                                width: 'max-content',
                            }}
                        >
                            {marqueeClients.map((client, index) => (
                                <div
                                    key={`${client.name}-${index}`}
                                    className="w-[180px] md:w-[220px] aspect-[3/2] flex-shrink-0 flex items-center justify-center p-2 bg-white rounded-2xl border border-transparent hover:border-[#ff3333]/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="relative w-full h-full transform hover:scale-110 transition-transform duration-500">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes infinite-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 60s linear infinite;
                }
            `}</style>
        </section>
    );
}