import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function UserLayout({ children }) {
    return (
        <>
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-brand-red/5 to-transparent opacity-60" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px]" />
            </div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
