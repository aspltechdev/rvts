'use client';

import { API_BASE_URL } from '@/lib/config';

// ... (existing imports)

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const apiUrl = API_BASE_URL;
            import Image from 'next/image';
            import Link from 'next/link';
            import {
                Download,
                Check,
                ChevronRight,
                Home,
                Share2,
                FileText,
                Box,
                Monitor,
                Move,
                Layers,
                X,
                Maximize
            } from 'lucide-react';


            const ProductDetailPage = ({ params }) => {
                const { slug } = params;
                const [product, setProduct] = useState(null);
                const [loading, setLoading] = useState(true);
                const [activeTab, setActiveTab] = useState('description');
                const [activeImageIndex, setActiveImageIndex] = useState(0);
                const [viewMode, setViewMode] = useState('image'); // 'image' or '3d'

                const [isImageModalOpen, setIsImageModalOpen] = useState(false);

                const initiateDownload = (type, url) => {
                    if (url) {
                        window.open(url, '_blank');
                    }
                };



                useEffect(() => {
                    const fetchProduct = async () => {
                        try {
                            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'
                            // Fetch basic data from API
                            const res = await fetch(`${apiUrl}/api/products/${slug}`);
                            let data = null;

                            if (res.ok) {
                                data = await res.json();
                            }

                            // If API fails or returns minimal data, fallback to static
                            if (!data) {
                                throw new Error("No data from API");
                            }
                            setProduct(data);
                        } catch (err) {
                            console.error("API Error, using static fallback:", err);
                            const { STATIC_PRODUCTS } = await import('@/lib/static-data');
                            const staticProduct = STATIC_PRODUCTS.find(p => p.slug === slug);

                            if (staticProduct) {
                                setProduct(staticProduct);
                            } else {
                                // Generic fallback if not found in static list
                                setProduct({
                                    name: slug.replace(/-/g, ' '),
                                    category: "Uncategorized",
                                    title: "Product Not Found (Offline Mode)",
                                    description: "This product details could not be loaded because the backend is unreachable and it is not in our static cache.",
                                    images: ["/assets/rvts-logo.png"],
                                    features: [],
                                    material: "N/A",
                                    finish: "N/A"
                                });
                            }
                        } finally {
                            setLoading(false);
                        }
                    };

                    if (slug) {
                        fetchProduct();
                    }
                }, [slug]);


                if (loading) {
                    return (
                        <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-zinc-200 dark:border-zinc-800 border-t-red-600 rounded-full animate-spin" />
                        </div>
                    );
                }

                if (!product) return null;

                // Highlights Data (Universal Fields)
                const highlights = [
                    { label: "Material", value: product.material, icon: Box },
                    { label: "Application", value: "Indoor / Corporate / Education", icon: Monitor }, // Dynamic if possible
                    { label: "Compatibility", value: "Universal VESA / 32\" - 98\"", icon: Maximize },
                    { label: "Movement", value: "Motorized Height Adjust / Tilt", icon: Move }, // Dynamic if possible
                ];

                // Placeholder images if none exist
                const displayImages = product.images && product.images.length > 0
                    ? product.images
                    : Array(4).fill(null); // Create 4 slots for the gallery demo

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

                            {/* TOP SECTION: IMAGE + DETAILS */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20 items-start">

                                {/* LEFT COLUMN: IMAGES */}
                                <div className="product-gallery flex flex-col gap-4">

                                    {/* Main Media Area - Clean/No Background */}
                                    <div className="relative aspect-video w-full flex items-center justify-center p-0 group z-0">

                                        {/* 3D View - Preloaded in Background (Always Rendered if URL exists) */}
                                        {product.fusionUrl && (
                                            <iframe
                                                src={product.fusionUrl}
                                                className={`absolute inset-0 w-full h-full border-0 bg-white dark:bg-[#050505] transition-opacity duration-500 ${viewMode === '3d' ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                                                    }`}
                                                allowFullScreen
                                                title="3D View"
                                            />
                                        )}

                                        {/* Image View */}
                                        <div className={`relative w-full h-full transition-opacity duration-300 ${viewMode === '3d' ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
                                            }`}>
                                            <>
                                                {/* Subtle Grid Background */}
                                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                                                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #000 1px, transparent 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #000 1px, transparent 20px)' }} />

                                                <div
                                                    className="relative w-full h-full p-8 md:p-12 flex items-center justify-center cursor-zoom-in"
                                                    onClick={() => setIsImageModalOpen(true)}
                                                >
                                                    {displayImages[activeImageIndex] ? (
                                                        <Image
                                                            src={displayImages[activeImageIndex]}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                                                            priority
                                                        />
                                                    ) : (
                                                        <Monitor size={120} className="text-zinc-200 dark:text-zinc-800 stroke-1" />
                                                    )}
                                                </div>

                                                {/* Image Actions Overlay */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                                    <button className="p-2 bg-white dark:bg-zinc-800 shadow-lg rounded-full text-zinc-600 dark:text-zinc-300 hover:text-red-600 transition-colors" title="Share">
                                                        <Share2 size={18} />
                                                    </button>
                                                </div>
                                            </>
                                        </div>
                                    </div>

                                    {/* Thumbnails (Always Visible) */}
                                    <div className="grid grid-cols-5 gap-3 md:gap-4">
                                        {displayImages.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setActiveImageIndex(idx); setViewMode('image'); }}
                                                className={`relative aspect-square bg-zinc-50 dark:bg-[#111] border rounded-lg overflow-hidden transition-all ${activeImageIndex === idx && viewMode === 'image'
                                                    ? 'border-red-600 ring-1 ring-red-600/20'
                                                    : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                    }`}
                                            >
                                                {img ? (
                                                    <Image src={img} alt="" fill className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Monitor size={20} className="text-zinc-200 dark:text-zinc-800" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                        {
                                            product.fusionUrl && (
                                                <button
                                                    onClick={() => setViewMode('3d')}
                                                    className={`relative aspect-square bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 flex flex-col items-center justify-center gap-2 group ${viewMode === '3d' ? 'border-red-600 ring-1 ring-red-600/20 bg-red-50 dark:bg-red-900/10' : ''
                                                        }`}
                                                >
                                                    <Box size={20} className={`transition-colors ${viewMode === '3d' ? 'text-red-600' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-red-600'}`} />
                                                    <span className={`text-[10px] font-bold uppercase transition-colors ${viewMode === '3d' ? 'text-red-600' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>3D View</span>
                                                </button>
                                            )
                                        }
                                    </div >
                                </div >


                                {/* RIGHT COLUMN: INFO */}
                                < div className="product-info flex flex-col sticky top-24" >
                                    {/* Category & Title */}
                                    < div className="mb-4" >
                                        <span className="inline-block px-2.5 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                                            {product.category}
                                        </span>
                                        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-3">
                                            {product.name}
                                        </h1>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-1">
                                            {product.description || "A high-performance solution engineered for modern professional environments."}
                                        </p>
                                    </div >

                                    {/* Universal Highlights (Badges) */}
                                    < div className="mb-6" >
                                        <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">Specifications Highlight</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {highlights.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg">
                                                    <div className="p-1.5 bg-white dark:bg-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 shadow-sm">
                                                        <item.icon size={14} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-zinc-400 uppercase font-bold">{item.label}</span>
                                                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">{item.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div >

                                    {/* Action Buttons */}
                                    < div className="flex flex-col sm:flex-row gap-3 mb-6 pt-5 border-t border-zinc-100 dark:border-zinc-900" >
                                        {
                                            product.brochure && (
                                                <button
                                                    onClick={() => initiateDownload('Product Brochure', product.brochure)}
                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all shadow-md shadow-red-600/20"
                                                >
                                                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                                                    Product Brochure
                                                </button>
                                            )
                                        }
                                        {
                                            product.installationManual && (
                                                <button
                                                    onClick={() => initiateDownload('Installation Manual', product.installationManual)}
                                                    className="flex-1 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                                >
                                                    <FileText size={18} />
                                                    Installation Manual
                                                </button>
                                            )
                                        }
                                    </div >


                                </div >
                            </div >

                            {/* BOTTOM SECTION: TABS & DETAILS */}
                            < div className="mt-12" >
                                {/* Tab Headers */}
                                < div className="flex items-center gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto" >
                                    {
                                        ['Description', 'Key Features', 'Downloads'].map((tab) => {
                                            const key = tab.toLowerCase().replace(' ', '');
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => setActiveTab(key)}
                                                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${activeTab === key
                                                        ? 'text-red-600 border-red-600'
                                                        : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-zinc-200'
                                                        }`}
                                                >
                                                    {tab}
                                                </button>
                                            )
                                        })
                                    }
                                </div >

                                {/* Tab Content */}
                                < div className="min-h-[300px]" >

                                    {/* DESCRIPTION TAB */}
                                    {
                                        activeTab === 'description' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
                                                        The {product.name} represents the pinnacle of {product.category} engineering. Designed with the installer in mind, it features our proprietary Quick-Lock system that reduces installation time by 40%. The rigid frame construction ensures zero-flex stability even when fully loaded with modern large-format displays.
                                                        <br /><br />
                                                        Whether deployed in high-traffic retail environments, corporate boardrooms, or educational facilities, this solution delivers consistent performance and premium aesthetics that blend seamlessly with modern interior design.
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                                                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mb-4">
                                                                <Layers size={20} />
                                                            </div>
                                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Modular Design</h4>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Expandable architecture allowing for future upgrades and accessory integration.</p>
                                                        </div>
                                                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                                                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mb-4">
                                                                <Check size={20} />
                                                            </div>
                                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Safety Certified</h4>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Tested to 4x rated weight capacity with anti-dislodgement safety screws.</p>
                                                        </div>
                                                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                                                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mb-4">
                                                                <Monitor size={20} />
                                                            </div>
                                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Cable Management</h4>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Integrated wide channels for hiding power and data cables completely.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/* FEATURES TAB */}
                                    {
                                        activeTab === 'keyfeatures' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {product.features.map((feature, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-red-200 transition-colors">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-1">
                                                                <Check size={14} strokeWidth={3} />
                                                            </div>
                                                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/* DOWNLOADS TAB */}
                                    {
                                        activeTab === 'downloads' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                                    {[
                                                        product.brochure && { name: "Product Brochure", type: "Brochure", url: product.brochure },
                                                        product.installationManual && { name: "Installation Manual", type: "Manual", url: product.installationManual },
                                                        product.technicalDataSheet && { name: "Technical Data Sheet", type: "Data Sheet", url: product.technicalDataSheet },
                                                        product.technicalDrawing && { name: "Technical Drawing", type: "CAD Drawing", url: product.technicalDrawing }
                                                    ].filter(Boolean).map((file, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => initiateDownload(file.type, file.url)}
                                                            className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl group hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-100 dark:border-zinc-800 w-full text-left"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center text-red-600 shadow-sm">
                                                                    <FileText size={20} />
                                                                </div>
                                                                <div className="overflow-hidden">
                                                                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors truncate">{file.name}</h4>
                                                                    <span className="text-[10px] text-zinc-400 font-mono">Download File</span>
                                                                </div>
                                                            </div>
                                                            <Download size={18} className="text-zinc-300 group-hover:text-red-600 transition-colors flex-shrink-0" />
                                                        </button>
                                                    ))}
                                                    {[product.brochure, product.installationManual, product.technicalDataSheet, product.technicalDrawing].every(x => !x) && (
                                                        <div className="col-span-full text-center text-zinc-500 py-8 italic">
                                                            No downloadable documents available for this product.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div >
                            </div >

                        </div >
                        {/* Image Modal */}
                        {
                            isImageModalOpen && (
                                <div
                                    className="fixed inset-0 z-[6000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                                    onClick={() => setIsImageModalOpen(false)}
                                >
                                    <button
                                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                                        onClick={() => setIsImageModalOpen(false)}
                                    >
                                        <X size={32} />
                                    </button>
                                    <div className="relative w-full max-w-6xl aspect-video" onClick={e => e.stopPropagation()}>
                                        {displayImages[activeImageIndex] && (
                                            <Image
                                                src={displayImages[activeImageIndex]}
                                                alt={product.name}
                                                fill
                                                className="object-contain" // Removed mix-blend for modal to see true image
                                                priority
                                            />
                                        )}
                                    </div>
                                </div>
                            )
                        }


                    </main >
                );
            };

            export default ProductDetailPage;
