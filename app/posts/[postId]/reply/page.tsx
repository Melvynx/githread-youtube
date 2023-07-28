import { WritePostForm } from '@/app/write/WritePostForm';
import { Post } from '@/src/features/post/Post';
import { getPost } from '@/src/query/post.query';
import { getUser } from '@/src/query/user.query';
import { notFound } from 'next/navigation';
import { createReply } from './write-reply.action';

export default async function PostReply({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const user = await getUser();
  const post = await getPost(params.postId, user.id);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Post post={post} />
      <WritePostForm
        user={user}
        onSubmit={async (values) => {
          'use server';
          console.log('onSubmit createReply');
          return createReply(post.id, values);
        }}
      />
    </div>
  );
}
