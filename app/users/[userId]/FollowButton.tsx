'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { followUser } from './follow.action';

export const FollowButton = ({
  isFollowing,
  currentUserId,
  userId,
}: {
  isFollowing: boolean;
  currentUserId?: string;
  userId: string;
}) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          if (!currentUserId) {
            return;
          }

          const result = await followUser(userId);
          router.refresh();
          return result;
        });
      }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
