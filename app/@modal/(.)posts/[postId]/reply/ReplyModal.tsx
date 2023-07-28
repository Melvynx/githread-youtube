'use client';

import { WritePostForm, WritePostFormValues } from '@/app/write/WritePostForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

export const ReplyModal = ({
  user,
  createReply,
}: {
  user: User;
  createReply: (values: WritePostFormValues) => Promise<string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes('reply')}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createReply} />
      </DialogContent>
    </Dialog>
  );
};
