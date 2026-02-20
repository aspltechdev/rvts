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
    Loader2,
    Share2,
    ArrowLeft
} from 'lucide-react';
import DownloadForm from '@/components/DownloadForm';

const ProductDetailContent = ({ params }) => {
    const { slug } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('specifications');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState('image'); // 'image' or '3d'
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [pendingDownload, setPendingDownload] = useState(null);
    const [shareSuccess, setShareSuccess] = useState(false);

    useEffect(() => {
        if (shareSuccess) {
            const timer = setTimeout(() => setShareSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [shareSuccess]);

    const initiateDownload = (type, url) => {
        if (!url) return;

        if (type === 'Brochure') {
            setPendingDownload({ type, url });
            setIsDownloadModalOpen(true);
        } else {
            // Ensure full URL if it's relative
            const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
            window.open(fullUrl, '_blank');
        }
    };

    const handleActualDownload = () => {
        if (pendingDownload?.url) {
            const fullUrl = pendingDownload.url.startsWith('http') ? pendingDownload.url : `${API_BASE_URL}${pendingDownload.url}`;
            window.open(fullUrl, '_blank');
            setPendingDownload(null);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            try {
                const res = await fetch(`${API_BASE_URL}/api/products/${slug}`, {
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    throw new Error("Product not found or API error");
                }
            } catch (err) {
                console.error("API Error or Product not found:", err);
                setError("Could not load product data.");
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
        if (url.startsWith('http') || url.startsWith('/product-static-assets')) return url;
        return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
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
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 pb-8 md:pb-12 pt-24 md:pt-32 xl:pt-40">

                {/* MOBILE BACK BUTTON & BREADCRUMB */}
                <div className="flex flex-col gap-3 mb-6">
                    <Link
                        href="/products"
                        className="md:hidden flex items-center gap-2 text-[#ff3333] font-black text-[10px] uppercase tracking-[0.2em] hover:gap-3 transition-all w-fit"
                    >
                        <ArrowLeft size={14} /> Back to Collection
                    </Link>

                    <div className="flex items-center gap-2 text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 overflow-x-auto scrollbar-hide whitespace-nowrap py-1">
                        <Link href="/" className="hover:text-red-600 transition-colors shrink-0"><Home size={14} /></Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <Link href="/products" className="hover:text-red-600 transition-colors shrink-0">Products</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate min-w-0">{product.name}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 items-start">

                    {/* LEFT COLUMN: IMAGES */}
                    <div className="product-gallery flex flex-col gap-4 md:gap-6 lg:col-span-6">
                        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] w-full flex items-center justify-center p-0 group z-0 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 transition-all duration-500 hover:border-red-600/30">
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
                                <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-500" onClick={() => setIsImageModalOpen(true)}>
                                    {displayImages[activeImageIndex] ? (
                                        <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-zinc-800/50 rounded-xl overflow-hidden p-4">
                                            <Image
                                                src={displayImages[activeImageIndex]}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                                priority
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <Monitor size={80} className="text-zinc-200 dark:text-zinc-800" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveImageIndex(idx); setViewMode('image'); }}
                                    className={`relative aspect-square bg-zinc-50 dark:bg-[#111] border rounded-lg overflow-hidden transition-all ${activeImageIndex === idx && viewMode === 'image' ? 'border-red-600 ring-1 ring-red-600/20' : 'border-zinc-100 dark:border-zinc-800'}`}
                                >
                                    <Image src={img} alt="" fill className="object-contain p-2" unoptimized />
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
                    <div className="product-info flex flex-col lg:col-span-6 lg:sticky lg:top-32 h-fit">
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-block px-3 py-1 bg-red-50/50 dark:bg-red-900/10 backdrop-blur-sm text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-100 dark:border-red-900/20">
                                {product.category || 'Product'}
                            </span>
                            <div className="flex items-center gap-3">
                                {shareSuccess && (
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest animate-in fade-in slide-in-from-right-2">
                                        Link Copied!
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        const shareData = {
                                            title: `RVTS - ${product.name}`,
                                            text: product.description,
                                            url: window.location.href,
                                        };

                                        if (navigator.share) {
                                            navigator.share(shareData).then(() => {
                                                setShareSuccess(true);
                                            }).catch(err => {
                                                navigator.clipboard.writeText(window.location.href);
                                                setShareSuccess(true);
                                            });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            setShareSuccess(true);
                                        }
                                    }}
                                    className={`p-2.5 rounded-full border transition-all shadow-sm ${shareSuccess ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:text-red-600 hover:bg-red-50'}`}
                                    title="Share Product"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-base md:text-xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tight mb-4 uppercase">
                            {product.name}
                        </h1>
                        <div className="relative mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff3333] rounded-full" />
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-6 py-1 font-medium italic">
                                {product.description || "No data is been given."}
                            </p>
                        </div>

                        {/* Download Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
                    <div className="flex items-center gap-4 sm:gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto scrollbar-hide">
                        {['Specifications', 'Key Features', ...(product.brochure || product.installationManual ? ['Downloads'] : [])].map((tab) => {
                            const key = tab.toLowerCase().replace(' ', '');
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`pb-4 text-[11px] sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${activeTab === key ? 'text-red-600 border-red-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>

                    <div className="min-h-[200px]">
                        {activeTab === 'specifications' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {highlights.map((item, i) => (
                                    <div key={i} className="flex flex-col p-4 bg-zinc-50/50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl group/item">
                                        <div className="flex items-center gap-2 mb-2">
                                            <item.icon size={18} className="text-zinc-400 group-hover/item:text-red-600 transition-colors" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{item.label}</span>
                                        </div>
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.value || 'N/A'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'keyfeatures' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.features && product.features.length > 0 ? product.features?.map((f, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 border rounded-lg border-zinc-100 dark:border-zinc-800">
                                        <Check size={16} className="text-green-500 mt-0.5" />
                                        <span className="text-sm font-medium">{f}</span>
                                    </div>
                                )) : (
                                    <p className="text-zinc-500 text-sm py-4">No data is been given.</p>
                                )}
                            </div>
                        )}
                        {/* More tabs can be added similarly */}
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

                {/* Download Lead Form */}
                <DownloadForm
                    isOpen={isDownloadModalOpen}
                    onClose={() => setIsDownloadModalOpen(false)}
                    productName={product.name}
                    downloadType={pendingDownload?.type || 'Brochure'}
                    onDownload={handleActualDownload}
                />
            </div>
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
