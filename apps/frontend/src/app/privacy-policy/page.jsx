'use client';

import React from 'react';

export default function PrivacyPolicy() {
    return (
        <section className="w-full pt-32 pb-20 px-6 md:px-12 lg:px-20 dark:bg-black bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white">
                        Privacy <span className="text-red-600">Policy</span>
                    </h1>
                </div>

                <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                    <p className="mb-4">
                        At Research Vision Tech Services (RVTS), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website or interact with our services.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">1. Information We Collect</h3>
                    <p className="mb-2">We may collect the following types of information:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Personal Information:</strong> Name, Email address, Phone number, Company name, Any details you submit through contact forms, enquiries, or emails.</li>
                        <li><strong>Technical Information:</strong> IP address, Browser type, Device information, Pages visited and time spent on the website.</li>
                    </ul>
                    <p>This information is collected to improve our website experience and respond to your requests effectively.</p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">2. How We Use Your Information</h3>
                    <p className="mb-2">We use your information to:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Respond to enquiries and service requests</li>
                        <li>Provide product consultation and support</li>
                        <li>Improve our website and services</li>
                        <li>Share updates, offers, or information (only if you choose to receive them)</li>
                        <li>Ensure website security and performance</li>
                    </ul>
                    <p>We do not sell, rent, or trade your personal information to third parties.</p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">3. Cookies & Tracking Technologies</h3>
                    <p>
                        Our website may use cookies to understand user behaviour, improve website functionality, and enhance user experience. You can choose to disable cookies through your browser settings if you prefer.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">4. Data Protection & Security</h3>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, misuse, loss, or disclosure. While we strive to use commercially acceptable means to protect your information, no method of transmission over the internet is 100% secure.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">5. Third-Party Links</h3>
                    <p>
                        Our website may contain links to third-party websites. RVTS is not responsible for the privacy practices or content of external websites. We encourage users to review the privacy policies of those sites before sharing personal information.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">6. Information Sharing</h3>
                    <p className="mb-2">We may share your information only when:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Required by law or legal process</li>
                        <li>Necessary to provide services you have requested</li>
                        <li>Working with trusted partners strictly for business operations (under confidentiality obligations)</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">7. Your Rights</h3>
                    <p className="mb-2">You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Request access to your personal data</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Withdraw consent for communications at any time</li>
                    </ul>
                    <p>To exercise these rights, please contact us using the details below.</p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">8. Changes to This Privacy Policy</h3>
                    <p>
                        RVTS may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-2 text-black dark:text-white">9. Contact Us</h3>
                    <p className="mb-2">If you have any questions about this Privacy Policy or how your information is handled, please contact us:</p>
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <p className="font-bold">Research Vision Tech Services</p>
                        <p>📍 Bengaluru, Karnataka, India</p>
                        <p>📧 Email: sales@researchvisions.com</p>
                        <p>📞 Phone: +91 95911 33004</p>
                        <p>🌐 Website: www.researchvisions.com</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
