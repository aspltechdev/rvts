"use client";
import { MapPin, Phone, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleScrollToSection = (e, sectionId) => {
        e.preventDefault();

        const scrollToElement = () => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };

        if (pathname === '/') {
            scrollToElement();
        } else {
            router.push('/');
            // Small delay to allow navigation to complete before scrolling
            setTimeout(scrollToElement, 500);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animate once
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <footer ref={footerRef} className="w-full dark:bg-black bg-zinc-50 dark:text-white text-black pt-6 pb-6 px-6 md:px-12 lg:px-20 overflow-hidden relative z-10">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-4">
                {/* Brand & Description */}
                <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    {/* Logo (Commented out in original) */}

                    <h2 className={`text-4xl font-bold leading-tight ${isVisible ? 'animate-metallic' : ''}`}>
                        Research Vision <br />
                        <span className="text-red-600">Tech Services</span>
                    </h2>

                    <p className="dark:text-zinc-200 text-zinc-600 text-base leading-relaxed max-w-md">
                        Delivering reliable visual and technology solutions for modern digital environments.
                        Built with precision, performance, and long-term scalability.
                    </p>
                </div>

                {/* Map Section - Order Last on Mobile, Normal on Desktop */}
                <div className={`w-full h-48 dark:bg-zinc-800 bg-zinc-200 rounded-lg overflow-hidden relative order-last lg:order-none ${isVisible ? 'animate-zoom-fade' : 'opacity-0'}`}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3898151620688!2d77.66396717367222!3d13.010830214019808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0d000cbbda7d%3A0xf6a8add3a5c46c5e!2sResearch%20Vision%20Tech%20Services!5e0!3m2!1sen!2sin!4v1768284748775!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>

                {/* Links Section - Spans Full Width on Desktop */}
                {/* Links Section - Spans Full Width on Desktop */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 dark:border-zinc-800 border-zinc-200 border-t pt-6">
                    {/* Quick Links */}
                    <div className={`order-1 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: '200ms' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-red-600 hover:text-red-500 transition-colors cursor-pointer">Quick Links</h4>
                        <ul className="space-y-2 dark:text-zinc-200 text-zinc-600 text-sm">
                            {['Home', 'About Us', 'Products', 'Services', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={item === 'Products' ? '/products' : (item === 'Home' ? '/' : (item === 'About Us' ? '/about' : (item === 'Services' ? '/services' : '/contact')))}
                                        onClick={item === 'Products' ? (e) => handleScrollToSection(e, 'products-showcase') : undefined}
                                        className="hover:text-red-600 transition-colors cursor-pointer"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policy Links */}
                    <div className={`order-2 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: '300ms' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-red-600 hover:text-red-500 transition-colors cursor-pointer">Policy</h4>
                        <ul className="space-y-2 dark:text-zinc-200 text-zinc-600 text-sm">
                            {[
                                { name: 'Privacy Policy', href: '/privacy-policy' },
                                { name: 'Terms & Conditions', href: '/terms-conditions' },
                                { name: 'Disclaimer', href: '/disclaimer' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="hover:text-red-600 transition-colors cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className={`order-3 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: '400ms' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-red-600 hover:text-red-500 transition-colors cursor-pointer">PRODUCTS</h4>
                        <ul className="space-y-2 dark:text-zinc-200 text-zinc-600 text-sm">
                            {['Displays & Video Walls', 'Control Systems', 'Video Systems', 'Touch Screen Kiosk', 'Mounting solutions'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="/products"
                                        onClick={(e) => handleScrollToSection(e, 'products-showcase')}
                                        className="hover:text-red-600 transition-colors cursor-pointer"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={`col-span-2 lg:col-span-1 order-5 lg:order-4 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: '600ms' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-red-600 hover:text-red-500 transition-colors cursor-pointer">CONTACT</h4>
                        <ul className="space-y-3 dark:text-zinc-200 text-zinc-600 text-sm">
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <MapPin className="shrink-0 mt-0.5 group-hover:text-red-600 transition-colors" size={18} />
                                <span className="group-hover:text-red-600 transition-colors">
                                    Sri Chakra Building, # 402, 1st Floor,<br />
                                    4th Cross, Ramamurthi Nagar Main Rd,
                                    East of NGEF Layout, Bengaluru,<br />
                                    Karnataka 560016
                                </span>
                            </li>
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <Mail className="shrink-0 mt-0.5 group-hover:text-red-600 transition-colors" size={18} />
                                <a href="mailto:Ourstudio@hello.com" className="hover:text-red-600 transition-colors">sales@researchvisions.com</a>
                            </li>
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <Phone className="shrink-0 mt-0.5 group-hover:text-red-600 transition-colors" size={18} />
                                <a href="tel:+13866883295" className="hover:text-red-600 transition-colors">+91 95911 33004</a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className={`order-4 lg:order-5 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: '800ms' }}>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-red-600 hover:text-red-500 transition-colors cursor-pointer">Follow Us</h4>
                        <div className="flex gap-2">
                            {[
                                {
                                    name: "Facebook",
                                    href: "https://www.facebook.com/profile.php?id=61585910755226",
                                    className: "bg-[#1877F2]",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.791 1.657-2.791 3.556v1.448h3.943l-.531 3.667h-3.412v7.98h-4.996Z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: "LinkedIn",
                                    href: "https://www.linkedin.com/company/research-vision-tech-services-rvts/posts/", // PUT YOUR LINKEDIN LINK HERE
                                    className: "bg-[#0077b5]",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: "Instagram",
                                    href: " https://www.instagram.com/rvts_audio_visual/",
                                    className: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    )
                                },
                                {
                                    name: "WhatsApp",
                                    href: "https://wa.me/13866883295",
                                    className: "bg-[#25D366]",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    )
                                }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform hover:scale-110 ${social.className}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto dark:border-zinc-800 border-zinc-200 border-t pt-4 text-center">
                <p className="dark:text-white text-zinc-900 text-sm flex flex-col gap-1">
                    <span>©️ 2026 RVTS. All rights reserved by Aspltech.in</span>
                    <span className="opacity-80 dark:opacity-70 font-medium text-xs md:text-sm">Designed with ❤️ for memorable celebrations</span>
                </p>
            </div>
        </footer >
    );
}