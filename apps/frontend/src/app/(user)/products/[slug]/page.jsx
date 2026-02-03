'use client';

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import {
    Download,
    Check,
    ChevronRight,
    Home,
    FileText,
    Box,
    Monitor,
    Move,
    X,
    Maximize,
    Loader2
} from 'lucide-react';

const ProductDetailContent = ({ params }) => {
    const { slug } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState('image'); // 'image' or '3d'
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const initiateDownload = (type, url) => {
        if (url) {
            // Ensure full URL if it's relative
            const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
            window.open(fullUrl, '_blank');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            try {
                const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);

                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    throw new Error("Product not found or API error");
                }
            } catch (err) {
                console.error("API Error, using fallback:", err);

                // Static Fallback Logic
                try {
                    const { STATIC_PRODUCTS } = await import('@/lib/static-data');
                    const staticProduct = STATIC_PRODUCTS.find(p => p.slug === slug);
                    if (staticProduct) {
                        setProduct(staticProduct);
                    } else {
                        // Fallback for demo purposes if absolutely nothing found
                        setProduct({
                            name: slug.replace(/-/g, ' '),
                            category: "Uncategorized",
                            title: "Product Not Found",
                            description: "Content is currently unavailable.",
                            images: [],
                            features: [],
                            material: "N/A",
                            finish: "N/A"
                        });
                    }
                } catch {
                    setError("Could not load product data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
                    <p className="text-zinc-500 text-sm">Loading details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Product Not Found</h1>
                    <Link href="/products" className="text-red-600 hover:underline">Back to Products</Link>
                </div>
            </div>
        );
    }

    // Helper to process image URLs
    const getImageUrl = (url) => {
        if (!url) return null;
        return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    };

    const highlights = [
        { label: "Material", value: product.material, icon: Box },
        { label: "Application", value: product.application || "Indoor / Corporate", icon: Monitor },
        { label: "Compatibility", value: product.compatibility || "Universal VESA", icon: Maximize },
        { label: "Movement", value: "Adjustable", icon: Move },
    ];

    const displayImages = product.images && product.images.length > 0
        ? product.images.map(getImageUrl)
        : [];

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 overflow-x-hidden w-full">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 pb-8 md:pb-12 pt-28 md:pt-32">

                {/* BREADCRUMB */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                    <Link href="/" className="hover:text-red-600 transition-colors"><Home size={14} /></Link>
                    <ChevronRight size={14} />
                    <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
                    <ChevronRight size={14} />
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20 items-start">

                    {/* LEFT COLUMN: IMAGES */}
                    <div className="product-gallery flex flex-col gap-4">
                        <div className="relative aspect-video w-full flex items-center justify-center p-0 group z-0 bg-zinc-50 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            {/* 3D View */}
                            {product.fusionUrl && (
                                <iframe
                                    src={product.fusionUrl}
                                    className={`absolute inset-0 w-full h-full border-0 bg-white dark:bg-[#050505] transition-opacity duration-500 ${viewMode === '3d' ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
                                    allowFullScreen
                                    title="3D View"
                                />
                            )}

                            {/* Image View */}
                            <div className={`relative w-full h-full transition-opacity duration-300 ${viewMode === '3d' ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'}`}>
                                <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center cursor-zoom-in" onClick={() => setIsImageModalOpen(true)}>
                                    {displayImages[activeImageIndex] ? (
                                        <Image
                                            src={displayImages[activeImageIndex]}
                                            alt={product.name}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                                            priority
                                        />
                                    ) : (
                                        <Monitor size={80} className="text-zinc-200 dark:text-zinc-800" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-5 gap-3 md:gap-4">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveImageIndex(idx); setViewMode('image'); }}
                                    className={`relative aspect-square bg-zinc-50 dark:bg-[#111] border rounded-lg overflow-hidden transition-all ${activeImageIndex === idx && viewMode === 'image' ? 'border-red-600 ring-1 ring-red-600/20' : 'border-zinc-100 dark:border-zinc-800'}`}
                                >
                                    <Image src={img} alt="" fill className="object-contain p-2" />
                                </button>
                            ))}
                            {/* 3D Button */}
                            {product.fusionUrl && (
                                <button
                                    onClick={() => setViewMode('3d')}
                                    className={`relative aspect-square border rounded-lg flex flex-col items-center justify-center gap-1 ${viewMode === '3d' ? 'border-red-600 text-red-600' : 'border-zinc-200 text-zinc-500'}`}
                                >
                                    <Box size={18} />
                                    <span className="text-[9px] font-bold">3D</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INFO */}
                    <div className="product-info flex flex-col sticky top-24">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                                {product.category || 'Product'}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-3">
                                {product.name}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-1">
                                {product.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-3">
                                {highlights.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg">
                                        <item.icon size={16} className="text-zinc-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-400 uppercase font-bold">{item.label}</span>
                                            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate">{item.value || 'N/A'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Downloads Actions */}
                        <div className="flex gap-3 mb-6">
                            {product.brochure && (
                                <button onClick={() => initiateDownload('Brochure', product.brochure)} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold uppercase shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2">
                                    <Download size={18} /> Brochure
                                </button>
                            )}
                            {product.installationManual && (
                                <button onClick={() => initiateDownload('Manual', product.installationManual)} className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-3 rounded-lg text-sm font-bold uppercase transition-all flex items-center justify-center gap-2">
                                    <FileText size={18} /> Manual
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* BOTTOM TABS */}
                <div className="mt-12">
                    <div className="flex items-center gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto">
                        {['Description', 'Key Features', 'Downloads'].map((tab) => {
                            const key = tab.toLowerCase().replace(' ', '');
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`pb-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === key ? 'text-red-600 border-red-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    <div className="min-h-[200px]">
                        {activeTab === 'description' && (
                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                <p>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'keyfeatures' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.features?.map((f, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 border rounded-lg border-zinc-100 dark:border-zinc-800">
                                        <Check size={16} className="text-green-500 mt-0.5" />
                                        <span className="text-sm font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* More tabs can be added similarly */}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 z-[6000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsImageModalOpen(false)}>
                    <button className="absolute top-4 right-4 text-white hover:text-red-600" onClick={() => setIsImageModalOpen(false)}>
                        <X size={32} />
                    </button>
                    <div className="relative w-full max-w-7xl h-[80vh]" onClick={e => e.stopPropagation()}>
                        {displayImages[activeImageIndex] && (
                            <Image src={displayImages[activeImageIndex]} alt="Full View" fill className="object-contain" />
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

const ProductDetailPage = ({ params }) => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <ProductDetailContent params={params} />
        </Suspense>
    );
};

export default ProductDetailPage;
