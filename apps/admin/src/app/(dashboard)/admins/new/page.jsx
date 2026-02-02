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
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Create New Admin</h2>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-none">
                {state?.success && (
                    <div className="bg-green-900/30 text-green-400 p-4 rounded mb-6 border border-green-900/50">
                        Admin created successfully!
                    </div>
                )}
                {state?.error && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded mb-6 border border-red-900/50">
                        {state.error}
                    </div>
                )}

                <form action={action} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Email Address</label>
                        <div className="flex gap-2">
                            <input
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                                placeholder="new_admin@rvts.com"
                            />
                            {!otpSent ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isLoadingOtp || !email}
                                    className="bg-brand-red/20 text-brand-red border border-brand-red/50 px-4 rounded hover:bg-brand-red/30 disabled:opacity-50 text-xs font-bold whitespace-nowrap"
                                >
                                    {isLoadingOtp ? 'Sending...' : 'Verify Email'}
                                </button>
                            ) : (
                                <button type="button" disabled className="bg-green-900/30 text-green-400 border border-green-800 px-4 rounded text-xs font-bold whitespace-nowrap">Verified Sent</button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Verification Code</label>
                        <input
                            name="otp"
                            type="text"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                            placeholder="Enter 6-digit code sent to email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-brand-red text-white font-bold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                        >
                            CREATE ADMIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
