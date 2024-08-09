import { Prisma } from '@prisma/client';

export const returnUserDataObject: Prisma.UserDataSelect = {
  id: true,
  height: true,
  weight: true,
  age: true,
  userAvatar: true,
  userId: true,
};
