'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor,
    Cpu,
    LayoutGrid,
    Sliders,
    Speaker,
    Wifi,
    Settings,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Filter,
    X,
    Grid,
    List
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';

const ProductsListContent = () => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryQuery = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Categories
    const categories = [
        { name: "Displays & Video Walls", icon: <Monitor size={18} /> },
        { name: "Touch Screen Kiosks", icon: <LayoutGrid size={18} /> },
        { name: "PTZ / Soundbars / Trolleys", icon: <Speaker size={18} /> },
        { name: "Video Systems", icon: <Cpu size={18} /> },
        { name: "Control Systems", icon: <Sliders size={18} /> },
        { name: "Mounting Solutions", icon: <Settings size={18} /> },
        { name: "Cables & Accessories", icon: <Wifi size={18} /> },
        { name: "Interactive Installation / Digital Experience Zone", icon: <LayoutGrid size={18} /> }
    ];

    // Sync state with URL params
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [searchParams]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = API_BASE_URL;
                const res = await fetch(`${apiUrl}/api/products`, {
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });
                if (res.ok) {
                    const apiProducts = await res.json();
                    setProducts(apiProducts);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const nameMatch = (p.name || p.title || "").toLowerCase().includes(searchQuery.toLowerCase());

        let matchesCategory = false;
        if (selectedCategory === 'All Categories') {
            matchesCategory = true;
        } else {
            const pCat = (p.category || "").toLowerCase().trim();
            const selCat = selectedCategory.toLowerCase().trim();
            matchesCategory = pCat === selCat ||
                pCat.includes(selCat.split('&')[0].trim()) ||
                selCat.includes(pCat.split('&')[0].trim());
        }

        return nameMatch && matchesCategory;
    });

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#020202] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900">
                {/* Visual Elements Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-70">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] right-[-5%] text-zinc-300 dark:text-zinc-700"
                    >
                        <Settings size={300} strokeWidth={0.5} />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[10%] left-[5%] text-zinc-300 dark:text-zinc-700"
                    >
                        <Monitor size={200} strokeWidth={0.5} />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                        >
                            Professional Catalog
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9] max-w-4xl"
                        >
                            The <span className="text-brand-red italic">Solution</span> Archive
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-medium"
                        >
                            Explore our curated collection of enterprise-grade visual experiences and technical innovations.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* --- MAIN INTERFACE --- */}
            <div className="container mx-auto px-6 max-w-7xl py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* SIDENAV */}
                    <aside className="hidden lg:block lg:w-1/4 shrink-0 h-fit lg:sticky lg:top-28 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">Find Equipment</label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-red transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                                Specialized Sectors
                                <span className="w-12 h-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
                            </h3>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => setSelectedCategory('All Categories')}
                                    className={`group flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === 'All Categories'
                                        ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20 translate-x-1'
                                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                >
                                    All Collection
                                    {selectedCategory === 'All Categories' ? <ArrowRight size={16} /> : <span className="w-1 h-1 rounded-full bg-zinc-300" />}
                                </button>

                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`group flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-bold transition-all duration-300 ${selectedCategory === cat.name
                                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-black translate-x-1'
                                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`transition-transform duration-300 ${selectedCategory === cat.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                                                {cat.icon}
                                            </span>
                                            <span className="truncate max-w-[160px]">{cat.name}</span>
                                        </div>
                                        {selectedCategory === cat.name && <ArrowRight size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* PRODUCT GRID */}
                    <div className="flex-1 space-y-8 md:space-y-12">
                        {/* Mobile Search/Filter Bar */}
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-red transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search systems..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all"
                                />
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="w-[52px] h-[52px] shrink-0 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg active:scale-95 transition-all"
                            >
                                <Filter size={20} />
                            </button>
                        </div>

                        {/* Loading State */}
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
                                >
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className="bg-zinc-100 dark:bg-zinc-900 aspect-[4/5] rounded-[32px] animate-pulse" />
                                    ))}
                                </motion.div>
                            ) : filteredProducts.length > 0 ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
                                >
                                    {currentProducts.map((p, index) => (
                                        <motion.div
                                            key={p.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={`/products/${p.slug}`}
                                                className="group block relative bg-white dark:bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-zinc-100 dark:border-zinc-900 hover:border-brand-red/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-red/5"
                                            >
                                                <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-zinc-950 p-4">
                                                    {p.images && p.images[0] ? (
                                                        <Image
                                                            src={p.images[0].startsWith('http') ? p.images[0] : `${API_BASE_URL}${p.images[0].startsWith('/') ? '' : '/'}${p.images[0]}`}
                                                            alt={p.name}
                                                            fill
                                                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-200 dark:text-zinc-800">
                                                            <Monitor size={64} strokeWidth={1} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-8">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                                                            {p.name}
                                                        </h3>
                                                        <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                                                            <ArrowRight size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-32 flex flex-col items-center justify-center text-center opacity-40 bg-white dark:bg-zinc-900/50 rounded-[40px] border border-dashed border-zinc-200 dark:border-zinc-800"
                                >
                                    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                                        <X size={32} />
                                    </div>
                                    <p className="text-xl font-black uppercase tracking-tighter">No items found</p>
                                    <p className="text-sm font-medium mt-2">Adjust your filters or try a different search term.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-10 border-t border-zinc-100 dark:border-zinc-900">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-zinc-200 dark:border-zinc-800 text-[10px] md:text-sm font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95 shrink-0"
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Prev</span>
                                </button>

                                <div className="flex items-center gap-1 md:gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handlePageChange(num)}
                                            className={`w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl text-[10px] md:text-sm font-black transition-all ${currentPage === num
                                                ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20 scale-110'
                                                : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-zinc-200 dark:border-zinc-800 text-[10px] md:text-sm font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95 shrink-0"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE FILTER OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed inset-x-0 bottom-0 bg-white dark:bg-[#0a0a0a] z-[100] rounded-t-[40px] p-8 lg:hidden max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Refine Selection</h2>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Categories</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => { setSelectedCategory('All Categories'); setIsMobileMenuOpen(false); }}
                                            className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-black border transition-all ${selectedCategory === 'All Categories' ? 'bg-brand-red border-brand-red text-white' : 'border-zinc-200 dark:border-zinc-800'}`}
                                        >
                                            All Collections
                                        </button>
                                        {categories.map((cat, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setSelectedCategory(cat.name); setIsMobileMenuOpen(false); }}
                                                className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-bold border transition-all ${selectedCategory === cat.name ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'border-zinc-200 dark:border-zinc-800'}`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductsListFallback = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-t-2 border-brand-red rounded-full animate-spin" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Syncing Archive</span>
        </div>
    </div>
);

const ProductsListPage = () => {
    return (
        <Suspense fallback={<ProductsListFallback />}>
            <ProductsListContent />
        </Suspense>
    );
};

export default ProductsListPage;
