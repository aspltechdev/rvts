import prisma from '@/lib/prisma';
import QueriesTable from '@/components/QueriesTable';

export const dynamic = 'force-dynamic';

export default async function QueriesPage() {
    const queries = await prisma.contactQuery.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6 md:space-y-8 max-w-full overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Contact Queries</h1>
                    <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 mt-1">Manage, filter, and export customer inquiries</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-zinc-400 shadow-sm w-fit">
                    Total: <span className="text-gray-900 dark:text-white font-bold">{queries.length}</span>
                </div>
            </div>
            
            <QueriesTable queries={queries} />
        </div>
    );
}
