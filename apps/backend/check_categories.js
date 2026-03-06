require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCategories() {
    try {
        const categories = await prisma.product.findMany({
            select: { category: true },
            distinct: ['category']
        });
        console.log('Current categories in DB:', JSON.stringify(categories, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

checkCategories();
