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
          .blur_back {
             background-position: -100% 10% !important;
          }
        }
      `}</style>
      <div className="min-h-screen dark:bg-[#0c0c0c] bg-zinc-50 py-24 px-4">
        <div className="max-w-[1500px] mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-black text-[#ff3333] mb-4 uppercase tracking-tighter">Services</h1>
            <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">Explore our comprehensive range of audiovisual and technology solutions.</p>
          </div>

          <div className="flex flex-col gap-10">
            {services.map((service, index) => {
              const isOdd = index % 2 !== 0;
              return (
                <div key={index} className="movie_card relative block w-full md:w-[900px] h-auto md:h-[400px] mx-auto overflow-hidden rounded-[10px] shadow-[0px_0px_120px_-25px_rgba(255,51,51,0.1)] transition-all duration-400 hover:scale-[1.02] hover:shadow-[0px_0px_80px_-25px_rgba(255,51,51,0.2)] dark:bg-[#09090b] bg-white border dark:border-[#ff3333] border-red-200 group">

                  {/* Info Section */}
                  <div className={`info_section relative w-full h-full z-20 rounded-[10px] flex flex-col md:block ${isOdd ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-transparent from-white via-white/90 to-transparent`}
                  >

                    {/* Mobile gradient override */}
                    <div className={`absolute inset-0 md:hidden pointer-events-none bg-gradient-to-t dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-transparent from-white via-white/90 to-transparent`} style={{ background: '' }}></div>

                    <div className={`movie_header relative p-[30px] h-auto md:h-[40%] w-full md:w-[50%] mt-[85px] md:mt-0 z-10 ${isOdd ? 'md:ml-auto md:text-right' : ''}`}>
                      {/* Poster/Icon Image */}
                      <Image
                        className={`locandina relative h-[120px] shadow-[0_0_20px_-10px_rgba(0,0,0,0.5)] object-cover rounded-xl dark:bg-zinc-900 bg-white dark:border-white/10 border-black/10 border ${isOdd ? 'float-right ml-[25px]' : 'float-left mr-[25px]'}`}
                        src={service.image}
                        alt={service.title}
                        width={120}
                        height={120}
                      />

                      <div className="pt-2">
                        <h1 className="dark:text-white text-black font-bold text-3xl mb-2">{service.title}</h1>
                        <h4 className="dark:text-zinc-300 text-zinc-600 font-bold text-sm tracking-wide uppercase">{service.category}</h4>
                        <span className="minutes inline-block mt-[15px] dark:text-zinc-200 text-zinc-700 p-[5px] px-3 rounded-md dark:bg-white/10 bg-black/5 dark:border-white/20 border-black/10 border text-xs font-bold">
                          {service.duration}
                        </span>
                        <p className="type inline-block dark:text-zinc-400 text-zinc-500 ml-[10px] text-xs uppercase tracking-wider font-semibold">Service</p>
                      </div>
                    </div>

                    <div className={`movie_desc relative p-[30px] h-auto md:h-[50%] w-full md:w-[50%] z-10 ${isOdd ? 'md:ml-auto md:text-right' : ''}`}>
                      <p className="dark:text-zinc-200 text-zinc-700 text-base leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>

                    <div className={`movie_social h-[10%] pl-[15px] pb-[20px] z-10 md:absolute md:bottom-0 ${isOdd ? 'md:right-0 md:pr-[30px]' : 'md:left-0'}`}>
                      <ul className={`list-none p-0 flex ${isOdd ? 'justify-end' : ''}`}>
                        <li className="inline-block dark:text-white/50 text-black/40 transition-colors duration-300 mx-[10px] dark:hover:text-white hover:text-black cursor-pointer">
                          <Share2 size={19} />
                        </li>
                        <li className="inline-block dark:text-white/50 text-black/40 transition-colors duration-300 mx-[10px] dark:hover:text-white hover:text-black cursor-pointer">
                          <Heart size={19} />
                        </li>
                        <li className="inline-block dark:text-white/50 text-black/40 transition-colors duration-300 mx-[10px] dark:hover:text-white hover:text-black cursor-pointer">
                          <MessageCircle size={19} />
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Blur Background Image */}
                  <div
                    className={`blur_back absolute top-0 h-full w-full md:w-[80%] z-[1] bg-cover bg-no-repeat rounded-[11px] transition-all duration-500 ${isOdd ? 'left-0' : 'right-0'}`}
                    style={{
                      backgroundImage: `url('${service.image}')`,
                      backgroundPosition: '50% 50%',
                    }}
                  >
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
