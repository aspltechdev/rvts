'use server'

import { z } from 'zod';
import prisma from '@/lib/prisma';

const contactSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').regex(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
    lastName: z.string().optional().or(z.literal('')),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Invalid phone number format'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactQuery(formData) {
    try {
        const rawData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const validatedData = contactSchema.safeParse(rawData);

        if (!validatedData.success) {
            // Return the first error message
            const firstError = validatedData.error.errors[0].message;
            return { success: false, error: firstError };
        }

        // Save to Database via Prisma
        const query = await prisma.contactQuery.create({
            data: {
                firstName: validatedData.data.firstName,
                lastName: validatedData.data.lastName,
                email: validatedData.data.email,
                phoneNumber: validatedData.data.phoneNumber,
                subject: validatedData.data.subject,
                message: validatedData.data.message,
                status: "PENDING"
            }
        });

        console.log('Contact query stored in DB:', query.id);

        return { success: true };
    } catch (error) {
        console.error('Failed to submit contact query:', error);
        return { success: false, error: 'Database connection failed. Please try again later.' };
    }
}
