import React from 'react';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import Partners from '@/components/Partners';

export default function AboutPage() {
    return (
        <main className="flex flex-col w-full min-h-screen">
            <section id="about-overview">
                <About />
            </section>
            <section id="about-why-choose">
                <WhyChoose />
            </section>
            <section id="about-partners">
                <Partners />
            </section>
        </main>
    );
}
