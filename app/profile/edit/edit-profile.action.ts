'use server';

import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProfileFormType } from './ProfileForm';

export const editProfile = async (values: ProfileFormType) => {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be logged in to edit your profile');
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: values,
  });

  return '/profile';
};
