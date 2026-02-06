'use client';

import { API_BASE_URL } from '@/lib/config';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { getStaticCategories } from '@/lib/static-data';

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
                let finalCategories = data.categories || [];

                // Always merge with static data to ensure these 5 products are present
                try {
                    const staticData = getStaticCategories();

                    // Merge logic: Add static categories if they don't exist, or append products if they do
                    staticData.categories.forEach(staticCat => {
                        const existingCat = finalCategories.find(c => c.category === staticCat.category);
                        if (existingCat) {
                            // Append products that aren't already there (by slug)
                            staticCat.products.forEach(p => {
                                if (!existingCat.products.find(ep => ep.slug === p.slug)) {
                                    existingCat.products.push(p);
                                }
                            });
                        } else {
                            finalCategories.push(staticCat);
                        }
                    });
                } catch (e) {
                    console.warn("Could not merge static categories:", e);
                }

                setCategories(finalCategories);
            } catch (error) {
                console.error('Failed to fetch categories, using static data fallback:', error);
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
        { name: 'Blog', href: '/blog' },
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
                    className="relative h-full flex items-center justify-center"
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                >
                    <Link
                        href={link.href}
                        className={cn(
                            "flex items-center gap-1 px-3 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group",
                            (isActive || isProductsHovered)
                                ? "bg-[#ff3333] text-white shadow-md shadow-red-500/20"
                                : "text-zinc-900 hover:text-[#ff3333] hover:bg-zinc-50"
                        )}
                    >
                        {link.name}
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                        {isProductsHovered && (
                            <div
                                className="fixed inset-0 top-[80px] flex justify-center z-[7000] pointer-events-none"
                                onMouseEnter={() => setIsProductsHovered(true)}
                                onMouseLeave={() => setIsProductsHovered(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-[850px] h-fit bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden pointer-events-auto"
                                >
                                    <div className="p-8">
                                        <div className="flex gap-12">
                                            {(() => {
                                                // 1. Prepare and Sort Categories
                                                const sortedCats = [...categories].sort((a, b) => a.category.localeCompare(b.category));

                                                // 2. Balance into 3 columns based on total item height (Header + Products)
                                                const cols = [[], [], []];
                                                const heights = [0, 0, 0];

                                                sortedCats.forEach(cat => {
                                                    const minIdx = heights.indexOf(Math.min(...heights));
                                                    cols[minIdx].push(cat);
                                                    heights[minIdx] += (2 + Math.min(cat.products.length, 5)); // 2 for header/spacing
                                                });

                                                return cols.map((col, colIdx) => (
                                                    <div key={colIdx} className="flex-1 flex flex-col gap-10">
                                                        {col.map((catObj, index) => (
                                                            <div key={index} className="flex flex-col gap-4">
                                                                <Link
                                                                    href={`/products?category=${encodeURIComponent(catObj.category)}`}
                                                                    className="text-zinc-900 font-black text-[11px] hover:text-[#ff3333] transition-colors uppercase tracking-[0.15em] border-b border-zinc-50 pb-2"
                                                                >
                                                                    {catObj.category}
                                                                </Link>
                                                                <div className="flex flex-col gap-2">
                                                                    {catObj.products.length > 0 ? catObj.products.slice(0, 5).map((product, pIndex) => (
                                                                        <Link
                                                                            key={pIndex}
                                                                            href={`/products/${product.slug}`}
                                                                            className="group flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                                                                        >
                                                                            <span className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-[#ff3333] transition-colors" />
                                                                            <span className="truncate group-hover:translate-x-1 transition-transform">{product.name}</span>
                                                                        </Link>
                                                                    )) : (
                                                                        <span className="text-[10px] text-zinc-300 font-medium italic">General Collection</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ));
                                            })()}
                                        </div>

                                        <div className="mt-10 pt-6 border-t border-zinc-100 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                                                    Professional Solutions
                                                </p>
                                                <p className="text-[9px] text-zinc-300 mt-0.5">Updated from Admin Panel</p>
                                            </div>
                                            <Link
                                                href="/products"
                                                className="group flex items-center gap-2 bg-[#ff3333] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-red-500/20 hover:shadow-none"
                                            >
                                                View All Collection
                                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
                                className="absolute top-full left-1/2 mt-4 w-[260px] bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
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
                onClick={(e) => {
                    if (link.name === 'Services') handleScrollToSection(e, '[data-scroll="services"]');
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
        <nav className={cn(
            "fixed left-1/2 -translate-x-1/2 z-[5000] rounded-full border top-4 py-3 px-8 bg-white/90 backdrop-blur-md shadow-lg border-zinc-200 w-[95%] max-w-5xl"
        )}>
            <div className="flex items-center justify-between w-full">
                {/* Left Nav Links - Only on product pages */}
                {isProductPage && (
                    <div className="hidden lg:flex items-center gap-2 z-[6001]">
                        {leftNavLinks.map(renderNavLink)}
                    </div>
                )}

                {/* Logo - Centered on product pages, left-aligned on others */}
                <Link href="/" className={cn(
                    "group z-[6000] flex items-center shrink-0",
                    isProductPage ? "mx-2" : ""
                )}>
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

                {/* Desktop Menu - All links on non-product pages, or right links on product pages */}
                <div className={cn(
                    "hidden lg:flex items-center gap-2",
                    isProductPage && "z-[6001]"
                )}>
                    {isProductPage
                        ? rightNavLinks.map(renderNavLink)
                        : navLinks.map(renderNavLink)
                    }
                </div>

                {/* Right Actions & Professional Toggle */}
                <div className="flex items-center gap-6 z-[6001]">
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

            {/* Mobile Menu - Full Screen Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[5500] bg-white dark:bg-[#050505] lg:hidden flex flex-col pt-24 px-8 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2 w-full pb-10">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                if (link.name === 'Products') {
                                    return (
                                        <div key={link.name} className="flex flex-col w-full border-b border-zinc-100 dark:border-zinc-800">
                                            <button
                                                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                                className="flex items-center justify-between w-full py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white"
                                            >
                                                <span>{link.name}</span>
                                                <motion.div
                                                    animate={{ rotate: isMobileProductsOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown size={16} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isMobileProductsOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="flex flex-col gap-6 pl-4 pb-6">
                                                            {categories.map((catObj, index) => (
                                                                <div key={index} className="flex flex-col gap-3">
                                                                    <Link
                                                                        href={`/products?category=${encodeURIComponent(catObj.category)}`}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-[0.2em]"
                                                                    >
                                                                        {catObj.category}
                                                                    </Link>
                                                                    <div className="flex flex-col gap-2 pl-2">
                                                                        {catObj.products.slice(0, 5).map((product, pIndex) => (
                                                                            <Link
                                                                                key={pIndex}
                                                                                href={`/products/${product.slug}`}
                                                                                onClick={() => setIsOpen(false)}
                                                                                className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#ff3333] transition-colors"
                                                                            >
                                                                                • {product.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                if (link.name === 'About') {
                                    return (
                                        <div key={link.name} className="flex flex-col w-full border-b border-zinc-100 dark:border-zinc-800">
                                            <button
                                                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                                                className="flex items-center justify-between w-full py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white"
                                            >
                                                <span>{link.name}</span>
                                                <motion.div
                                                    animate={{ rotate: isMobileAboutOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown size={16} />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isMobileAboutOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="flex flex-col gap-3 pl-4 pb-6">
                                                            {[
                                                                { name: 'Company Overview', id: 'about-overview' },
                                                                { name: 'Why Choose RVTS', id: 'about-why-choose' },
                                                                { name: 'Our Partners', id: 'about-partners' }
                                                            ].map(item => (
                                                                <Link
                                                                    key={item.name}
                                                                    href={`/about#${item.id}`}
                                                                    onClick={(e) => handleAboutScroll(e, item.id)}
                                                                    className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#ff3333] dark:hover:text-[#ff3333] uppercase tracking-wider transition-colors"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.name === 'Services') handleScrollToSection(e, '[data-scroll="services"]');
                                            else setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between w-full py-4 text-sm font-bold uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 transition-colors",
                                            isActive ? "text-[#ff3333]" : "text-zinc-900 dark:text-white"
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
        </nav>
    );
}

