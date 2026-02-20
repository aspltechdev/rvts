'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Plus, X, Upload, Save, ArrowLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EditProductPage({ params }) {
    const { register, control, handleSubmit, setValue, reset, watch } = useForm({
        defaultValues: {
            name: '',
            title: '',
            slug: '',
            description: '',
            features: [{ value: '' }],
            technicalDrawing: '',
            installationManual: '',
            brochure: '',
            material: '',
            application: '',
            compatibility: '',
            finish: '',
            category: '',
            fusionUrl: ''
        }
    });

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Upload states for new files
    const [uploadingBlueprint, setUploadingBlueprint] = useState(false);
    const [uploadingManual, setUploadingManual] = useState(false);
    const [uploadingBrochure, setUploadingBrochure] = useState(false);

    const router = useRouter();

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/[^\w-]+/g, '')   // Remove all non-word chars
            .replace(/--+/g, '-');    // Replace multiple - with single -
    };

    // Fetch existing data
    useEffect(() => {
        setLoading(true);
        api.get(`/api/products/${params.slug}`)
            .then(res => {
                const p = res.data;
                if (!p) throw new Error("No data received");

                reset({
                    name: p.name || '',
                    title: p.title || '',
                    slug: p.slug || '',
                    description: p.description || '',
                    category: p.category || '',
                    features: (p.features && p.features.length > 0)
                        ? p.features.map(f => ({ value: f }))
                        : [{ value: '' }],
                    technicalDrawing: p.technicalDrawing || '',
                    installationManual: p.installationManual || '',
                    brochure: p.brochure || '',
                    material: p.material || '',
                    application: p.application || '',
                    compatibility: p.compatibility || '',
                    finish: p.finish || '',
                    fusionUrl: p.fusionUrl || ''
                });
                setImages(p.images || []);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                alert("Failed to load product details. Check console for details.");
                router.push('/dashboard');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [params.slug, reset, router]);


    const handleImageUpload = async (e) => {
        if (!e.target.files?.length) return;

        const files = Array.from(e.target.files);
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File "${file.name}" is too large (max 10MB).`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setUploading(true);
        try {
            for (const file of validFiles) {
                const data = new FormData();
                data.append('file', file);
                const res = await api.post(`/api/upload`, data);
                setImages(prev => [...prev, res.data.url]);
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed: " + (error.response?.data?.error || "Unknown error"));
        } finally {
            setUploading(false);
        }
    };

    const handleFileUpload = async (e, fieldName, setLocalLoading) => {
        if (!e.target.files?.length) return;
        setLocalLoading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await api.post(`/api/upload`, data);
            setValue(fieldName, res.data.url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed: " + (error.response?.data?.error || "Unknown error"));
        } finally {
            setLocalLoading(false);
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            title: data.title || data.name, // Use name as title if title is missing
            images,
            features: data.features.filter(f => f.value.trim() !== '').map((f) => f.value),
            published: true
        };

        try {
            await api.put(`/api/products/${params.slug}`, payload);
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || err.response?.data?.details || "Failed to update product";
            alert(msg);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Fetching Product Details...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-32">
            {/* STICKY HEADER */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 px-4 py-4 mb-8">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-brand-red transition-all bg-white dark:bg-black">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">Edit Product</h2>
                            <p className="text-[10px] md:text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Catalog Management System</p>
                        </div>
                    </div>
                    {/* Empty space or additional info */}
                    <div className="hidden md:block">
                        <span className="text-[10px] font-black bg-brand-red/10 text-brand-red px-3 py-1 rounded-full uppercase tracking-tighter italic">Live Editing Mode</span>
                    </div>
                </div>
            </header>

            <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 space-y-8">

                {/* Section 1: Product Identification */}
                <section className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-8 transition-all hover:border-brand-red/20">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6">
                        <span className="w-10 h-10 rounded-2xl bg-brand-red text-white flex items-center justify-center font-black text-lg shadow-lg shadow-brand-red/20">01</span>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Base Identification</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">Product Display Name <span className="text-brand-red">*</span></label>
                            <input
                                {...register("name")}
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                    setValue("slug", slugify(e.target.value)); // Auto-generate slug
                                }}
                                className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-bold text-gray-900 dark:text-white"
                                placeholder="e.g. Interactive Soundbar Max"
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">Asset Category <span className="text-brand-red">*</span></label>
                            <div className="relative group/select">
                                <select {...register("category")} className="w-full bg-gray-100/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 pr-12 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-bold text-gray-900 dark:text-white appearance-none cursor-pointer" required>
                                    <option value="">Select Category</option>
                                    <option value="Displays & Video Walls">Displays & Video Walls</option>
                                    <option value="Touch Screen Kiosks">Touch Screen Kiosks</option>
                                    <option value="Video Systems">Video Systems</option>
                                    <option value="Control Systems">Control Systems</option>
                                    <option value="Mounting Solutions">Mounting Solutions</option>
                                    <option value="PTX / Soundbars / Trolleys">PTX / Soundbars / Trolleys</option>
                                    <option value="Cables & Accessories">Cables & Accessories</option>
                                    <option value="Interactive Installation / Digital Experience Zone">Interactive Installation / Digital Experience Zone</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within/select:text-brand-red transition-colors">
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Slug Input */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Slug (Permanent Link)</label>
                            <input
                                {...register("slug")}
                                className="w-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-2xl font-mono text-xs text-brand-red font-bold"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">Product Narrative <span className="text-brand-red">*</span></label>
                        <textarea
                            {...register("description")}
                            className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl h-40 focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all resize-none text-gray-900 dark:text-white italic"
                            placeholder="Describe what makes this product unique..."
                            required
                        />
                    </div>
                </section>

                {/* Section 2: Technical Specifications */}
                <section className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6">
                        <span className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg">02</span>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Specifications Grid</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { label: "Construction Material", field: "material", placeholder: "e.g. Brushed Aluminum" },
                            { label: "Exterior Finish", field: "finish", placeholder: "e.g. Matte Black Powder" },
                            { label: "Primary Application", field: "application", placeholder: "e.g. Corporate Boardrooms" },
                            { label: "Hardware Compatibility", field: "compatibility", placeholder: "e.g. Universal VESA Mount" }
                        ].map((spec, i) => (
                            <div key={i} className="space-y-3">
                                <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">{spec.label}</label>
                                <input {...register(spec.field)} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-medium text-gray-900 dark:text-white" placeholder={spec.placeholder} />
                            </div>
                        ))}
                    </div>

                    {/* Features Array */}
                    <div className="pt-4">
                        <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest block mb-4">Core Feature Highlights</label>
                        <div className="space-y-4">
                            {featureFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 group">
                                    <div className="flex-1 relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-red shadow-[0_0_10px_rgba(255,51,51,0.5)]"></div>
                                        <input {...register(`features.${index}.value`)} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 pl-10 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none text-sm font-bold text-gray-900 dark:text-white" placeholder="Describe a key technical feature..." />
                                    </div>
                                    <button type="button" onClick={() => removeFeature(index)} className="p-4 text-gray-400 hover:text-brand-red hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30"><X size={20} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendFeature({ value: '' })} className="text-xs font-black text-brand-red hover:bg-brand-red hover:text-white border-2 border-brand-red/20 hover:border-brand-red px-6 py-3 rounded-2xl transition-all flex items-center gap-2 uppercase tracking-widest">
                                <Plus size={16} /> Add Another Point
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 3: Visual Assets */}
                <section className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6">
                        <span className="w-10 h-10 rounded-2xl bg-[#0066ff] text-white flex items-center justify-center font-black text-lg">03</span>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Visual Assets</h3>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">Product Gallery (Max 10MB/Img)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((url, i) => (
                                <div key={i} className="relative aspect-square border-2 border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden group">
                                    <Image src={url} alt="Uploaded" fill className="object-cover" unoptimized />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:bg-brand-red/5 transition-all text-gray-400 hover:text-brand-red group">
                                <Upload size={24} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">{uploading ? 'Processing' : 'Add Image'}</span>
                                <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
                            </label>
                        </div>
                    </div>

                    {/* Document Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                        {[
                            { label: 'Technical Dwg.', field: 'technicalDrawing', state: uploadingBlueprint, setState: setUploadingBlueprint, type: 'img' },
                            { label: 'Inst. Manual', field: 'installationManual', state: uploadingManual, setState: setUploadingManual, type: 'pdf' },
                            { label: 'Sales Brochure', field: 'brochure', state: uploadingBrochure, setState: setUploadingBrochure, type: 'pdf' }
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-3">
                                <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">{item.label}</label>
                                {watch(item.field) ? (
                                    <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400 group">
                                        <span className="text-xs font-black uppercase tracking-tighter">Ready</span>
                                        <button type="button" onClick={() => setValue(item.field, '')} className="text-emerald-500 hover:text-red-500 transition-colors"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <label className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/30 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-zinc-800 transition-all text-xs font-bold uppercase text-gray-400 hover:text-brand-red hover:border-brand-red/30">
                                        {item.state ? 'Uploading...' : 'Link File'}
                                        <input type="file" onChange={(e) => handleFileUpload(e, item.field, item.setState)} className="hidden" accept={item.type === 'pdf' ? '.pdf' : 'image/*'} />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 3D URL Input */}
                    <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
                        <label className="text-sm font-black text-gray-900 dark:text-zinc-100 uppercase tracking-widest">Fusion 3D Experience (Optional)</label>
                        <input
                            {...register("fusionUrl")}
                            className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none text-sm font-mono text-blue-600 dark:text-blue-400"
                            placeholder="https://a360.co/generated-link"
                        />
                    </div>
                </section>
            </form>

            {/* ACTION FOOTER */}
            <div className="flex justify-end gap-3 max-w-4xl mx-auto px-4 mt-8 pb-32">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-white font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
                >
                    Discard
                </button>
                <button
                    type="submit"
                    form="edit-product-form"
                    className="px-10 py-4 rounded-2xl bg-brand-red text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-brand-red/30 hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <Save size={18} />
                    Save Product
                </button>
            </div>
        </div>
    );
}
