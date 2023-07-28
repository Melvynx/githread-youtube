// localhost:3000/profile

import { buttonVariants } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { Post } from '@/src/features/post/Post';
import { getUserProfile } from '@/src/query/user.query';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Profile } from '../users/[userId]/Profile';

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session?.user.id) {
    notFound();
  }

  const user = await getUserProfile(session.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          <Link
            className={buttonVariants({
              variant: 'outline',
            })}
            href="/profile/edit"
          >
            Edit profile
          </Link>
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
