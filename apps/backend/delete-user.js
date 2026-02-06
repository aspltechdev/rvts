const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];

    if (!email) {
        console.log('Usage: node delete-user.js <email>');
        process.exit(1);
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            console.log(`User not found: ${email}`);
            return;
        }

        await prisma.user.delete({
            where: { email }
        });

        console.log(`SUCCESS: User '${email}' deleted.`);
    } catch (e) {
        console.error('Error deleting user:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
