
export const STATIC_PRODUCTS = [
    {
        id: 'static-1',
        name: 'Mosaic LED Wall',
        slug: 'mosaic-led-wall',
        title: 'High-Fidelity Mosaic LED Video Wall',
        description: 'A massive modular LED video wall designed for exhibitions and high-impact visual displays. Features seamless integration and vibrant color reproduction.',
        category: 'Displays & Video Walls',
        images: ['/assets/rvts-logo.png'], // Placeholder
        features: ['4K/8K Support', 'Bezel-free design', 'High Brightness (1200 nits)', 'Energy Efficient'],
        published: true,
        material: 'Polymer / LED',
        finish: 'Matte Black',
        application: 'Indoor',
        compatibility: 'Universal'
    },
    {
        id: 'static-2',
        name: 'Nexus Control Panel',
        slug: 'nexus-control-panel',
        title: 'Nexus Smart Control Interface',
        description: 'A centralized control unit for smart environments. Manage lighting, temperature, and audio with a sleek, glass-touch interface.',
        category: 'Control Systems',
        images: ['/assets/rvts-logo.png'], // Placeholder
        features: ['Haptic Feedback', 'OLED Display', 'Wireless Integration', 'Customizable Layouts'],
        published: true,
        material: 'Glass / Aluminum',
        finish: 'Glossy White',
        application: 'Wall Mount',
        compatibility: 'Smart Home Standards'
    },
    {
        id: 'static-3',
        name: 'Omni-Directional Soundbar',
        slug: 'omni-soundbar',
        title: '360 Audio Conferencing Soundbar',
        description: 'Crystal clear audio for large conference rooms. Features intelligent noise cancellation and beamforming microphones.',
        category: 'PTZ / Soundbars / Trolleys',
        images: ['/assets/rvts-logo.png'],
        features: ['360° Audio', 'Noise Cancellation', 'USB-C Plug & Play', 'Bluetooth 5.0'],
        published: true,
        material: 'Mesh Fabric / Plastic',
        finish: 'Graphite Grey',
        application: 'Conference Room',
        compatibility: 'Zoom / Teams'
    },
    {
        id: 'static-4',
        name: 'Touch Kiosk Pro',
        slug: 'touch-kiosk-pro',
        title: 'Interactive 55" Touch Kiosk',
        description: 'Engage visitors with this responsive, multi-touch kiosk. Ideal for wayfinding, self-service, and digital signage.',
        category: 'Touch Screen Kiosks',
        images: ['/assets/rvts-logo.png'],
        features: ['10-point Multi-touch', '4K Resolution', 'Anti-glare Glass', 'Built-in PC'],
        published: true,
        material: 'Steel Enclosure',
        finish: 'Black Powder Coat',
        application: 'Retail / Public Spaces',
        compatibility: 'Windows / Android'
    },
    {
        id: 'static-5',
        name: 'Heavy-Duty Motorized Trolley',
        slug: 'motorized-trolley',
        title: 'Mobile Display Stand with Electric Lift',
        description: 'Easily move and adjust the height of heavy displays. Perfect for flexible classroom and office layouts.',
        category: 'Mounting Solutions',
        images: ['/assets/rvts-logo.png'],
        features: ['Silent Motor', 'Remote Control Height Adjust', 'Locking Casters', 'Cable Management'],
        published: true,
        material: 'Reinforced Steel',
        finish: 'Silver',
        application: 'Mobile',
        compatibility: 'VESA up to 800x600'
    }
];

export function getStaticCategories() {
    // Group products by category
    const groupedByCategory = {};

    STATIC_PRODUCTS.forEach(product => {
        if (product.category) {
            if (!groupedByCategory[product.category]) {
                groupedByCategory[product.category] = [];
            }
            groupedByCategory[product.category].push({
                name: product.name,
                slug: product.slug
            });
        }
    });

    return {
        categories: Object.entries(groupedByCategory).map(([category, products]) => ({
            category,
            products
        })),
        count: Object.keys(groupedByCategory).length
    };
}
