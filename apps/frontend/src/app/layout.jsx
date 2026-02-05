import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-outfit',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
});

export const metadata = {
    title: 'RVTS | Research Vision Tech Services',
    description: 'Next Gen Digital Solutions',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme') || 'dark';
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${outfit.variable} ${inter.variable} font-inter antialiased`}>
                <AuthProvider>
                    <div className="fixed inset-0 z-[-1] pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-brand-red/5 to-transparent opacity-60" />
                        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px]" />
                    </div>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppButton />
                </AuthProvider>
            </body>
        </html>
    );
}
