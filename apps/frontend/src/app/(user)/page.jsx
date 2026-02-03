export const dynamic = 'force-dynamic';
import Hero from "@/components/Hero";
// import Vision from "@/components/Vision";
import About from "@/components/About";
import ProductShowcase from "@/components/ProductShowcase";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Industries from "@/components/Industries";
import ConceptToCustomer from "@/components/ConceptToCustomer";

import WhyChoose from "@/components/WhyChoose";

import ThreeDProduct from "@/components/ThreeDProduct";
import ClientsCarousel from "@/components/ClientsCarousel";
// Helper to fetch products
async function getProducts() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'
        const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function Home() {
    await getProducts(); // Just to trigger a fetch check if needed, though we don't use the result here yet.
    // Fixed: removed unused 'latestProducts' mapping.

    return (
        <main className="bg-black min-h-screen w-full overflow-x-hidden selection:bg-brand-red selection:text-white">
            <Hero />
            {/* <Vision /> */}
            <About />
            <ClientsCarousel />
            <ThreeDProduct />

            <ProductShowcase />
            <Services />
            <ConceptToCustomer />
            <WhyChoose />
            <Industries />
            <Partners />

        </main>
    );
}
