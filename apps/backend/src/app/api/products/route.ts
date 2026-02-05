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
        console.log("Creating product with body:", JSON.stringify(body, null, 2));

        const {
            name, title, description, slug, images, category,
            whyThisProduct, whatDoesItDo, features, useCases, published,
            sku, vesa, maxWeight, screenSize, adjustments,
            technicalDrawing, installationManual, technicalDataSheet,
            material, certifications, videoUrl, fusionUrl,
            application, compatibility, finish, brochure
        } = body;

        if (!name || !slug || !description) {
            return NextResponse.json({ error: "Missing required fields: name, slug, and description are mandatory" }, {
                status: 400,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }

        const existing = await prisma.product.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json({ error: "Slug already exists: " + slug }, {
                status: 400,
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
        }

        const product = await prisma.product.create({
            data: {
                name,
                title: title || name,
                description,
                slug,
                category: category || "Uncategorized",
                images: Array.isArray(images) ? images : [],
                whyThisProduct: whyThisProduct || "",
                whatDoesItDo: whatDoesItDo || "",
                features: Array.isArray(features) ? features : [],
                useCases: Array.isArray(useCases) ? useCases : [],
                published: published === true,
                sku: sku || "",
                vesa: vesa || "",
                maxWeight: maxWeight || "",
                screenSize: screenSize || "",
                adjustments: adjustments || "",
                technicalDrawing: technicalDrawing || "",
                installationManual: installationManual || "",
                technicalDataSheet: technicalDataSheet || "",
                material: material || "",
                certifications: Array.isArray(certifications) ? certifications : [],
                videoUrl: videoUrl || "",
                fusionUrl: fusionUrl || "",
                application: application || "",
                compatibility: compatibility || "",
                finish: finish || "",
                brochure: brochure || ""
            }
        });

        return NextResponse.json(product, {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error: any) {
        console.error("Create product fatal error:", error);
        return NextResponse.json({
            error: 'Failed to create product',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
}
