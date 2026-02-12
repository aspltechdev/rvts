'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const socials = [
    {
        name: "Instagram",
        href: " https://www.instagram.com/rvts_audio_visual/", // PUT YOUR INSTAGRAM LINK HERE
        // Official Instagram Gradient
        bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
        // Simpler, official-looking white icon path
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-7 md:h-7 text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    },
    {
        name: "Facebook",
        href: " https://www.facebook.com/profile.php?id=61585910755226", // PUT YOUR FACEBOOK LINK HERE
        bg: "bg-[#1877F2]", // Official Facebook Blue
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7 text-white">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.791 1.657-2.791 3.556v1.448h3.943l-.531 3.667h-3.412v7.98h-4.996Z" />
            </svg>
        )
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/research-vision-tech-services-rvts/posts/", // PUT YOUR LINKEDIN LINK HERE
        bg: "bg-[#0077b5]", // LinkedIn Blue
        svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
        )
    },
];

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false); // Start hidden since we are at top

    // Check if we should hide on this path
    // Check if we should hide on this path
    const isHiddenPath = false;

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Hide if at the very top (Hero section) - adjust 300 to match hero height preference
            const isAtTop = scrollY < 300;

            // Check if footer is visible
            let isFooterVisible = false;
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top <= windowHeight + 20) {
                    isFooterVisible = true;
                }
            }

            if (isAtTop || isFooterVisible) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && !isHiddenPath && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, pointerEvents: 'none' }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-center"
                >

                    {/* Social Icons Stack */}
                    {socials.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ scale: 0, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group block"
                        >
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${social.bg} group-hover:ring-4 ring-white/30`}>
                                {social.svg}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-xl">
                                {social.name}
                            </div>
                        </motion.a>
                    ))}


                    {/* WhatsApp Button (Main) */}
                    <a
                        href="https://wa.me/919591133004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group mt-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-9 h-9 md:w-11 md:h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 border border-white/20 transition-all duration-300 overflow-hidden p-1"
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                alt="WhatsApp"
                                width={36}
                                height={36}
                                className="w-full h-full object-contain filter drop-shadow-md"
                            />
                        </motion.div>

                        {/* Tooltip */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-xl">
                            Chat with us!
                        </div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}