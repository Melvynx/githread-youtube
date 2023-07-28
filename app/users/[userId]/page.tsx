import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Post } from '@/src/features/post/Post';
import { getUserProfile } from '@/src/query/user.query';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Profile } from './Profile';
import { followUser } from './follow.action';

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const user = await getUserProfile(params.userId);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    title: `${user.name} (${user.username})`,
  };
};

type PageParams = {
  params: {
    userId: string;
  };
};

export default async function UserPage({ params }: PageParams) {
  const session = await getAuthSession();
  const user = await getUserProfile(params.userId);

  if (!user) {
    notFound();
  }

  const isFollower = session?.user.id
    ? await prisma.follow.findFirst({
        where: {
          followerId: session?.user?.id,
          followingId: user.id,
        },
      })
    : false;

  const isCurrentUser = params.userId === session?.user.id;

  if (isCurrentUser) {
    redirect('/profile');
  }

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          <Button
            variant="outline"
            formAction={async () => {
              'use server';
              if (!session?.user.id) {
                return;
              }

              await followUser(params.userId);
            }}
          >
            {isFollower ? 'Unfollow' : 'Follow'}
          </Button>
        </form>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
