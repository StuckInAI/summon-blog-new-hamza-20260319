import { notFound } from 'next/navigation'
import { getPost } from '@/lib/api'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        <p className="text-lg">{post.content}</p>
      </div>
    </div>
  )
}
