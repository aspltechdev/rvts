'use client';

import { createAdmin } from "@/app/actions/user";
import { generateAndSendOtp } from "@/app/actions/otp";
import { useState } from "react";
// @ts-expect-error: useFormState is not yet in stable react-dom types
import { useFormState } from "react-dom";

const initialState = {
    error: '',
    success: false
};

async function formAction(prevState, formData) {
    const res = await createAdmin(prevState, formData);
    if (res.error) return { error: res.error, success: false };
    if (res.success) return { error: '', success: true };
    return { error: 'Unknown error', success: false };
}

export default function NewAdminPage() {
    const [state, action] = useFormState(formAction, initialState);
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isLoadingOtp, setIsLoadingOtp] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {
            alert("Please enter a valid email address first.");
            return;
        }
        setIsLoadingOtp(true);
        try {
            const res = await generateAndSendOtp(email);
            if (res.success) {
                setOtpSent(true);
                alert("Verification code sent to " + email + ". Check console for dev.");
            } else {
                alert("Failed to send verification code.");
            }
        } finally {
            setIsLoadingOtp(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-1 sm:px-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white">Create New Admin</h2>

            <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-8 rounded-xl shadow-none">
                {state?.success && (
                    <div className="bg-green-900/30 text-green-400 p-4 rounded mb-6 border border-green-900/50 text-sm">
                        Admin created successfully!
                    </div>
                )}
                {state?.error && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded mb-6 border border-red-900/50 text-sm">
                        {state.error}
                    </div>
                )}

                <form action={action} className="space-y-5 md:space-y-6">
                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors text-sm md:text-base"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Email Address</label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                            <input
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors text-sm md:text-base"
                                placeholder="new_admin@rvts.com"
                            />
                            {!otpSent ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isLoadingOtp || !email}
                                    className="bg-brand-red/10 text-brand-red border border-brand-red/30 py-3 sm:py-0 px-6 rounded-lg hover:bg-brand-red/20 disabled:opacity-50 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all"
                                >
                                    {isLoadingOtp ? 'Sending...' : 'Verify Email'}
                                </button>
                            ) : (
                                <button type="button" disabled className="bg-green-900/20 text-green-400 border border-green-800/30 py-3 sm:py-0 px-6 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap">Verified</button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Verification Code</label>
                        <input
                            name="otp"
                            type="text"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors text-sm md:text-base"
                            placeholder="Enter 6-digit code"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors text-sm md:text-base"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-4 md:pt-6">
                        <button
                            type="submit"
                            className="w-full bg-brand-red text-white font-black py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 uppercase tracking-widest text-sm md:text-base"
                        >
                            CREATE ADMIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
