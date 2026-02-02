"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const clients = [
    { name: "Samsung", logo: "/assets/samsung-removebg-preview.png" },
    { name: "Sony", logo: "/assets/sony-removebg-preview.png" },
    { name: "LG", logo: "/assets/LG-Logo.webp" },
    { name: "Yamaha", logo: "/assets/yamaha-removebg-preview.png" },
    { name: "ViewSonic", logo: "/assets/viewsonic-removebg-preview.png" },
    { name: "Sennheiser", logo: "/assets/Sennheiser-logo-removebg-preview.png" },
    { name: "Audio-Technica", logo: "/assets/audio-technica.png" },
    { name: "Studiomaster", logo: "/assets/studiomaster-removebg-preview.png" }
];

export default function Clients() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <section className="py-12 bg-zinc-50 dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Clients</h2>
                <div className="w-20 h-1 bg-brand-red mx-auto rounded-full"></div>
            </div>

            <div className="slider-container">
                <Slider {...settings}>
                    {clients.map((client, index) => (
                        <div key={index} className="px-4 outline-none">
                            <div className="h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                <div className="relative w-full h-full max-w-[120px] max-h-[60px]">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
