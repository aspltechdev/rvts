import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET - Fetch all categories with their products
export async function GET() {
    try {
        // Get all published products grouped by category
        const products = await prisma.product.findMany({
            where: {
                published: true,
                category: {
                    not: null
                }
            },
            select: {
                name: true,
                slug: true,
                category: true
            },
            orderBy: [
                { category: 'asc' },
                { name: 'asc' }
            ]
        });

        // Group products by category
        const groupedByCategory: Record<string, { name: string; slug: string }[]> = {};

        products.forEach(product => {
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

        // Convert to array format for easier frontend consumption
        const categoriesWithProducts = Object.entries(groupedByCategory).map(([category, products]) => ({
            category,
            products
        }));

        return NextResponse.json({
            categories: categoriesWithProducts,
            count: categoriesWithProducts.length
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
