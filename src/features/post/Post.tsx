import { buttonVariants } from '@/components/ui/button';
import { PostHome } from '@/src/query/post.query';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { LikeButton } from './LikeButton';
import { PostLayout } from './PostLayout';

type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex gap-2 items-center">
        <LikeButton postId={post.id} isLiked={post.likes.length > 0} />
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          href={`/posts/${post.id}/reply`}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div>
        <Link className="text-muted-foreground text-sm" href={`/posts/${post.id}`}>
          {post._count.likes} likes
        </Link>
        {' ‧ '}
        <Link className="text-muted-foreground text-sm" href={`/posts/${post.id}`}>
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};
