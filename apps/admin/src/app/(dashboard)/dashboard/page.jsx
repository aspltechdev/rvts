'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Edit2, Trash2, Plus, Package, CheckCircle, FileText, Eye, X } from 'lucide-react';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const selectedCategory = searchParams.get('category') || 'All';

    const fetchProducts = () => {
        setLoading(true);
        api.get(`/api/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Reset to page 1 when category or query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query, selectedCategory]);

    const handleCategoryChange = (cat) => {
        const params = new URLSearchParams(searchParams);
        if (cat === 'All') {
            params.delete('category');
        } else {
            params.set('category', cat);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const deleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                await api.delete(`/api/products/${id}`);
                fetchProducts();
            } catch (e) {
                alert('Failed to delete product');
                console.error(e);
            }
        }
    };

    // Extract unique categories
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean).sort())];

    // Filter products based on search query AND category
    const filteredProducts = products.filter(p => {
        const matchesQuery = !query ||
            p.name?.toLowerCase().includes(query) ||
            p.slug?.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 px-4 md:px-0">
            {/* Header & Stats */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Products Management</h2>
                        <p className="text-gray-500 dark:text-zinc-400 mt-1">Efficiently manage your product catalogue.</p>
                    </div>
                    <Link href="/products/new" className="bg-brand-red text-white px-8 py-4 rounded-xl font-black hover:bg-red-600 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-full md:w-auto justify-center uppercase tracking-widest text-xs">
                        <Plus size={20} strokeWidth={4} />
                        New Product
                    </Link>
                </div>

                {/* Stats Grid - Simplified to only Total */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div className="bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 p-8 rounded-3xl shadow-sm flex items-center gap-6 max-w-sm">
                        <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red">
                            <Package size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-zinc-500 text-xs font-black uppercase tracking-widest">In Catalogue</p>
                            <p className="text-4xl font-black text-gray-900 dark:text-white leading-none mt-1">{loading ? '...' : products.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-zinc-900 border-2 border-gray-50 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 dark:bg-black/40 text-gray-900 dark:text-zinc-400 uppercase text-xs font-black tracking-widest border-b-2 border-gray-100 dark:border-zinc-800">
                            <tr>
                                <th className="p-8">Product Name</th>
                                <th className="p-8">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-900 dark:text-white uppercase font-black text-xs">Category</span>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                            className="bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 text-sm font-bold focus:ring-2 focus:ring-brand-red cursor-pointer text-brand-red px-6 py-2.5 rounded-2xl transition-all hover:border-brand-red outline-none shadow-sm min-w-[220px]"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th className="p-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-gray-50 dark:divide-zinc-800/50">
                            {(query || selectedCategory !== 'All') && (
                                <tr className="bg-brand-red/5 dark:bg-brand-red/10 border-b border-brand-red/10">
                                    <td colSpan={3} className="p-4 px-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                                                <span className="bg-brand-red text-white px-3 py-1 rounded-full text-[10px]">Filter Active</span>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span>Found {filteredProducts.length} items</span>
                                                    {query && <span className="text-brand-red tracking-tight">"{query}"</span>}
                                                    {selectedCategory !== 'All' && (
                                                        <>
                                                            <span className="text-gray-400">in</span>
                                                            <span className="text-brand-red tracking-tight">{selectedCategory}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => router.push(pathname)}
                                                className="bg-brand-red text-white px-5 py-2 rounded-xl text-[10px] font-black shadow-lg shadow-brand-red/20 hover:scale-105 transition-all flex items-center gap-2 uppercase"
                                            >
                                                <X size={14} strokeWidth={4} />
                                                Clear Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {loading ? (
                                <tr><td colSpan={3} className="p-20 text-center text-gray-400 dark:text-zinc-600 font-bold">Refreshing products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-24 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-300 dark:text-zinc-600 mb-2">
                                                <Package size={32} />
                                            </div>
                                            <p className="text-gray-900 dark:text-white font-black text-lg">Empty list</p>
                                            <p className="text-gray-500 dark:text-zinc-500 text-sm max-w-xs mx-auto">
                                                {query ? `No items matched your search for "${query}"` : 'No products found in this category.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentProducts.map((p) => (
                                    <tr key={p.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-all duration-300">
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-zinc-900 overflow-hidden flex-shrink-0 border-2 border-gray-100 dark:border-zinc-800 group-hover:border-brand-red/20 transition-all shadow-sm">
                                                    {(() => {
                                                        const img = p.images?.[0];
                                                        if (!img) return (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-700">
                                                                <Package size={20} />
                                                            </div>
                                                        );

                                                        let src = img;
                                                        if (!img.startsWith('http')) {
                                                            const baseUrl = 'https://researchvisions.com';
                                                            src = `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
                                                        }

                                                        return <Image src={src} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} unoptimized />;
                                                    })()}
                                                </div>
                                                <div className="text-gray-900 dark:text-white font-extrabold text-lg group-hover:text-brand-red transition-all max-w-[600px] truncate" title={p.name}>
                                                    {p.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-wide">{p.category || 'Standard'}</span>
                                                <span className="text-[10px] text-gray-400 dark:text-zinc-600 uppercase font-black tracking-widest mt-1 italic">Classification</span>
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <a
                                                    href={`https://researchvisions.com/products/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 text-gray-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-2xl transition-all shadow-sm"
                                                    title="Live Preview"
                                                >
                                                    <Eye size={20} strokeWidth={2.5} />
                                                </a>

                                                <Link
                                                    href={`/products/${p.slug}/edit`}
                                                    className="p-3 text-gray-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-2xl transition-all shadow-sm"
                                                    title="Modify"
                                                >
                                                    <Edit2 size={20} strokeWidth={2.5} />
                                                </Link>

                                                <button
                                                    onClick={() => deleteProduct(p.slug)}
                                                    className="p-3 text-gray-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all shadow-sm"
                                                    title="Discard"
                                                >
                                                    <Trash2 size={20} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!loading && totalPages > 1 && (
                    <div className="p-8 bg-gray-50/50 dark:bg-black/20 border-t-2 border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                            Page <span className="text-gray-900 dark:text-white">{currentPage}</span> of <span className="text-gray-900 dark:text-white">{totalPages}</span>
                            <span className="mx-3 text-gray-300">|</span>
                            Displaying <span className="text-gray-900 dark:text-white">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of {filteredProducts.length}
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-6 py-3 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-red transition-all shadow-sm"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-8 py-3 bg-brand-red text-white rounded-2xl text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg shadow-brand-red/20"
                            >
                                Next Page
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
