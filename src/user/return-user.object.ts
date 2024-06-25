import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  email: true,
  createdAt: true,
};
