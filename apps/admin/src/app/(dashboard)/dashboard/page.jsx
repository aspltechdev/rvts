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
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header & Stats */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Dashboard</h2>
                        <p className="text-gray-500 dark:text-zinc-400 mt-1">Manage your catalogue and view performance.</p>
                    </div>
                    <Link href="/products/new" className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 shadow-md shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-full md:w-auto justify-center">
                        <Plus size={20} strokeWidth={3} />
                        New Product
                    </Link>
                </div>

                {/* Stats Grid - Single Total Products Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4 max-w-sm">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : products.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800 text-left">
                            <thead className="bg-gray-50/50 dark:bg-black/20 text-gray-800 dark:text-zinc-300 uppercase text-[10px] md:text-xs font-bold tracking-wider border-b border-gray-100 dark:border-zinc-800">
                                <tr>
                                    <th className="p-4 md:p-6 min-w-[200px] md:min-w-0">Product</th>
                                    <th className="p-4 md:p-6 hidden sm:table-cell">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest hidden lg:inline">Category</span>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => handleCategoryChange(e.target.value)}
                                                className="bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 text-[10px] md:text-sm font-bold focus:ring-2 focus:ring-brand-red cursor-pointer text-brand-red px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all hover:border-brand-red outline-none shadow-sm min-w-[120px] md:min-w-[180px]"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </th>
                                    <th className="p-4 md:p-6 text-right text-[10px] md:text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                {(query || selectedCategory !== 'All') && (
                                    <tr className="bg-brand-red/5 dark:bg-brand-red/10 border-b border-brand-red/10">
                                        <td colSpan={3} className="px-4 md:px-6 py-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 text-[10px] md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                                    <span className="bg-brand-red text-white px-2 py-0.5 rounded text-[10px] font-black">Filtered</span>
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span>Found {filteredProducts.length} items</span>
                                                        {query && <span className="text-brand-red font-black">"{query}"</span>}
                                                        {selectedCategory !== 'All' && (
                                                            <>
                                                                <span className="text-gray-400">in</span>
                                                                <span className="text-brand-red font-black">{selectedCategory}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        router.push(pathname);
                                                    }}
                                                    className="bg-brand-red text-white px-4 py-1.5 rounded-lg text-[10px] font-black shadow-sm shadow-brand-red/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <X size={14} strokeWidth={3} />
                                                    CLEAR ALL
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {loading ? (
                                    <tr><td colSpan={3} className="p-12 text-center text-gray-500 dark:text-zinc-500">Loading products...</td></tr>
                                ) : filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-16 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 dark:text-zinc-500 mb-2">
                                                    <Package size={24} />
                                                </div>
                                                <p className="text-gray-900 dark:text-white font-medium">No products found</p>
                                                <p className="text-gray-500 dark:text-zinc-500 text-sm">
                                                    {query ? `Try a different search term for "${query}"` : 'Get started by creating your first product.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentProducts.map((p) => (
                                        <tr key={p.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                            <td className="p-4 md:p-6">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700/50">
                                                        {(() => {
                                                            const img = p.images?.[0];
                                                            if (!img) return (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-600">
                                                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                                                                </div>
                                                            );
                                                            let src = img;
                                                            if (!img.startsWith('http')) {
                                                                const baseUrl = 'https://researchvisions.com';
                                                                src = `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
                                                            }
                                                            return <Image src={src} width={48} height={48} className="w-full h-full object-cover" alt={p.name} unoptimized />;
                                                        })()}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <div className="text-gray-900 dark:text-white font-bold text-sm md:text-base group-hover:text-brand-red transition-colors max-w-[180px] sm:max-w-xs md:max-w-md truncate" title={p.name}>
                                                            {p.name}
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 dark:text-zinc-600 font-black uppercase md:hidden tracking-widest mt-0.5 truncate max-w-[150px]">
                                                            {p.category || 'Uncategorized'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-6 hidden sm:table-cell">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-gray-900 dark:text-white font-black text-xs truncate max-w-[120px] lg:max-w-full">{p.category || 'Uncategorized'}</span>
                                                    <span className="text-[9px] text-gray-400 dark:text-zinc-600 uppercase font-black tracking-widest">Type</span>
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-6 text-right">
                                                <div className="flex items-center justify-end gap-1 md:gap-2">
                                                    <a
                                                        href={`https://researchvisions.com/products/${p.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 md:p-2 text-gray-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-all"
                                                        title="View"
                                                    >
                                                        <Eye size={16} className="md:w-[18px] md:h-[18px]" />
                                                    </a>
                                                    <Link
                                                        href={`/products/${p.slug}/edit`}
                                                        className="p-1.5 md:p-2 text-gray-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} className="md:w-[18px] md:h-[18px]" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteProduct(p.slug)}
                                                        className="p-1.5 md:p-2 text-gray-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {!loading && totalPages > 1 && (
                    <div className="p-6 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium tracking-tight">
                            Page <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-brand-red text-white rounded-lg text-sm font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-red/10"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
