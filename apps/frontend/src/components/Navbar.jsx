'use client';

import { API_BASE_URL } from '@/lib/config';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sun, Moon, ChevronDown, ChevronRight } from 'lucide-react';
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
    const [activeCategory, setActiveCategory] = useState(null);
    const pathname = usePathname();

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

                // Ensure we handle both {categories: [...]} and सीधा array responses
                const finalCategories = data.categories || (Array.isArray(data) ? data : []);

                if (finalCategories.length > 0) {
                    setCategories(finalCategories);
                    setActiveCategory(finalCategories[0].category || finalCategories[0].name);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
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

    const truncateName = (name, maxWords = 5) => {
        if (!name) return "";
        const words = name.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return name;
    };

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
                "fixed left-0 right-0 mx-auto z-[7000] rounded-full border transition-all duration-300 flex items-center bg-white shadow-lg border-zinc-200",
                scrolled
                    ? "top-3 w-[92%] md:w-[90%] h-[68px] md:h-[72px]"
                    : "top-6 w-[94%] md:w-[95%] max-w-6xl h-[72px] md:h-[80px]"
            )}>
                <div className="flex items-center justify-between w-full h-full px-6">
                    {isProductPage ? (
                        <>
                            {/* Mobile Theme Toggle (Left) */}
                            <div className="lg:hidden flex-1 flex items-center justify-start">
                                <button
                                    onClick={toggleTheme}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 border bg-zinc-100 border-zinc-200 hover:border-[#ff3333] text-zinc-900 hover:text-[#ff3333]"
                                    )}
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            </div>

                            {/* Product Page Layout: Left Menu | Logo Center | Right Menu (Desktop) */}
                            <div className="hidden lg:flex items-center gap-1 flex-1">
                                {leftNavLinks.map(renderNavLink)}
                            </div>

                            {/* Center Logo */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                <Link href="/" className="group flex items-center shrink-0 h-full">
                                    <div className="relative w-[220px] h-[60px] md:w-[280px] md:h-[75px] flex items-center justify-center">
                                        <Image
                                            src="/assets/productpagelogo-removebg-preview.png"
                                            alt="RVTS Logo"
                                            fill
                                            className="object-contain scale-[1.5] md:scale-[2.0]"
                                            priority
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end mr-4">
                                {rightNavLinks.map(renderNavLink)}
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

                    {/* Right Actions & Professional Toggle */}
                    <div className={cn(
                        "flex items-center gap-6 h-full",
                        isProductPage ? "flex-1 lg:flex-none justify-end" : ""
                    )}>
                        <div className={cn(
                            "flex items-center gap-4 h-full",
                            isProductPage ? "hidden lg:flex" : "flex"
                        )}>
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

            {/* Products Mega Menu Dropdown - Decoupled from Link for better fixed positioning */}
            <AnimatePresence>
                {isProductsHovered && (
                    <div
                        className="fixed left-0 right-0 top-[70px] md:top-[85px] pt-2 flex justify-center z-[8000] pointer-events-none"
                        onMouseEnter={() => setIsProductsHovered(true)}
                        onMouseLeave={() => setIsProductsHovered(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="w-[750px] bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden pointer-events-auto"
                        >
                            <div className="flex h-[380px]">
                                {/* Left Side: Categories */}
                                <div className="w-[300px] bg-zinc-50 border-r border-zinc-200 overflow-y-auto scrollbar-hide">
                                    <div className="flex flex-col">
                                        <Link
                                            href="/products"
                                            className="px-6 py-4 border-b border-zinc-200 font-bold text-sm text-zinc-900 hover:bg-white transition-colors"
                                            onClick={() => setIsProductsHovered(false)}
                                        >
                                            All Products
                                        </Link>
                                        {categories.map((catObj, index) => (
                                            <div
                                                key={index}
                                                onMouseEnter={() => setActiveCategory(catObj.category)}
                                                className={cn(
                                                    "px-6 py-4 flex items-center justify-between cursor-pointer transition-all duration-200 group border-b border-zinc-100",
                                                    activeCategory === catObj.category
                                                        ? "bg-white text-[#ff3333] shadow-inner"
                                                        : "text-zinc-600 hover:bg-white hover:text-[#ff3333]"
                                                )}
                                            >
                                                <span className="text-[13px] font-bold uppercase tracking-wider">
                                                    {catObj.category}
                                                </span>
                                                <ChevronRight className={cn(
                                                    "w-4 h-4 transition-transform duration-300",
                                                    activeCategory === catObj.category ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-100"
                                                )} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side: Products */}
                                <div className="flex-1 bg-white overflow-y-auto scrollbar-hide p-6">
                                    <div className="flex flex-col gap-0">
                                        {activeCategory && categories.find(c => c.category === activeCategory)?.products.map((product, pIndex) => (
                                            <Link
                                                key={pIndex}
                                                href={`/products/${product.slug}`}
                                                className="group flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-all duration-200 border-b border-zinc-50 last:border-0"
                                                onClick={() => setIsProductsHovered(false)}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[13px] font-bold text-zinc-900 group-hover:text-[#ff3333] transition-colors leading-tight uppercase">
                                                        {truncateName(product.name)}
                                                    </span>
                                                </div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-[#ff3333] transition-colors" />
                                            </Link>
                                        ))}

                                        {(!activeCategory || !categories.find(c => c.category === activeCategory)?.products.length) && (
                                            <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4 mt-20">
                                                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-zinc-400 animate-spin" />
                                                </div>
                                                <p className="text-sm font-medium uppercase tracking-widest">Loading solutions...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Footer */}
                            <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-200 flex justify-between items-center bg-gradient-to-r from-zinc-50 to-white">
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">
                                    Professional AV & IT Solutions Provider
                                </p>
                                <Link
                                    href="/products"
                                    className="group flex items-center gap-2 text-[10px] font-black text-zinc-900 hover:text-[#ff3333] transition-all uppercase tracking-[0.2em]"
                                    onClick={() => setIsProductsHovered(false)}
                                >
                                    View Full Catalog
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
