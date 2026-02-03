'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Edit2, Eye, Trash2, Plus, Package, CheckCircle, FileText } from 'lucide-react';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // Calculate Stats
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
                        <thead className="bg-gray-50 dark:bg-black/20 text-gray-500 dark:text-zinc-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Product</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Created At</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={4} className="p-12 text-center text-gray-500 dark:text-zinc-500">Loading products...</td></tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 dark:text-zinc-500 mb-2">
                                                <Package size={24} />
                                            </div>
                                            <p className="text-gray-900 dark:text-white font-medium">No products found</p>
                                            <p className="text-gray-500 dark:text-zinc-500 text-sm">Get started by creating your first product.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700/50">
                                                    {p.images[0] ? (
                                                        <Image src={p.images[0]} width={48} height={48} className="w-full h-full object-cover" alt={p.name} />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-600">
                                                            <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 dark:text-white font-bold group-hover:text-brand-red transition-colors">{p.name}</div>
                                                    <div className="text-gray-500 dark:text-zinc-600 text-xs mt-0.5">/{p.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${p.published
                                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
                                                : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${p.published ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                {p.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-500 dark:text-zinc-400 text-sm font-medium">
                                            {new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/products/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all"
                                                    title="View Live"
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
