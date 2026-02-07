'use client';

import { API_BASE_URL } from '@/lib/config';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [isProductsHovered, setIsProductsHovered] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
    const [isAboutHovered, setIsAboutHovered] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const pathname = usePathname();

    const router = useRouter();

    // Fetch categories with products from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = API_BASE_URL;
                const res = await fetch(`${apiUrl}/api/categories`, {
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });
                if (!res.ok) throw new Error('API request failed');

                const data = await res.json();
                if (data.categories && data.categories.length > 0) {
                    setCategories(data.categories);
                } else {
                    // If API returns empty, try static
                    throw new Error('No categories found via API');
                }
            } catch (error) {
                console.error('Failed to fetch categories, using static data:', error);
                const { getStaticCategories } = await import('@/lib/static-data');
                const staticData = getStaticCategories();
                setCategories(staticData.categories);
            }
        };
        fetchCategories();
    }, []);

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

    const handleAboutScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        setIsAboutHovered(false);

        const scrollToElement = () => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };

        if (pathname === '/about') {
            scrollToElement();
        } else {
            router.push('/about');
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
        // { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    // Split nav links for product page layout
    const leftNavLinks = navLinks.slice(0, 3); // Home, About, Products
    const rightNavLinks = navLinks.slice(3);   // Services, Blog, Contact

    // Check if we're on a product page or product detail page
    const isProductPage = pathname === '/products' || pathname?.startsWith('/products/');

    // Helper function to render a nav link
    const renderNavLink = (link) => {
        const isActive = pathname === link.href || (link.name === 'Products' && pathname?.startsWith('/products/'));

        if (link.name === 'Products') {
            return (
                <div
                    key={link.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                >
                    <div className="h-full flex items-center px-2">
                        <Link
                            href={link.href}
                            className={cn(
                                "flex items-center gap-1 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group",
                                (isActive || isProductsHovered)
                                    ? "bg-[#ff3333] text-white shadow-md shadow-red-500/20"
                                    : "text-zinc-900 hover:text-[#ff3333] hover:bg-zinc-50"
                            )}
                        >
                            {link.name}
                            <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        </Link>
                    </div>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                        {isProductsHovered && (
                            <div
                                className="fixed left-0 right-0 top-[70px] md:top-[85px] pt-4 flex justify-center z-[8000] pointer-events-none"
                                onMouseEnter={() => setIsProductsHovered(true)}
                                onMouseLeave={() => setIsProductsHovered(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-[700px] h-fit bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden pointer-events-auto"
                                >
                                    <div className="p-8">
                                        <div className="grid grid-cols-3 gap-8">
                                            {categories.map((catObj, index) => (
                                                <div key={index} className="flex flex-col gap-4">
                                                    <Link
                                                        href={`/products?category=${encodeURIComponent(catObj.category)}`}
                                                        className="text-zinc-900 font-bold text-sm hover:text-[#ff3333] transition-colors uppercase tracking-wider"
                                                    >
                                                        {catObj.category}
                                                    </Link>
                                                    <div className="flex flex-col gap-2.5">
                                                        {catObj.products.map((product, pIndex) => (
                                                            <Link
                                                                key={pIndex}
                                                                href={`/products/${product.slug}`}
                                                                className="group flex items-center gap-3 text-sm text-zinc-500 hover:text-[#ff3333] transition-colors"
                                                            >
                                                                <span className="w-1 h-1 rounded-full bg-zinc-300 group-hover:bg-[#ff3333] transition-colors" />
                                                                {product.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-between items-center">
                                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
                                                Explore our full range of professional solutions
                                            </p>
                                            <Link
                                                href="/products"
                                                className="group flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-[#ff3333] transition-all uppercase tracking-widest"
                                            >
                                                View All Collection
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    →
                                                </motion.span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        if (link.name === 'About') {
            return (
                <div
                    key={link.name}
                    className="relative h-full flex items-center justify-center"
                    onMouseEnter={() => setIsAboutHovered(true)}
                    onMouseLeave={() => setIsAboutHovered(false)}
                >
                    <Link
                        href={link.href}
                        className={cn(
                            "flex items-center gap-1 px-3 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group",
                            (isActive || isAboutHovered)
                                ? "bg-[#ff3333] text-white shadow-md shadow-red-500/20"
                                : "text-zinc-900 hover:text-[#ff3333] hover:bg-zinc-50"
                        )}
                    >
                        {link.name}
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>

                    {/* About Mega Menu Dropdown */}
                    <AnimatePresence>
                        {isAboutHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-1/2 w-[260px] bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-[8000]"
                                onMouseEnter={() => setIsAboutHovered(true)}
                                onMouseLeave={() => setIsAboutHovered(false)}
                            >
                                <div className="p-4">
                                    <div className="flex flex-col gap-1">
                                        {[
                                            { name: 'Company Overview', id: 'about-overview' },
                                            { name: 'Why Choose RVTS', id: 'about-why-choose' },
                                            { name: 'Our Partners', id: 'about-partners' }
                                        ].map((item) => (
                                            <Link
                                                key={item.name}
                                                href={`/about#${item.id}`}
                                                onClick={(e) => handleAboutScroll(e, item.id)}
                                                className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-[#ff3333] hover:text-white transition-all duration-200"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        // Standard Links
        return (
            <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                    setIsOpen(false);
                }}
                className={cn(
                    "px-3 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group",
                    isActive
                        ? "bg-[#ff3333] text-white shadow-md shadow-red-500/20"
                        : "text-zinc-900 hover:text-[#ff3333] hover:bg-zinc-50"
                )}
            >
                {link.name}
            </Link>
        );
    };

    return (
        <>
            <nav className={cn(
                "fixed left-0 right-0 mx-auto z-[7000] rounded-full border bg-white/95 backdrop-blur-xl shadow-2xl border-zinc-200 w-[94%] md:w-[95%] max-w-5xl h-[72px] md:h-[80px] flex items-center transition-all duration-300",
                scrolled ? "top-2" : "top-5"
            )}>
                <div className="flex items-center justify-between w-full h-full px-6">
                    {/* Logo - Classic Left Position */}
                    <Link href="/" className="group flex items-center shrink-0 h-full">
                        <div className="relative w-[120px] h-[40px] md:w-[130px] md:h-[46px] flex items-center">
                            <Image
                                src="/assets/rvts-logo.png"
                                alt="RVTS Logo"
                                fill
                                className="object-contain p-1"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu - All links on the right */}
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        {navLinks.map(renderNavLink)}
                    </div>

                    {/* Right Actions & Professional Toggle */}
                    <div className="flex items-center gap-6 h-full">
                        <div className="flex items-center gap-4 h-full">
                            <button
                                onClick={toggleTheme}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 border bg-zinc-100 border-zinc-200 hover:border-[#ff3333] text-zinc-900 hover:text-[#ff3333]"
                                )}
                            >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>

                        <button
                            className="lg:hidden relative w-12 h-12 flex flex-col justify-center items-center gap-2 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                                className={cn(
                                    "w-7 h-[3px] rounded-full transition-colors duration-500",
                                    isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                                )}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                                className={cn(
                                    "w-7 h-[3px] rounded-full transition-colors duration-500",
                                    isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                                )}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                                className={cn(
                                    "w-7 h-[3px] rounded-full transition-colors duration-500",
                                    isOpen ? "bg-[#ff3333]" : "bg-zinc-900"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Full Screen Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-2xl lg:hidden flex flex-col pt-32 px-8 overflow-y-auto scrollbar-hide"
                    >
                        <div className="flex flex-col gap-5 w-full pb-10">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.name === 'Products' && pathname?.startsWith('/products/'));

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between w-full py-5 text-base md:text-lg font-bold uppercase tracking-[0.15em] border-b border-zinc-800 transition-colors",
                                            isActive ? "text-[#ff3333]" : "text-white"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
