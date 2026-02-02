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
import { staticProducts } from '@/lib/static-products';

// Helper to return static products
function getProducts() {
    return staticProducts;
}


export default async function Home() {
    const products = await getProducts();
    const latestProducts = products.map((p) => ({
        name: p.title || p.name,
        image: p.images && p.images.length > 0 ? p.images[0] : undefined,
        slug: p.slug,
        category: p.category
    }));

    return (
        <main className="bg-black min-h-screen w-full overflow-x-hidden selection:bg-brand-red selection:text-white">
            <Hero />
            {/* <Vision /> */}
            <About />  
            <ClientsCarousel />
            {/* <ThreeDProduct /> */}      
            <ProductShowcase />

            <Services />
            <ConceptToCustomer />
            <WhyChoose />
            <Industries />
            <Partners />

        </main>
    );
}
