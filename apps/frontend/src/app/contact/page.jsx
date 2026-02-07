'use client';

import { Send } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { submitContactQuery } from '@/app/actions/contact';

const contactSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').regex(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
    lastName: z.string().optional().or(z.literal('')),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

function ContactContent() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const searchParams = useSearchParams();
    const defaultSubject = searchParams.get('subject') || 'General Inquiry';

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError('');
        setFieldErrors({});
        setSuccess(false);

        const formData = new FormData(event.target);
        const rawData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const validation = contactSchema.safeParse(rawData);

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

        const result = await submitContactQuery(formData);

        if (result.success) {
            setSuccess(true);
            event.target.reset();
        } else {
            setError(result.error || 'Something went wrong');
        }
        setLoading(false);
    }

    return (
        <main className="min-h-screen dark:bg-black bg-white dark:text-white text-zinc-900 pt-32 pb-20 px-6 relative overflow-hidden transition-colors duration-300">
            {/* Background Effects */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-brand-red font-bold tracking-widest text-lg uppercase mb-2">Get In Touch</h2>
                    <h1 className="text-4xl md:text-6xl font-black dark:text-white text-zinc-900 uppercase">
                        Let&apos;s Talk <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">Solutions</span>
                    </h1>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Contact Form */}
                    <div className="dark:bg-zinc-900/50 bg-white border border-gray-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-2xl relative transition-all duration-300">
                        {/* Glow effect under form */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-brand-red/20 to-transparent rounded-3xl blur-xl opacity-50 -z-10" />

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        className={`w-full dark:bg-black/50 bg-gray-50 border p-3 rounded-xl dark:text-white text-zinc-900 focus:outline-none transition-all ${fieldErrors.firstName
                                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                            : 'border-gray-200 dark:border-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
                                            }`}
                                        placeholder="John"
                                    />
                                    {fieldErrors.firstName && <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        className={`w-full dark:bg-black/50 bg-gray-50 border p-3 rounded-xl dark:text-white text-zinc-900 focus:outline-none transition-all ${fieldErrors.lastName
                                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                            : 'border-gray-200 dark:border-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
                                            }`}
                                        placeholder="Doe"
                                    />
                                    {fieldErrors.lastName && <p className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    className={`w-full dark:bg-black/50 bg-gray-50 border p-3 rounded-xl dark:text-white text-zinc-900 focus:outline-none transition-all ${fieldErrors.email
                                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                        : 'border-gray-200 dark:border-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
                                        }`}
                                    placeholder="john@company.com"
                                />
                                {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    className={`w-full dark:bg-black/50 bg-gray-50 border p-3 rounded-xl dark:text-white text-zinc-900 focus:outline-none transition-all ${fieldErrors.phoneNumber
                                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                        : 'border-gray-200 dark:border-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
                                        }`}
                                    placeholder="+1 (555) 000-0000"
                                />
                                {fieldErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneNumber}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">Subject</label>
                                <select
                                    name="subject"
                                    defaultValue={defaultSubject}
                                    className="w-full dark:bg-black/50 bg-gray-50 border border-gray-200 dark:border-zinc-700 p-3 rounded-xl dark:text-zinc-300 text-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Product Quote">Product Quote</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Partnership">Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold dark:text-zinc-400 text-zinc-500 uppercase tracking-wide">Message</label>
                                <textarea
                                    name="message"
                                    className={`w-full dark:bg-black/50 bg-gray-50 border p-3 rounded-xl dark:text-white text-zinc-900 h-24 focus:outline-none transition-all ${fieldErrors.message
                                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                        : 'border-gray-200 dark:border-zinc-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red'
                                        }`}
                                    placeholder="Tell us about your project..."
                                />
                                {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg text-sm">
                                    Message sent successfully! We&apos;ll get back to you soon.
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ContactContent />
        </Suspense>
    );
}
