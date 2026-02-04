import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    try {
        if (slug) {
            const product = await prisma.product.findUnique({
                where: { slug }
            });
            return NextResponse.json(product || { error: 'Product not found' }, {
                status: product ? 200 : 404,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }

        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(products, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name, title, description, slug, images, category,
            whyThisProduct, whatDoesItDo, features, useCases, published,
            sku, vesa, maxWeight, screenSize, adjustments,
            technicalDrawing, installationManual, technicalDataSheet,
            material, certifications, videoUrl, fusionUrl,
            application, compatibility, finish, brochure
        } = body;

        const existing = await prisma.product.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, {
                status: 400,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }

        const product = await prisma.product.create({
            data: {
                name, title, description, slug, category,
                images: images || [],
                whyThisProduct, whatDoesItDo,
                features: features || [],
                useCases: useCases || [],
                published: published || false,
                sku, vesa, maxWeight, screenSize, adjustments,
                technicalDrawing, installationManual, technicalDataSheet,
                material, certifications: certifications || [], videoUrl, fusionUrl,
                application, compatibility, finish, brochure
            }
        });

        return NextResponse.json(product, {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error: any) {
        console.error("Create product error:", error);
        return NextResponse.json({ error: 'Failed to create product', details: error.message }, {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
}
