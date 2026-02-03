'use server'



import { z } from 'zod';

const contactSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').regex(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').regex(/^[a-zA-Z\s]+$/, 'Last name must contain only letters'),
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

        // Dummy success for static hosting
        console.log('Contact form submitted (Static Mode):', validatedData.data);
        return { success: true }
    } catch (error) {
        console.error('Failed to submit contact query:', error)
        return { success: false, error: 'Failed to submit query. Please try again.' }
    }
}

