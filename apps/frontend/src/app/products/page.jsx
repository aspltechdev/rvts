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
import { STATIC_PRODUCTS } from '@/lib/static-data';

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
                const res = await fetch(`${apiUrl}/api/products`);
                let apiProducts = [];
                if (res.ok) {
                    apiProducts = await res.json();
                }

                const mergedProducts = [...apiProducts];
                STATIC_PRODUCTS.forEach(sp => {
                    if (!mergedProducts.find(ap => ap.slug === sp.slug)) {
                        mergedProducts.push(sp);
                    }
                });

                setProducts(mergedProducts);
            } catch (err) {
                console.warn("Fetch error, using static data only:", err);
                setProducts(STATIC_PRODUCTS);
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
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#020202] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-zinc-400/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                            </span>
                            Professional Catalog
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none"
                        >
                            The <span className="text-brand-red italic">Solution</span> Archive
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
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

                    {/* --- SIDEBAR / FILTER ARCHITECTURE --- */}
                    <aside className="lg:w-1/4 shrink-0 h-fit lg:sticky lg:top-28 space-y-10">
                        {/* Search Component */}
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

                        {/* Category Navigation */}
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

                    {/* --- PRODUCT GRID ARCHITECTURE --- */}
                    <div className="flex-1 space-y-12">
                        {/* Status bar */}
                        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 pl-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="text-xs font-black uppercase tracking-widest text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 pr-4">
                                    Archive View
                                </div>
                                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                    {filteredProducts.length} <span className="text-zinc-400">matching systems</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            >
                                <Filter size={18} />
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
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                        <div key={n} className="bg-zinc-100 dark:bg-zinc-900 aspect-[4/5] rounded-[32px] animate-pulse" />
                                    ))}
                                </motion.div>
                            ) : filteredProducts.length > 0 ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
                                                {/* Image */}
                                                <div className="relative aspect-[16/11] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                                                    {p.images && p.images[0] ? (
                                                        <Image
                                                            src={p.images[0].startsWith('http') ? p.images[0] : `${API_BASE_URL}${p.images[0].startsWith('/') ? '' : '/'}${p.images[0]}`}
                                                            alt={p.name}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-200 dark:text-zinc-800">
                                                            <Monitor size={64} strokeWidth={1} />
                                                        </div>
                                                    )}
                                                    {/* Badge */}
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-300 border border-white/20">
                                                            NEW TECH
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-8">
                                                    <div className="mb-6 h-12 flex flex-col justify-center">
                                                        <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                                                            {p.name}
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-900 group-hover:border-brand-red/20 transition-colors">
                                                        <div className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-400">
                                                            Internal Specs
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-300">
                                                            <ArrowRight size={18} />
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

                        {/* --- PAGINATION ARCHITECTURE --- */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-10 border-t border-zinc-100 dark:border-zinc-900">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                >
                                    <ChevronLeft size={16} /> Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handlePageChange(num)}
                                            className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === num
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
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                >
                                    Next <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MOBILE FILTER OVERLAY --- */}
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
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-x-0 bottom-0 bg-white dark:bg-[#0a0a0a] z-[100] rounded-t-[40px] p-8 lg:hidden max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Refine Selection</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Categories</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => { setSelectedCategory('All Categories'); setIsMobileMenuOpen(false); }}
                                            className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${selectedCategory === 'All Categories' ? 'bg-brand-red border-brand-red text-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'}`}
                                        >
                                            All Collections
                                        </button>
                                        {categories.map((cat, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setSelectedCategory(cat.name); setIsMobileMenuOpen(false); }}
                                                className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-bold border transition-all ${selectedCategory === cat.name ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'}`}
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
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Synching Archive</span>
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

