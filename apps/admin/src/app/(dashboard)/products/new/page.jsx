
'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, X, Upload, ArrowLeft, Save } from 'lucide-react';

export default function AddProductPage() {
    const { register, control, handleSubmit, setValue, watch, reset } = useForm({
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
            fusionUrl: '',
            category: ''
        }
    });
    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

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
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

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

                setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

                const res = await api.post(`/api/upload`, data, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(prev => ({ ...prev, [file.name]: percentCompleted }));
                    }
                });

                setImages(prev => [...prev, res.data.url]);
                setUploadProgress(prev => {
                    const next = { ...prev };
                    delete next[file.name];
                    return next;
                });
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
            images,
            features: data.features.filter(f => f.value.trim() !== '').map((f) => f.value),
            published: true
        };

        try {
            await api.post(`/api/products`, payload);
            router.push('/dashboard');
        } catch (err) {
            console.error("Submission error details:", err.response?.data);
            const msg = err.response?.data?.details || err.response?.data?.error || err.message || "Failed to save product";
            alert("Error: " + msg);
        }
    };

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
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">New Product</h2>
                            <p className="text-[10px] md:text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Creation Wizard</p>
                        </div>
                    </div>
                </div>
            </header>

            <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-4 space-y-8">

                {/* Section 1: Product Identification */}
                <section className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-8 transition-all hover:border-brand-red/20">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6">
                        <span className="w-10 h-10 rounded-2xl bg-brand-red text-white flex items-center justify-center font-black text-lg shadow-lg shadow-brand-red/20">01</span>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Base Identification</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Product Display Name <span className="text-brand-red">*</span></label>
                            <input
                                {...register("name")}
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                    setValue("slug", slugify(e.target.value));
                                }}
                                className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-bold text-gray-900 dark:text-white"
                                placeholder="e.g. Interactive Soundbar Max"
                                required
                            />
                        </div>

                        {/* Title Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Internal SEO Title <span className="text-brand-red">*</span></label>
                            <input
                                {...register("title")}
                                className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-bold text-gray-900 dark:text-white"
                                placeholder="e.g. Professional Series X100"
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Asset Category <span className="text-brand-red">*</span></label>
                            <select {...register("category")} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-bold text-gray-900 dark:text-white appearance-none cursor-pointer" required>
                                <option value="">Select Category</option>
                                <option value="Displays & video walls">Displays & video walls</option>
                                <option value="Control system">Control system</option>
                                <option value="Video systems">Video systems</option>
                                <option value="Touch screen Kiosk">Touch screen Kiosk</option>
                                <option value="Mounting solutions">Mounting solutions</option>
                                <option value="PTX/Soundbars/Mobile trolley">PTX/Soundbars/Mobile trolley</option>
                                <option value="Cables and accessories">Cables and accessories</option>
                            </select>
                        </div>

                        {/* Slug Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Slug (Permanent Link)</label>
                            <input
                                {...register("slug")}
                                className="w-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-2xl font-mono text-xs text-brand-red font-bold"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Product Narrative <span className="text-brand-red">*</span></label>
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
                                <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">{spec.label}</label>
                                <input {...register(spec.field)} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none transition-all font-medium text-gray-900 dark:text-white" placeholder={spec.placeholder} />
                            </div>
                        ))}
                    </div>

                    {/* Features Array */}
                    <div className="pt-4">
                        <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em] block mb-4">Core Feature Highlights</label>
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
                        <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Product Gallery (Max 10MB/Img)</label>
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

                            {/* Show Progress for each uploading file */}
                            {Object.entries(uploadProgress).map(([fileName, progress]) => (
                                <div key={fileName} className="relative aspect-square border-2 border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 p-4 text-center">
                                    <div className="w-full bg-gray-200 dark:bg-zinc-700/50 rounded-full h-1.5 mb-2 overflow-hidden">
                                        <div className="bg-brand-red h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="text-[8px] font-black text-gray-500 uppercase truncate w-full px-1">{fileName}</span>
                                    <span className="text-[10px] font-black text-brand-red">{progress}%</span>
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
                                <label className="text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase tracking-widest">{item.label}</label>
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
                        <label className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Fusion 3D Experience (Optional)</label>
                        <input
                            {...register("fusionUrl")}
                            className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 p-4 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red outline-none text-sm font-mono text-blue-600 dark:text-blue-400"
                            placeholder="https://a360.co/generated-link"
                        />
                    </div>
                </section>
            </form>

            {/* ACTION FOOTER */}
            <footer className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-500">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <p className="text-xs text-gray-400 font-medium">Add all necessary specifications before publishing.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-white font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            form="add-product-form"
                            className="flex-1 sm:flex-none px-10 py-4 rounded-2xl bg-brand-red text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-brand-red/30 hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            Publish Item
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
