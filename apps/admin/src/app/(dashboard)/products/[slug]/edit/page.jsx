'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Plus, X, Upload, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EditProductPage({ params }) {
    const { register, control, handleSubmit, setValue, reset, watch } = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            features: [{ value: '' }],
            // New fields
            technicalDrawing: '',
            installationManual: '',
            brochure: '',
            material: '',
            application: '',
            compatibility: '',
            finish: '',
            category: ''
        }
    });

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Upload states for new files
    const [uploadingBlueprint, setUploadingBlueprint] = useState(false);
    const [uploadingManual, setUploadingManual] = useState(false);
    const [uploadingBrochure, setUploadingBrochure] = useState(false);

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch existing data
    useEffect(() => {
        api.get(`/api/products/${params.slug}`)
            .then(res => {
                const p = res.data;
                reset({
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    category: p.category || '',
                    features: p.features.map(f => ({ value: f })),
                    technicalDrawing: p.technicalDrawing || '',
                    installationManual: p.installationManual || '',
                    brochure: p.brochure || '',
                    material: p.material || '',
                    application: p.application || '',
                    compatibility: p.compatibility || '',
                    finish: p.finish || ''
                });
                setImages(p.images);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to load product");
                router.push('/dashboard');
            })
            .finally(() => setLoading(false));
    }, [params.slug, reset, router]);


    const handleImageUpload = async (e) => {
        if (!e.target.files?.length) return;

        const files = Array.from(e.target.files);
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File "${file.name}" is too large (max 10MB). It might cause upload errors.`);
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
            images,
            features: data.features.map((f) => f.value),
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

    if (loading) return <div className="p-8 text-white">Loading product data...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
            <header className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-brand-red transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Edit Product</h2>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">Update existing catalog item.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-sm">
                        Cancel
                    </button>
                    <button type="submit" form="edit-product-form" className="px-6 py-2.5 rounded-lg bg-brand-red text-white font-bold shadow-lg shadow-brand-red/20 hover:bg-red-600 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center gap-2">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </header>

            <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">

                {/* Section 1: Product Identification */}
                <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                        <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/10 text-brand-red flex items-center justify-center font-bold text-sm">01</span>
                        Product Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Product Name <span className="text-red-500">*</span></label>
                            <input
                                {...register("name")}
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                    // Slug is read-only in edit, but updating name usually doesn't auto-update slug to avoid breaking SEO, so we remove the slug update logic here
                                }}
                                className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium"
                                placeholder="e.g. Interactive Display Stand"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Category <span className="text-red-500">*</span></label>
                            <select {...register("category")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium" required>
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
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Slug (URL)</label>
                        <input
                            {...register("slug")}
                            className="w-full bg-gray-100 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl text-gray-500 font-mono text-sm cursor-not-allowed"
                            readOnly
                            title="Slug cannot be changed after creation"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Description <span className="text-red-500">*</span></label>
                        <textarea
                            {...register("description")}
                            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl h-32 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all resize-none"
                            placeholder="Detailed product description..."
                            required
                        />
                    </div>
                </section>

                {/* Section 2: Specifications & Features */}
                <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                        <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/10 text-brand-red flex items-center justify-center font-bold text-sm">02</span>
                        Specifications
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Material</label>
                            <input {...register("material")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none" placeholder="e.g. Aluminum Alloy" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Finish</label>
                            <input {...register("finish")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none" placeholder="e.g. Powder Coated" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Application</label>
                            <input {...register("application")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none" placeholder="e.g. Commercial / Education" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Compatibility</label>
                            <input {...register("compatibility")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none" placeholder="e.g. VESA 400x400" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 block mb-3">Key Features</label>
                        <div className="space-y-3">
                            {featureFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div>
                                        </div>
                                        <input {...register(`features.${index}.value`)} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 pl-8 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm" placeholder="Feature description..." />
                                    </div>
                                    <button type="button" onClick={() => removeFeature(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"><X size={20} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendFeature({ value: '' })} className="text-sm font-bold text-brand-red hover:text-red-700 flex items-center gap-2 px-2 py-1">
                                <Plus size={16} /> Add Another Feature
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 3: Media & Files */}
                <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                        <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/10 text-brand-red flex items-center justify-center font-bold text-sm">03</span>
                        Visuals & Downloads
                    </h3>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Product Images</label>
                        <div className="flex flex-wrap gap-4">
                            {images.map((url, i) => (
                                <div key={i} className="relative w-24 h-24 border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden group shadow-sm">
                                    <Image src={url} alt="Uploaded" width={96} height={96} className="object-cover w-full h-full" unoptimized />
                                    <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={20} className="text-white" />
                                    </button>
                                </div>
                            ))}
                            <label className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:bg-red-50 dark:hover:bg-brand-red/5 transition-all text-gray-400 hover:text-brand-red">
                                <Upload size={20} className="mb-1" />
                                <span className="text-[10px] font-bold uppercase">{uploading ? '...' : 'Add'}</span>
                                <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
                        {/* File Upload Helper */}
                        {[
                            { label: 'Technical Drawing', field: 'technicalDrawing', state: uploadingBlueprint, setState: setUploadingBlueprint, type: 'img' },
                            { label: 'Installation Manual', field: 'installationManual', state: uploadingManual, setState: setUploadingManual, type: 'pdf' },
                            { label: 'Product Brochure', field: 'brochure', state: uploadingBrochure, setState: setUploadingBrochure, type: 'pdf' }
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</label>
                                {watch(item.field) ? (
                                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl text-green-700 dark:text-green-400">
                                        <span className="text-xs font-medium truncate max-w-[120px]">Uploaded</span>
                                        <button type="button" onClick={() => setValue(item.field, '')} className="text-green-600 hover:text-green-800 p-1"><X size={14} /></button>
                                    </div>
                                ) : (
                                    <label className="flex items-center justify-center p-4 border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-zinc-800 transition-all text-sm text-gray-500 hover:shadow-sm">
                                        {item.state ? 'Uploading...' : 'Upload File'}
                                        <input type="file" onChange={(e) => handleFileUpload(e, item.field, item.setState)} className="hidden" accept={item.type === 'pdf' ? '.pdf' : 'image/*'} />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                            Fusion 3D URL
                            <span className="text-xs font-normal text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Optional</span>
                        </label>
                        <div className="relative">
                            <input
                                {...register("fusionUrl")}
                                className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm font-mono text-blue-600 dark:text-blue-400"
                                placeholder="https://a360.co/..."
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <span className="text-xs font-bold">URL</span>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}
