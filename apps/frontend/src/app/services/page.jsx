'use client';

import { Share2, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    title: "Product Consultation",
    category: "Strategic Planning",
    duration: "Expert Guidance",
    description: "Expert advice to help you choose the right technology solutions tailored to your specific needs and goals. We analyze your requirements to ensure optimal system selection.",
    image: "/images/services/consultation.png"
  },
  {
    title: "Technical Support & Training",
    category: "Skilled Operations",
    duration: "24/7 Support",
    description: "Comprehensive technical assistance and hands-on training to ensure your team can operate and maintain systems effectively. We empower your staff with expertise.",
    image: "/images/services/support.png"
  },
  {
    title: "Project Implementation",
    category: "Deployment",
    duration: "End-to-End Execution",
    description: "Reliable end-to-end execution of technology projects, from planning and installation to final testing and hand-over. We bring your vision to life with precision.",
    image: "/images/services/implementation.png"
  },
  {
    title: "2D & 3D Implementation",
    category: "Visualization",
    duration: "Design Accuracy",
    description: "Professional 2D and 3D design and visualization services to help plan and present your technology infrastructure. Clear visuals for complex installations.",
    image: "/images/services/2d3d.png"
  },
  {
    title: "Warranty & After-Sales Services",
    category: "Maintenance",
    duration: "Long-term Reliability",
    description: "Dedicated support and maintenance programs to protect your investment and ensure long-term system reliability. We stay with you long after the deployment.",
    image: "/images/services/warranty.png"
  },
  {
    title: "Logistics & Timely Delivery",
    category: "Supply Chain",
    duration: "On-schedule Arrivals",
    description: "Efficient supply chain management and delivery processes to ensure your hardware arrives on schedule and in perfect condition. Global reach, local precision.",
    image: "/images/services/logistics.png"
  },
  {
    title: "Dealer & Partner Programs",
    category: "Collaboration",
    duration: "Mutual Growth",
    description: "Strategic collaboration programs designed to support our network of dealers and technology partners for mutual growth and success. Strengthening the tech ecosystem.",
    image: "/images/services/partners.png"
  },
  {
    title: "Web & Graphic Design",
    category: "Creative Services",
    duration: "Digital Presence",
    description: "Creative design solutions for digital presence, including website development and professional graphic assets for your brand. Enhancing your visual identity.",
    image: "/images/services/webdesign.png"
  }
];

export default function ServicesPage() {
  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          .movie_card {
            height: 400px;
          }
        }
      `}</style>
      <div className="min-h-screen dark:bg-[#0c0c0c] bg-zinc-50 pt-28 pb-24 px-4 text-zinc-900">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col gap-6">
            {services.map((service, index) => {
              const isOdd = index % 2 !== 0;
              return (
                <div key={index} className="movie_card relative w-full md:w-[900px] flex flex-col md:block mx-auto overflow-hidden rounded-[24px] md:rounded-[20px] shadow-2xl transition-all duration-500 hover:scale-[1.01] dark:bg-[#09090b] bg-white border dark:border-[#ff3333]/20 border-red-100 group mb-12 min-h-fit md:min-h-[400px]">

                  {/* 1. Background Image Layer */}
                  <div
                    className={`relative md:absolute top-0 h-[240px] md:h-full w-full md:w-[70%] z-0 transition-all duration-700 grayscale group-hover:grayscale-0 ${isOdd ? 'md:left-0' : 'md:right-0'}`}
                    style={{
                      backgroundImage: `url('${service.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Mobile-only gradient shadow inside the image area */}
                    <div className="absolute inset-0 md:hidden bg-gradient-to-t dark:from-[#09090b] from-white via-transparent to-transparent opacity-40" />
                  </div>

                  {/* 2. Desktop-only Side Gradient (The Splash) */}
                  <div className={`hidden md:block absolute inset-0 z-10 transition-opacity duration-500
                    ${isOdd ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}
                    dark:from-[#09090b] dark:via-[#09090b]/95 dark:to-transparent
                    from-white via-white/95 to-transparent
                  `} />

                  {/* 3. Content Area */}
                  <div className={`relative z-20 w-full p-8 md:p-10 flex flex-col justify-center h-full
                    ${isOdd ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>

                    {/* Header: Title + Icon (Desktop only Icon) */}
                    <div className={`flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 w-full md:w-[65%] ${isOdd ? 'md:flex-row-reverse' : ''}`}>
                      {/* Box Icon - Desktop Only */}
                      <div className="hidden md:block relative h-28 w-28 shrink-0 shadow-2xl rounded-2xl overflow-hidden border-2 dark:border-white/10 border-zinc-100 bg-white">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-1 md:gap-2 text-center md:text-left">
                        <h1 className="dark:text-white text-black font-black text-3xl md:text-5xl leading-tight tracking-tighter">
                          {service.title}
                        </h1>

                        {/* Labels - Desktop only */}
                        <div className="hidden md:flex flex-col gap-2">
                          <h4 className="dark:text-[#ff3333] text-red-600 font-black text-xs tracking-[0.3em] uppercase">
                            {service.category}
                          </h4>
                          <div className={`flex flex-wrap items-center gap-3 mt-1 ${isOdd ? 'md:justify-end' : 'md:justify-start'}`}>
                            <span className="inline-block dark:text-zinc-100 text-zinc-800 px-3 py-1 rounded-full dark:bg-white/10 bg-black/5 dark:border-white/20 border-black/10 border text-[9px] font-black uppercase tracking-widest">
                              {service.duration}
                            </span>
                            <span className="dark:text-zinc-500 text-zinc-400 text-[9px] uppercase tracking-[0.4em] font-black">SERVICE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className={`mt-6 md:mt-6 w-full md:w-[60%] ${isOdd ? 'md:ml-auto' : ''}`}>
                      <p className="dark:text-zinc-200 text-zinc-700 text-base md:text-xl leading-relaxed font-medium opacity-95">
                        {service.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}