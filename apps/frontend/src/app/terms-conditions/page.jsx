'use client';

import React from 'react';

export default function TermsConditions() {
    return (
        <section className="w-full pt-32 pb-20 px-6 md:px-12 lg:px-20 dark:bg-black bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white">
                        Terms & <span className="text-red-600">Conditions</span>
                    </h1>
                </div>

                <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                    <p className="mb-4">
                        Welcome to Research Vision Tech Services (RVTS). By accessing or using our website, products, or services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully. If you do not agree with these terms, you should not use our website or services.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">1. About Us</h3>
                    <p>
                        Research Vision Tech Services (RVTS) is a provider of professional Audio-Visual (AV) products, solutions, and services, including product consultation, system integration, project implementation, technical support, training, and after-sales services.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">2. Use of Website</h3>
                    <p className="mb-2">By using this website, you agree that:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>You will use the website only for lawful purposes</li>
                        <li>You will not engage in any activity that may harm, disrupt, or misuse the website</li>
                        <li>You will not attempt unauthorized access to any part of the website or systems</li>
                    </ul>
                    <p>RVTS reserves the right to restrict or terminate access if misuse is identified.</p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">3. Product & Service Information</h3>
                    <p>
                        All product images, specifications, and descriptions on this website are for general information purposes only. Actual products, features, and availability may vary based on manufacturer updates or project requirements. RVTS reserves the right to modify or discontinue products or services without prior notice.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">4. Pricing & Quotations</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Prices displayed on the website are indicative and subject to change.</li>
                        <li>Final pricing will be shared through official quotations after requirement analysis.</li>
                        <li>All quotations are valid for a limited period as mentioned in the proposal.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">5. Orders & Project Engagements</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Orders or projects are confirmed only after written approval, advance payment (if applicable), or a mutually signed agreement.</li>
                        <li>Project timelines depend on scope, approvals, site readiness, and material availability.</li>
                        <li>RVTS is not responsible for delays caused by third-party vendors, logistics partners, or unforeseen circumstances.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">6. Intellectual Property</h3>
                    <p>
                        All content on this website, including text, images, graphics, logos, designs, and trademarks, is the property of Research Vision Tech Services unless otherwise stated. You may not copy, reproduce, modify, distribute, or use any content without prior written permission from RVTS.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">7. Warranty & After-Sales Services</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Product warranties are provided as per the manufacturer&apos;s terms and conditions.</li>
                        <li>RVTS will support warranty coordination but is not responsible for manufacturer-level warranty decisions.</li>
                        <li>After-sales support is provided as per the agreed service scope or contract.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">8. Limitation of Liability</h3>
                    <p className="mb-2">RVTS shall not be liable for:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Any indirect, incidental, or consequential damages</li>
                        <li>Loss of data, business, revenue, or profits</li>
                        <li>Issues arising from third-party products, software, or services</li>
                    </ul>
                    <p>Our liability, if any, shall be limited to the value of the products or services provided.</p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">9. Third-Party Links</h3>
                    <p>
                        Our website may contain links to external websites. RVTS does not control or endorse the content, policies, or practices of third-party websites and is not responsible for any issues arising from their use.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">10. Confidentiality</h3>
                    <p>
                        Any confidential or proprietary information shared during consultations, projects, or partnerships shall be handled responsibly and used only for business purposes, unless disclosure is required by law.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">11. Termination</h3>
                    <p>
                        RVTS reserves the right to terminate or suspend services or website access without notice if These Terms & Conditions are violated, or Misuse, fraud, or unlawful activity is identified.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">12. Governing Law</h3>
                    <p>
                        These Terms & Conditions shall be governed and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bengaluru, Karnataka.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">13. Changes to Terms</h3>
                    <p>
                        RVTS may update these Terms & Conditions at any time without prior notice. Continued use of the website or services after updates implies acceptance of the revised terms.
                    </p>

                </div>
            </div>
        </section>
    );
}
