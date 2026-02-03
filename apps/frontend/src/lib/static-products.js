
export const staticProducts = [
    {
        id: "led-lcd-panels",
        slug: "led-lcd-panels",
        name: "LED & LCD PANELS",
        title: "Professional LED & LCD Display Panels",
        description: "High-performance display panels for commercial and industrial use.",
        category: "Displays & Video walls",
        images: ["/images/video-wall.png"],
        features: ["Ultra-slim bezel", "4K Resolution support", "24/7 Operation capability", "High brightness levels"],
        published: true,
        material: "Industrial grade Aluminum/Steel",
        compatibility: "Universal mounting standards",
        application: "Corporate, Retail, Control Rooms",
        brochure: "#",
        installationManual: "#",
        technicalDataSheet: "#"
    },
    {
        id: "interactive-touchscreens",
        slug: "interactive-touchscreens",
        name: "INTERACTIVE TOUCHSCREENS",
        title: "Ultra-Responsive Interactive Touchscreens",
        description: "Advanced touch-sensitive displays for collaborative environments.",
        category: "Displays & Video walls",
        images: ["/images/control-tablet.png"],
        features: ["Multi-touch points", "Anti-glare glass", "Integrated OS options", "Wireless screen sharing"],
        published: true,
        material: "Reinforced Heat-treated Glass",
        compatibility: "Windows, Android, macOS",
        application: "Education, Boardrooms, Presentation",
        brochure: "#",
        installationManual: "#"
    },
    {
        id: "active-led-screens",
        slug: "active-led-screens",
        name: "ACTIVE LED SCREENS",
        title: "High-Brightness Active LED Screens",
        description: "Vibrant and seamless LED screens for high-impact visual communication.",
        category: "Displays & Video walls",
        images: ["/images/room-scheduling.png"],
        features: ["Seamless tiling", "High refresh rate", "Front-serviceable modules", "Energy efficient"],
        published: true,
        material: "Lightweight Die-cast Magnesium",
        compatibility: "Standard LED controllers",
        application: "Events, Airports, Shopping Malls",
        brochure: "#",
        technicalDataSheet: "#"
    },
    {
        id: "swivel-mount",
        slug: "swivel-mount",
        name: "SWIVEL MOUNT",
        title: "Adjustable Swivel Wall Mount",
        description: "Versatile mounting solution with full swivel and tilt capabilities.",
        category: "Mounting Solutions",
        images: ["/images/category/display mount.jpeg"],
        features: ["+/- 90 degree swivel", "Tilt adjustment", "Cable management channels", "Easy installation"],
        published: true,
        material: "Heavy-duty Carbon Steel",
        compatibility: "VESA 200x200 to 600x400",
        application: "Hospitality, Residential, Corporate",
        brochure: "#",
        installationManual: "#"
    },
    {
        id: "ceiling-mount-double-pole",
        slug: "ceiling-mount-double-pole",
        name: "CEILING MOUNT DOUBLE POLE",
        title: "Double Pole Ceiling Mount System",
        description: "Heavy-duty ceiling mount designed for large displays and stable installations.",
        category: "Mounting Solutions",
        images: ["/images/category/Mobile Trolley Solutions.jpeg"],
        features: ["Dual pole stability", "Adjustable height", "Internal cable routing", "360-degree rotation"],
        published: true,
        material: "Reinforced Steel Alloy",
        compatibility: "Supports up to 98-inch displays",
        application: "Public Spaces, Digital Signage, Transportation",
        brochure: "#",
        installationManual: "#"
    }
];

export const staticCategories = [
    {
        category: "Displays & Video walls",
        products: staticProducts.filter(p => p.category === "Displays & Video walls")
    },
    {
        category: "Mounting Solutions",
        products: staticProducts.filter(p => p.category === "Mounting Solutions")
    },
    {
        category: "Touch Screen Kiosks",
        products: []
    },
    {
        category: "PTZ / Soundbars / Trolleys",
        products: []
    },
    {
        category: "Video Systems",
        products: []
    },
    {
        category: "Control Systems",
        products: []
    },
    {
        category: "Cables & Accessories",
        products: []
    }
];
