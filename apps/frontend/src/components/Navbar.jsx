'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const pathname = usePathname();

    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const handleScrollToSection = (e, selector) => {
        e.preventDefault();
        setIsOpen(false);

        const scrollToElement = () => {
            let element = document.getElementById(selector);
            if (!element) {
                try {
                    element = document.querySelector(selector);
                } catch (err) {
                    console.warn(err);
                }
            }
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
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            // Close mobile menu on scroll
            if (currentScrollY > 20) {
                setIsOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-[5000] transition-all duration-700 px-6 md:px-16 border-b",
            scrolled
                ? "py-3 bg-white shadow-2xl border-zinc-100"
                : "py-6 bg-white border-transparent"
        )}>
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                {/* Logo with Glow Effect */}
                <Link href="/" className="group relative z-[6000] flex items-center gap-2">
                    <div className="relative w-[110px] h-[40px] md:w-[130px] md:h-[46px]">
                        <Image
                            src="/assets/rvts-logo.png"
                            alt="RVTS Logo"
                            fill
                            className="object-contain p-1"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu - High End Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const isProductLink = link.name === 'Products';

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.name === 'Products') handleScrollToSection(e, 'products-showcase');
                                    if (link.name === 'Services') handleScrollToSection(e, '[data-scroll="services"]');
                                }}
                                className={cn(
                                    "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group text-zinc-900 hover:text-[#ff3333]",
                                    isActive && "text-[#ff3333]"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 group-hover:w-4 group-hover:bg-[#ff3333]",
                                    isActive ? "w-6 bg-[#ff3333]" : "w-0 bg-zinc-900"
                                )} />
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions & Professional Toggle */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-xl transition-all duration-300 border relative z-[6000] bg-zinc-100 border-zinc-200 hover:border-[#ff3333] text-zinc-900 hover:text-[#ff3333]",
                                scrolled ? "shadow-sm" : ""
                            )}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <button
                        className="lg:hidden relative w-10 h-10 z-[6000] group flex flex-col justify-center items-center gap-1.5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                            className={cn(
                                "w-6 h-[2px] rounded-full transition-colors duration-500",
                                isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                            )}
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                            className={cn(
                                "w-6 h-[2px] rounded-full transition-colors duration-500",
                                isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                            )}
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                            className={cn(
                                "w-6 h-[2px] rounded-full transition-colors duration-500",
                                isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                            )}
                        />
                    </button>
                </div>
            </div>

            {/* Compact Mobile Menu Card */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[5500] bg-white dark:bg-black lg:hidden flex flex-col justify-center items-center"
                    >
                        {/* Background Subtle Gradient */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[#ff3333]/5 blur-[60px] -z-10 rounded-2xl" />

                        <div className="flex flex-col gap-6 items-center text-center">
                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.05 * i, duration: 0.3 }}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.name === 'Products') handleScrollToSection(e, 'products-showcase');
                                                else if (link.name === 'Services') handleScrollToSection(e, '[data-scroll="services"]');
                                                else setIsOpen(false);
                                            }}
                                            className="group flex flex-col items-center py-2 w-full hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                        >
                                            <span className={cn(
                                                "text-xl font-black uppercase tracking-widest transition-all duration-300",
                                                isActive ? "text-[#ff3333]" : "text-zinc-900 dark:text-white"
                                            )}>
                                                {link.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}