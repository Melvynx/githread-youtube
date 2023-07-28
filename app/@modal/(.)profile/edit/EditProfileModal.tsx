'use client';

import { ProfileForm, ProfileFormType } from '@/app/profile/edit/ProfileForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { UserEdit } from '@/src/query/user.query';
import { usePathname, useRouter } from 'next/navigation';

export const EditProfileModal = ({
  user,
  editProfile,
}: {
  user: UserEdit;
  editProfile: (values: ProfileFormType) => Promise<string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes('/profile/edit')}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <ProfileForm user={user} onSubmit={editProfile} />
      </DialogContent>
    </Dialog>
  );
};
