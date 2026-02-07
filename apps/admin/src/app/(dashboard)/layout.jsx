'use client';
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    PlusCircle,
    UserPlus,
    Settings,
    LogOut,
    MessageSquare,
    Moon,
    Sun,
    Search,
    Bell,
    ChevronDown,
    Menu
} from 'lucide-react';

import { useTheme } from '@/components/ThemeContext';

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 text-brand-red">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-900 dark:text-white font-medium">Loading Panel...</span>
            </div>
        </div>
    );

    if (!session) return null;

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Queries', href: '/queries', icon: MessageSquare },
        { name: 'Add Product', href: '/products/new', icon: PlusCircle },
        { name: 'Add Admin', href: '/admins/new', icon: UserPlus },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex font-sans transition-colors duration-300 overflow-x-hidden">

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col p-6">

                    {/* Logo */}
                    <div className="flex items-center justify-start mb-10 px-2">
                        <div className="relative w-[140px] h-[50px]">
                            <Image
                                src="/rvts-logo.png"
                                alt="RVTS Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                                        : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon size={20} className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 dark:text-zinc-500 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer text */}
                    <div className="mt-auto px-4 py-4 text-xs text-center text-gray-400 dark:text-zinc-600">
                        &copy; 2026 RVTS Admin
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-60 transition-all duration-300">

                {/* Top Navbar */}
                <header className="sticky top-0 z-30 h-16 md:h-20 px-4 md:px-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between gap-4">

                    {/* Left: Mobile Toggle & Search */}
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="relative w-full max-w-md hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search products, orders, or customers..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-zinc-900 border focus:border-brand-red rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 sm:gap-6">

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-brand-red dark:hover:text-brand-red transition-all duration-200 focus:outline-none"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>


                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{session.user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-brand-red/20">
                                    {session.user?.name?.[0]?.toUpperCase() || 'A'}
                                </div>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-zinc-800 overflow-hidden z-20 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
                                        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/20">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">Signed in as</p>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mt-0.5">{session.user?.email}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                <Settings size={16} />
                                                Account Settings
                                            </Link>
                                            <button
                                                onClick={async () => {
                                                    await signOut({ redirect: false });
                                                    router.push('/login');
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-screen md:w-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
