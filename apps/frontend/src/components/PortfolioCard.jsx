import { Play } from 'lucide-react';
import Image from 'next/image';

export default function PortfolioCard({ title, subtitle, image, buttons }) {
    return (
        <div className="group relative w-full dark:bg-[#0a0a0a] bg-white rounded-xl overflow-hidden border dark:border-zinc-900/50 border-zinc-200 hover:border-brand-red/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(208,0,0,0.15)] flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-[240px] md:h-[320px] w-full overflow-hidden shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                {/* Text Content */}
                <div className="absolute bottom-4 left-5 right-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 drop-shadow-md">{title}</h3>
                    <p className="text-zinc-300 text-xs md:text-sm font-medium opacity-90">{subtitle}</p>
                </div>
            </div>

            {/* Footer / Buttons Section */}
            <div className="dark:bg-[#050505] bg-zinc-50 p-3 md:p-4 grid grid-cols-3 gap-2 mt-auto border-t dark:border-zinc-900 border-zinc-200">
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        className="flex flex-col items-center justify-center gap-2 dark:bg-black bg-white border dark:border-zinc-800/80 border-zinc-200 hover:border-brand-red rounded-lg p-2 transition-all duration-300 group/btn h-[70px]"
                    >
                        {btn.icon && (
                            <div className="w-5 h-5 rounded-full border border-brand-red flex items-center justify-center text-brand-red group-hover/btn:bg-brand-red group-hover/btn:text-white transition-all duration-300 scale-90 group-hover/btn:scale-100 shadow-[0_0_10px_rgba(208,0,0,0.2)]">
                                <Play size={8} fill="currentColor" className="ml-0.5" />
                            </div>
                        )}
                        <span className="text-[8px] md:text-[9px] text-brand-red font-bold uppercase text-center leading-tight tracking-wider group-hover/btn:text-red-400 transition-colors">
                            {btn.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
