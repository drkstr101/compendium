import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    id: '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e',
    username: 'supabot'
  }
];

export const channels: Prisma.ChannelCreateInput[] = [
  {
    createdBy: '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e',
    slug: 'general'
  },
  {
    createdBy: '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e',
    slug: 'support'
  }
];

export const messages: Prisma.MessageCreateInput[] = [
  {
    message: 'Hello World 👋',
    channelId: 1,
    userId: '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'
  },
  {
    message:
      'Perfection is attained, not when there is nothing more to add, but when there is nothing left to take away.',
    channelId: 2,
    userId: '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'
  }
];

export const permissions: Prisma.RolePermissionCreateInput[] = [
  {
    role: 'admin',
    permission: 'channels.delete'
  },
  {
    role: 'admin',
    permission: 'messages.delete'
  },
  {
    role: 'moderator',
    permission: 'messages.delete'
  }
];
