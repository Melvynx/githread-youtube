import { getAuthSession } from '@/lib/auth';
import { Post } from '@/src/features/post/Post';
import { getLatestPosts } from '@/src/query/post.query';

export default async function Home() {
  const session = await getAuthSession();

  const posts = await getLatestPosts();

  return (
    <div className="divide-y divide-muted">
      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </div>
  );
}
