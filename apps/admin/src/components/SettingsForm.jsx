'use client';
import { updateProfile } from "@/app/actions/settings";
import { generateAndSendOtp } from "@/app/actions/otp";
import { useState } from "react";
// @ts-expect-error: useFormState is not yet in stable react-dom types
import { useFormState } from "react-dom";

const initialState = {
    error: '',
    success: false
};

async function formAction(prevState, formData) {
    const res = await updateProfile(prevState, formData);
    if (res.error) return { error: res.error, success: false };
    if (res.success) return { error: '', success: true };
    return { error: 'Unknown error', success: false };
}

export default function SettingsForm({ user }) {
    const [state, action] = useFormState(formAction, initialState);
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isLoadingOtp, setIsLoadingOtp] = useState(false);

    const handleSendOtp = async () => {
        setIsLoadingOtp(true);
        try {
            const res = await generateAndSendOtp(user.email);
            if (res.success) {
                setOtpSent(true);
                alert("OTP sent to " + user.email + ". Check console logs if no email config.");
            } else {
                alert("Failed to send OTP");
            }
        } finally {
            setIsLoadingOtp(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-none">
            {state?.success && (
                <div className="bg-green-900/30 text-green-400 p-4 rounded mb-6 border border-green-900/50">
                    Profile updated successfully!
                </div>
            )}
            {state?.error && (
                <div className="bg-red-900/30 text-red-300 p-4 rounded mb-6 border border-red-900/50">
                    {state.error}
                </div>
            )}
            <form action={action} className="space-y-6">
                <input type="hidden" name="email" value={user.email} />

                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">Full Name</label>
                    <input
                        name="name"
                        defaultValue={user.name || ''}
                        type="text"
                        required
                        className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">New Password</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                        placeholder="Leave blank to keep current"
                    />
                </div>

                {/* Conditional OTP Section */}
                {password && (
                    <div className="space-y-2 p-4 border border-zinc-700 rounded bg-zinc-950/50">
                        <label className="text-brand-red font-bold text-sm block mb-2">Security Verification Required</label>
                        <p className="text-xs text-zinc-400 mb-4">Because you are changing your password, we sent a code to <b>{user.email}</b>.</p>

                        <div className="flex gap-2">
                            <input
                                name="otp"
                                type="text"
                                required={!!password} // Only required if password is entered
                                className="flex-1 bg-black border-2 border-zinc-800 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none transition-colors"
                                placeholder="Enter 6-digit Code"
                            />
                            {!otpSent ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isLoadingOtp}
                                    className="bg-zinc-800 text-white px-4 rounded hover:bg-zinc-700 disabled:opacity-50 text-sm font-bold"
                                >
                                    {isLoadingOtp ? 'Sending...' : 'Get Code'}
                                </button>
                            ) : (
                                <button type="button" disabled className="bg-green-900 text-green-300 px-4 rounded text-sm font-bold">Sent</button>
                            )}
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-brand-red text-white font-bold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                    >
                        UPDATE PROFILE
                    </button>
                </div>
            </form>
        </div>
    )
}
