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

    // Calculate Stats (Based on ALL products, not filtered)
    const stats = {
        total: products.length,
        published: products.filter(p => p.published).length,
        draft: products.filter(p => !p.published).length
    };

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

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Published</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.published}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">Drafts</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.draft}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-black/20 text-gray-800 dark:text-zinc-300 uppercase text-xs font-bold tracking-wider border-b border-gray-100 dark:border-zinc-800">
                            <tr>
                                <th className="p-6">Product</th>
                                <th className="p-6">
                                    <div className="flex items-center gap-3">
                                        <span>Category</span>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-[11px] font-bold focus:ring-1 focus:ring-brand-red cursor-pointer text-brand-red px-2 py-1 rounded-lg"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th className="p-6 text-sm font-bold uppercase tracking-wider">Status</th>
                                <th className="p-6 text-right text-sm font-bold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {(query || selectedCategory !== 'All') && (
                                <tr className="bg-brand-red/5 dark:bg-brand-red/10 border-b border-brand-red/10">
                                    <td colSpan={4} className="px-6 py-2">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-brand-red uppercase tracking-widest">
                                            <div className="flex items-center gap-2">
                                                <span>Showing {filteredProducts.length} results</span>
                                                {query && <span>for "{query}"</span>}
                                                {selectedCategory !== 'All' && <span>in {selectedCategory}</span>}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const params = new URLSearchParams(searchParams);
                                                    params.delete('q');
                                                    params.delete('category');
                                                    router.push(pathname);
                                                }}
                                                className="hover:underline flex items-center gap-1"
                                            >
                                                <X size={10} strokeWidth={3} />
                                                Clear All
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {loading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-gray-500 dark:text-zinc-500">Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center">
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
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700/50">
                                                    {(() => {
                                                        const img = p.images?.[0];
                                                        if (!img) return (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-600">
                                                                <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                                                            </div>
                                                        );

                                                        // Ensure absolute URL for admin panel loads
                                                        // Fallback to researchvisions.com if relative
                                                        let src = img;
                                                        if (!img.startsWith('http')) {
                                                            const baseUrl = 'https://researchvisions.com';
                                                            src = `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
                                                        }

                                                        return <Image src={src} width={48} height={48} className="w-full h-full object-cover" alt={p.name} unoptimized />;
                                                    })()}
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 dark:text-white font-bold text-sm group-hover:text-brand-red transition-colors max-w-[300px] truncate" title={p.name}>{p.name}</div>
                                                    <div className="text-[10px] text-gray-500 dark:text-zinc-600 mt-0.5 tracking-tight italic">/{p.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-gray-900 dark:text-white font-black text-xs">{p.category || 'Uncategorized'}</span>
                                                <span className="text-[9px] text-gray-400 dark:text-zinc-600 uppercase font-black tracking-widest">Type</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${p.published
                                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
                                                : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${p.published ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                {p.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">

                                                <a
                                                    href={`https://researchvisions.com/products/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-all"
                                                    title="View on Website"
                                                >
                                                    <Eye size={18} />
                                                </a>

                                                <Link
                                                    href={`/products/${p.slug}/edit`}
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all"
                                                    title="Edit Product"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => deleteProduct(p.slug)}
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
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
        </div>
    )
}
