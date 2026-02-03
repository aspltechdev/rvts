'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Monitor, Cpu, LayoutGrid, Sliders, Speaker, Wifi, Settings, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

<<<<<<< HEAD
const ProductsListPage = ({ searchParams }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryQuery = searchParams?.category;
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Updated categories to match the sidebar design
    const categories = [
        { name: "Displays & Video Walls", icon: <Monitor size={20} /> },
        { name: "Touch Screen Kiosks", icon: <LayoutGrid size={20} /> },
        { name: "PTZ / Soundbars / Trolleys", icon: <Speaker size={20} /> },
        { name: "Video Systems", icon: <Cpu size={20} /> },
        { name: "Control Systems", icon: <Sliders size={20} /> },
        { name: "Mounting Solutions", icon: <Settings size={20} /> },
        { name: "Cables & Accessories", icon: <Wifi size={20} /> }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'
                // Try fetching from local API if available
                const res = await fetch(`${apiUrl}/api/products`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.warn("Fetch error, using static data:", err);
                const { STATIC_PRODUCTS } = await import('@/lib/static-data');
                setProducts(STATIC_PRODUCTS);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
=======
    import { staticProducts } from '@/lib/static-products';

    const ProductsListPage = ({ searchParams }) => {
        const [products, setProducts] = useState(staticProducts);
        const [loading, setLoading] = useState(false);
        const categoryQuery = searchParams?.category;
        const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All Categories');
        const [searchQuery, setSearchQuery] = useState('');
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        
        // Pagination State
        const [currentPage, setCurrentPage] = useState(1);
        const productsPerPage = 10;
    
        // Updated categories to match the sidebar design
        const categories = [
            { name: "Displays & Video walls", icon: <Monitor size={20} /> },
            { name: "Touch Screen Kiosks", icon: <LayoutGrid size={20} /> },
            { name: "PTZ / Soundbars / Trolleys", icon: <Speaker size={20} /> },
            { name: "Video Systems", icon: <Cpu size={20} /> },
            { name: "Control Systems", icon: <Sliders size={20} /> },
            { name: "Mounting Solutions", icon: <Settings size={20} /> },
            { name: "Cables & Accessories", icon: <Wifi size={20} /> }
        ];
    
        useEffect(() => {
            // We use static products now as per requirements
            setProducts(staticProducts);
            setLoading(false);
        }, []);

>>>>>>> a19b4622f43da3cfdf4830d566d8276b4c339439

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
            // Flexible matching for categories
            const pCat = (p.category || "").toLowerCase().trim();
            const selCat = selectedCategory.toLowerCase().trim();
            // Check exact match or partial match (e.g. "Displays" matching "Displays & Video Walls")
            matchesCategory = pCat === selCat ||
                pCat.includes(selCat.split('&')[0].trim()) ||
                selCat.includes(pCat.split('&')[0].trim());
        }

        return nameMatch && matchesCategory;
    });

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Optional: Scroll to top of grid
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans pb-20 transition-colors duration-300">

            {/* HERO BANNER SECTION */}
            <div className="relative w-full h-[300px] md:h-[400px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden transition-colors duration-300">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-100/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80 z-10" />
                    <Image
                        src="/assets/products-hero-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-10 dark:opacity-40 scale-105"
                        priority
                    />
                </div>

                <div className="relative z-20 w-full max-w-[1700px] mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Product Categories
                    </h1>
                    <p className="text-zinc-600 dark:text-gray-300 max-w-2xl text-sm md:text-lg leading-relaxed mb-8">
                        Explore our comprehensive range of Pro AV solutions designed for performance and reliability.
                    </p>

                    {/* Decorative Icons row */}
                    <div className="flex gap-6 md:gap-8 opacity-20 dark:opacity-40 hidden sm:flex text-black dark:text-white">
                        {categories.slice(0, 5).map((cat, i) => (
                            <div key={i} className="transform hover:scale-110 transition-transform duration-300">
                                {React.cloneElement(cat.icon, { size: 28, strokeWidth: 1.5 })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 xl:gap-16">

                {/* MOBILE CATEGORY SELECTOR (Visible only on lg and below) */}
                <div className="lg:hidden w-full mb-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-bold text-zinc-900 dark:text-zinc-100 transition-colors"
                    >
                        <span>{selectedCategory}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMobileMenuOpen && (
                        <div className="mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden z-30 relative transition-colors">
                            <button
                                onClick={() => { setSelectedCategory('All Categories'); setIsMobileMenuOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-zinc-100 dark:border-zinc-800 transition-colors ${selectedCategory === 'All Categories' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/20' : 'text-zinc-600 dark:text-zinc-300'}`}
                            >
                                All Categories
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => { setSelectedCategory(cat.name); setIsMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-zinc-100 dark:border-zinc-800 last:border-none transition-colors ${selectedCategory === cat.name ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/20' : 'text-zinc-600 dark:text-zinc-300'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* SIDEBAR SELECTION (Desktop Only) */}
                <aside className="hidden lg:block w-[240px] xl:w-[260px] flex-shrink-0">
                    <h2 className="text-xl md:text-2xl font-bold text-[#ff3333] mb-6 md:mb-8 px-1">
                        All Categories
                    </h2>

                    <div className="flex flex-col space-y-1">
                        <button
                            onClick={() => setSelectedCategory('All Categories')}
                            className={`text-left px-4 py-3 text-sm font-bold transition-all rounded-r-lg border-l-[3px] ${selectedCategory === 'All Categories'
                                ? 'text-[#ff3333] dark:text-[#ff4444] border-[#ff3333] bg-red-50 dark:bg-red-900/10'
                                : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                }`}
                        >
                            View All Collection
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`text-left px-4 py-3 text-sm font-bold transition-all rounded-r-lg border-l-[3px] ${selectedCategory === cat.name
                                    ? 'text-[#ff3333] dark:text-[#ff4444] border-[#ff3333] bg-red-50 dark:bg-red-900/10'
                                    : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* PRODUCT LISTING */}
                <div className="flex-1 w-full">
                    {/* SEARCH HEADER */}
                    <div className="w-full mb-8 md:mb-12">
                        <div className="flex items-center w-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#111] h-10 md:h-12 shadow-sm focus-within:shadow-md focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-all duration-300 rounded-lg overflow-hidden">
                            <div className="pl-4 text-zinc-400 dark:text-zinc-500">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 h-full px-4 text-zinc-700 dark:text-zinc-200 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm md:text-base bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="h-full px-6 md:px-10 bg-[#222] dark:bg-zinc-800 hover:bg-[#ff3333] dark:hover:bg-[#ff3333] text-white font-bold uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* RESULTS GRID */}
                    {loading ? (
                        <div className="w-full py-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 border-4 border-zinc-100 dark:border-zinc-800 border-t-[#ff3333] dark:border-t-[#ff3333] rounded-full animate-spin" />
                            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Loading Repository...</span>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 mb-16">
                                {currentProducts.map((p) => (
                                    <Link
                                        href={`/products/${p.slug}`}
                                        key={p.id}
                                        className="group flex flex-col h-full bg-white dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 rounded-xl overflow-hidden"
                                    >
                                        {/* CARD IMAGE */}
                                        <div className="aspect-square bg-zinc-50 dark:bg-zinc-800/80 relative flex items-center justify-center p-2 overflow-hidden">
                                            {/* Subtle pattern overlay */}
                                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 10px)' }} />

                                            <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                                                {p.images?.[0] ? (
                                                    <Image
                                                        src={p.images[0]}
                                                        alt={p.name}
                                                        fill
                                                        className="object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-300"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-zinc-300 dark:text-zinc-600">
                                                        <Monitor size={48} strokeWidth={1} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* CARD TITLE & INFO */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="text-[10px] font-bold text-[#ff3333] dark:text-[#ff5555] uppercase tracking-wider mb-2">
                                                {p.category}
                                            </div>
                                            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-[#ff3333] dark:group-hover:text-[#ff4444] transition-colors leading-snug">
                                                {p.name}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg disabled:opacity-30 hover:border-[#ff3333] dark:hover:border-[#ff3333] hover:text-[#ff3333] dark:hover:text-[#ff3333] text-zinc-500 dark:text-zinc-400 transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => handlePageChange(number)}
                                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === number
                                                ? 'bg-[#ff3333] text-white shadow-lg shadow-red-500/30'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg disabled:opacity-30 hover:border-[#ff3333] dark:hover:border-[#ff3333] hover:text-[#ff3333] dark:hover:text-[#ff3333] text-zinc-500 dark:text-zinc-400 transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}

                            {filteredProducts.length > 0 && (
                                <div className="text-center mt-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                    Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} Products
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center opacity-50">
                            <p className="text-xl font-medium text-zinc-400 dark:text-zinc-500">No products found for your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductsListPage;
