import { PrismaClient, Prisma } from '@prisma/client';
import { channels, permissions, users, messages } from './fixtures';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding database ...`);
  Promise.all(users.map((data) => prisma.user.create({ data })));
  Promise.all(channels.map((data) => prisma.channel.create({ data })));
  Promise.all(messages.map((data) => prisma.message.create({ data })));
  Promise.all(permissions.map((data) => prisma.permission.create({ data })));
  console.log(`Seeding database finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
