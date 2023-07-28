'use client';

import { WritePostForm, WritePostFormValues } from '@/app/write/WritePostForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

export const WriteModal = ({
  user,
  createPost,
  path,
}: {
  user: User;
  createPost: (values: WritePostFormValues) => Promise<string>;
  path: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes(path)}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createPost} />
      </DialogContent>
    </Dialog>
  );
};
