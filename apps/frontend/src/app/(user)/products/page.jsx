'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Monitor, Cpu, LayoutGrid, Sliders, Speaker, Wifi, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';

const ProductsListContent = () => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryQuery = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All Categories');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Categories
    const categories = [
        { name: "Displays & Video Walls", icon: <Monitor size={20} /> },
        { name: "Touch Screen Kiosks", icon: <LayoutGrid size={20} /> },
        { name: "PTZ / Soundbars / Trolleys", icon: <Speaker size={20} /> },
        { name: "Video Systems", icon: <Cpu size={20} /> },
        { name: "Control Systems", icon: <Sliders size={20} /> },
        { name: "Mounting Solutions", icon: <Settings size={20} /> },
        { name: "Cables & Accessories", icon: <Wifi size={20} /> }
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
            // Check exact match or partial match
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
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans pb-20 transition-colors duration-300">
            {/* HERO BANNER SECTION */}
            <div className="relative w-full h-[300px] md:h-[400px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300" />
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl z-10">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white transition-colors">
                        Our <span className="text-[#ff3333]">Products</span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-medium transition-colors">
                        Explore our comprehensive range of professional AV solutions designed for modern spaces.
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff3333]/5 rounded-full blur-3xl transform translate-y-1/2 translate-x-1/2" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-zinc-300/20 dark:bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* SIDEBAR FILTER */}
                    <aside className={`lg:w-1/4 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-xl dark:shadow-black/40 p-6 border border-zinc-100 dark:border-zinc-800 h-fit transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                                <Sliders size={20} className="text-[#ff3333]" />
                                Categories
                            </h2>
                            <button className="lg:hidden text-zinc-400" onClick={() => setIsMobileMenuOpen(false)}>
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setSelectedCategory('All Categories')}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 flex items-center justify-between group
                                    ${selectedCategory === 'All Categories'
                                        ? 'bg-[#ff3333] text-white shadow-lg shadow-red-500/30'
                                        : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                                All Products
                                {selectedCategory === 'All Categories' && <ChevronRight size={16} />}
                            </button>

                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-between group
                                        ${selectedCategory === cat.name
                                            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-[#ff3333] dark:hover:text-[#ff3333]'}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`transition-colors ${selectedCategory === cat.name ? 'text-white dark:text-black' : 'text-zinc-400 group-hover:text-[#ff3333]'}`}>
                                            {cat.icon}
                                        </span>
                                        {cat.name}
                                    </span>
                                    {selectedCategory === cat.name && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="lg:w-3/4 flex flex-col gap-8">

                        {/* SEARCH & MOBILE TOGGLE */}
                        <div className="bg-white dark:bg-[#0a0a0a] p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
                            <button
                                className="lg:hidden w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <Sliders size={18} /> Filters
                            </button>

                            <div className="relative w-full md:w-1/2">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3333]/50 focus:border-[#ff3333] transition-all text-sm"
                                />
                            </div>

                            <div className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-400">
                                {filteredProducts.length} Results Found
                            </div>
                        </div>

                        {/* PRODUCT GRID */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <div key={n} className="bg-zinc-200 dark:bg-zinc-800 h-[350px] rounded-xl" />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProducts.map((p, index) => (
                                        <Link
                                            href={`/products/${p.slug}`}
                                            key={index}
                                            className="group bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                                        >
                                            {/* IMAGE */}
                                            <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                                {p.images && p.images[0] ? (
                                                    <Image
                                                        src={p.images[0].startsWith('http') ? p.images[0] : (API_BASE_URL + p.images[0])}
                                                        alt={p.name}
                                                        fill
                                                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                                                        <Monitor size={48} />
                                                    </div>
                                                )}

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                        View Details
                                                    </span>
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
                                    <div className="flex items-center justify-center gap-2 mt-8">
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
            </div>
        </main>
    );
};

// Error Boundary for Suspense
const ProductsListFallback = () => (
    <div className="min-h-screen pt-24 text-center flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ff3333] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-500 font-medium">Loading Products...</p>
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
