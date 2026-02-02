import Image from 'next/image';
import { Play } from 'lucide-react';

export default function ProductCard({ image, isActive = false }) {
    return (
        <div className={`relative group w-[280px] h-[400px] md:w-[320px] md:h-[450px] bg-zinc-900/80 backdrop-blur-sm rounded-xl border ${isActive ? 'border-brand-red shadow-[0_0_30px_rgba(208,0,0,0.2)]' : 'border-zinc-800'} p-5 flex flex-col items-center justify-between transition-all duration-500 hover:scale-105 hover:border-brand-red hover:shadow-[0_0_30px_rgba(208,0,0,0.4)]`}>
            {/* Monitor Image Container */}
            <div className="relative w-full flex-1 flex items-center justify-center p-2">
                {/* We use specific styling to simulate the monitor look if the image is just a screen content */}
                <div className="relative w-full aspect-video bg-black border-4 border-zinc-800 rounded-sm shadow-2xl skew-x-0 group-hover:skew-x-1 transition-transform duration-500 overflow-hidden">
                    <Image src={image} alt="Product Monitor" fill className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    {/* Gloss */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
                {/* Monitor Stand Base Mockup */}
                <div className="absolute bottom-16 w-1/3 h-2 bg-zinc-800 rounded-full blur-[1px]"></div>
            </div>

            {/* Bottom Overlay / Action */}
            <div className="w-full h-[70px] bg-black border border-zinc-800 rounded-lg flex flex-col items-center justify-center gap-1 group-hover:border-brand-red group-hover:bg-zinc-950 transition-all duration-300 mt-4">
                <div className="w-8 h-8 rounded-full bg-transparent border border-brand-red flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 scale-90 group-hover:scale-110">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                </div>
                <span className="text-zinc-500 group-hover:text-brand-red text-[10px] tracking-[0.2em] font-bold uppercase transition-colors">Mounting Fixed</span>
            </div>
        </div>
    )
}
