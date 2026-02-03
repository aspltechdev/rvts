const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    const products = [
        {
            name: 'Mosaic LED Wall',
            slug: 'mosaic-led-wall',
            title: 'High-Fidelity Mosaic LED Video Wall',
            description: 'A massive modular LED video wall designed for exhibitions and high-impact visual displays. Features seamless integration and vibrant color reproduction.',
            whyThisProduct: 'Create immersive environments that captivate audiences from every angle.',
            whatDoesItDo: 'Displays high-resolution video content across a scalable, modular surface without visible bezels.',
            features: ['4K/8K Support', 'Bezel-free design', 'High Brightness (1200 nits)', 'Energy Efficient'],
            useCases: ['Exhibitions', 'Concerts', 'Corporate Lobbies', 'Retail'],
            images: ['http://localhost:3002/uploads/led-video-wall.png'],
            published: true,
            category: 'Displays & Video Walls',
        },
        {
            name: 'Nexus Control Panel',
            slug: 'nexus-control-panel',
            title: 'Nexus Smart Control Interface',
            description: 'A centralized control unit for smart environments. Manage lighting, temperature, and audio with a sleek, glass-touch interface.',
            whyThisProduct: 'Simplify complex environmental controls into one elegant touchpoint.',
            whatDoesItDo: 'Connects to all IoT devices in a facility to provide centralized management.',
            features: ['Haptic Feedback', 'OLED Display', 'Wireless Integration', 'Customizable Layouts'],
            useCases: ['Smart Homes', 'Conference Rooms', 'Hotels'],
            images: ['http://localhost:3002/uploads/smart-control-panel.png'],
            published: true,
            category: 'Control Systems',
        },
    ]

    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        })
        console.log(`Created product with id: ${product.id}`)
    }

    // Seed Admin User
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@researchvisions.com' },
        update: {},
        create: {
            email: 'admin@researchvisions.com',
            name: 'Admin User',
            password: hashedPassword,
        },
    });

    console.log(`Created admin user with id: ${adminUser.id}`);

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
