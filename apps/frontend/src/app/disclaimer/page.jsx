'use client';

import React from 'react';

export default function Disclaimer() {
    return (
        <section className="w-full pt-32 pb-20 px-6 md:px-12 lg:px-20 dark:bg-black bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white">
                        <span className="text-red-600">Disclaimer</span>
                    </h1>
                </div>

                <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                    <p className="mb-4">
                        The information provided on the website of Research Vision Tech Services (RVTS) is for general informational purposes only. While we strive to keep the content accurate, up to date, and reliable, we make no warranties or representations of any kind, express or implied, about the completeness, accuracy, suitability, or availability of the information, products, or services displayed on this website.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">No Professional or Technical Advice</h3>
                    <p className="mb-2">All content on this website, including product descriptions, specifications, images, and service details, is provided for general guidance only.</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>It should not be considered as professional, technical, or engineering advice.</li>
                        <li>Actual Audio-Visual solutions, configurations, and outcomes may vary based on site conditions, project requirements, and third-party product specifications.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">Product & Service Information</h3>
                    <p>
                        Product images and descriptions are illustrative and may differ from the actual products supplied. Availability, specifications, and pricing of products are subject to change without prior notice. RVTS reserves the right to modify, update, or discontinue any product or service at its discretion.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">Limitation of Liability</h3>
                    <p>
                        Under no circumstances shall Research Vision Tech Services be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of this website, products, or services.
                    </p>
                    <p className="mb-2">This includes, but is not limited to:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Loss of data or business</li>
                        <li>System downtime</li>
                        <li>Project delays due to third-party vendors</li>
                        <li>Technical incompatibilities beyond RVTS&apos;s control</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">Third-Party Links & Content</h3>
                    <p>
                        This website may contain links to third-party websites or references to external products and services. RVTS does not control or endorse the content, accuracy, or policies of any third-party websites and shall not be responsible for any damages or losses arising from their use.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">No Guarantees</h3>
                    <p>
                        While RVTS aims to deliver high-quality AV solutions and services, we do not guarantee specific results, performance outcomes, or business benefits unless explicitly agreed upon in a written contract or service agreement.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">Changes to This Disclaimer</h3>
                    <p>
                        RVTS reserves the right to modify or update this Disclaimer at any time without prior notice. Continued use of the website constitutes acceptance of any changes.
                    </p>

                </div>
            </div>
        </section>
    );
}
