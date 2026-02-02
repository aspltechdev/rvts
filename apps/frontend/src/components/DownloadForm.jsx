'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronDown } from 'lucide-react';
import { submitContactQuery } from '../app/actions/contact';
import { z } from 'zod';

// Country Codes List (Simplified for common use cases, prioritized India as requested)
const countryCodes = [
    { code: '+91', country: 'IN', label: 'India (+91)' },
    { code: '+1', country: 'US', label: 'United States (+1)' },
    { code: '+44', country: 'GB', label: 'United Kingdom (+44)' },
    { code: '+971', country: 'AE', label: 'UAE (+971)' },
    { code: '+61', country: 'AU', label: 'Australia (+61)' },
    { code: '+86', country: 'CN', label: 'China (+86)' },
    { code: '+49', country: 'DE', label: 'Germany (+49)' },
    { code: '+33', country: 'FR', label: 'France (+33)' },
    { code: '+81', country: 'JP', label: 'Japan (+81)' },
    { code: '+65', country: 'SG', label: 'Singapore (+65)' },
];

const formSchema = z.object({
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    email: z.string().email('Please enter a valid email address'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\d+$/, 'Phone number must contain only digits'),
    countryCode: z.string(),
    company: z.string().optional(),
});

export default function DownloadForm({ isOpen, onClose, productName, downloadType, onDownload }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFieldErrors({});

        const formData = new FormData(e.target);

        // Construct full phone number with country code
        const rawPhone = formData.get('phoneNumber');
        const fullPhoneNumber = `${selectedCountry.code} ${rawPhone}`;

        const rawData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: rawPhone,
            countryCode: selectedCountry.code,
            subject: `Download Request: ${productName} - ${downloadType}`,
            message: `User downloaded ${downloadType} for product: ${productName}. Company: ${formData.get('company') || 'N/A'}`
        };

        // Client-side validation
        const validation = formSchema.safeParse(rawData);

        if (!validation.success) {
            const formattedErrors = {};
            validation.error.errors.forEach((err) => {
                if (err.path[0]) {
                    formattedErrors[err.path[0]] = err.message;
                }
            });
            setFieldErrors(formattedErrors);
            setLoading(false);
            return;
        }

        // Prepare data for server
        // We override the phone number in formData to be the full international format
        formData.set('phoneNumber', fullPhoneNumber);
        formData.append('subject', rawData.subject);
        formData.append('message', rawData.message);

        const result = await submitContactQuery(formData);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                onDownload();
                onClose();
                setSuccess(false);
            }, 1000);
        } else {
            setError(result.error || 'Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[7000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-visible shadow-2xl transition-colors duration-300 transform scale-95"
                    >
                        {/* Header */}
                        <div className="relative p-5 md:p-6 pb-0 flex justify-between items-start z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black uppercase text-zinc-900 dark:text-white tracking-wide mb-1">
                                    Download <span className="text-brand-red">{downloadType}</span>
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                    Please complete the form below to access the {productName} documentation.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-5 md:p-6 relative z-10">
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-1">First Name</label>
                                        <input
                                            name="firstName"
                                            className={`w-full bg-zinc-50 dark:bg-black/50 border ${fieldErrors.firstName ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-red'} rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600`}
                                            placeholder="John"
                                        />
                                        {fieldErrors.firstName && <p className="text-red-500 text-[10px] pl-1">{fieldErrors.firstName}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            className={`w-full bg-zinc-50 dark:bg-black/50 border ${fieldErrors.lastName ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-red'} rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600`}
                                            placeholder="Doe"
                                        />
                                        {fieldErrors.lastName && <p className="text-red-500 text-[10px] pl-1">{fieldErrors.lastName}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className={`w-full bg-zinc-50 dark:bg-black/50 border ${fieldErrors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-red'} rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600`}
                                        placeholder="john@company.com"
                                    />
                                    {fieldErrors.email && <p className="text-red-500 text-[10px] pl-1">{fieldErrors.email}</p>}
                                </div>

                                {/* Phone Input with Country Dropdown */}
                                <div className="space-y-1.5 relative">
                                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-1">Phone Number</label>
                                    <div className="flex gap-2">

                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`h-full min-w-[90px] px-3 bg-zinc-50 dark:bg-black/50 border ${fieldErrors.phoneNumber ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-red'} rounded-xl flex items-center justify-between text-sm text-zinc-900 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/80`}
                                            >
                                                <span>{selectedCountry.code}</span>
                                                <ChevronDown size={14} className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute top-full left-0 mt-2 w-[240px] max-h-[200px] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
                                                    >
                                                        {countryCodes.map((country) => (
                                                            <button
                                                                key={country.code + country.country}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedCountry(country);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-200 flex items-center justify-between"
                                                            >
                                                                <span>{country.label}</span>
                                                                {selectedCountry.code === country.code && <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <input
                                            name="phoneNumber"
                                            type="tel"
                                            className={`flex-1 bg-zinc-50 dark:bg-black/50 border ${fieldErrors.phoneNumber ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-brand-red'} rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600`}
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    {fieldErrors.phoneNumber && <p className="text-red-500 text-[10px] pl-1">{fieldErrors.phoneNumber}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pl-1">Company (Optional)</label>
                                    <input
                                        name="company"
                                        className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 focus:border-brand-red rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                        placeholder="Company Ltd"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs text-center">
                                        {error}
                                    </div>
                                )}

                                {success ? (
                                    <div className="w-full bg-green-500/20 text-green-500 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                        Download Starting...
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-brand-red text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                    >
                                        {loading ? 'Processing...' : 'Download Now'}
                                        {!loading && <Download size={18} />}
                                    </button>
                                )}

                                <p className="text-[10px] text-zinc-500 dark:text-zinc-500 text-center mt-2">
                                    Your information is secure. We&apos;ll send a copy of the documentation to your email.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
