const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.log('Usage: node create-admin.js <email> <password>');
        console.log('Example: node create-admin.js admin@example.com mypassword123');
        process.exit(1);
    }

    console.log(`Creating admin user: ${email}...`);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword,
                name: 'Admin',
            },
        });

        console.log('-----------------------------------');
        console.log(`SUCCESS: Admin user '${user.email}' is ready.`);
        console.log('You can now login to the Admin Panel.');
        console.log('-----------------------------------');
    } catch (e) {
        console.error('Error creating user:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
