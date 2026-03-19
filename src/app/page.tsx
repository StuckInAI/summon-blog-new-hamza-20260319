import Link from 'next/link'
import { getPosts } from '@/lib/api'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-800 line-clamp-3">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
