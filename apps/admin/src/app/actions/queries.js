'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteQuery(id) {
    try {
        await prisma.contactQuery.delete({
            where: { id }
        });
        revalidatePath('/queries');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete query:', error);
        return { success: false, error: 'Failed to delete the inquiry.' };
    }
}
