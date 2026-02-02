export default function Partners() {
    return (
        <section className="w-full bg-[#050505] py-16 border-y border-zinc-900/50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h3 className="text-zinc-500 font-bold uppercase tracking-[0.2em] mb-12">Trusted Partners</h3>

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    {/* We use text placeholders for logos to avoid broken visuals if assets aren't there, 
                 but designed to look like a logo strip */}
                    {['TESLA', 'BMW', 'FERRARI', 'PORSCHE', 'AUDI'].map((brand, i) => (
                        <div key={i} className="text-2xl md:text-3xl font-black text-zinc-700 hover:text-white transition-colors cursor-default select-none">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
