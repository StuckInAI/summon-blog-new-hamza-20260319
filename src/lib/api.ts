export interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export async function getPost(id: number): Promise<Post | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    return null
  }
  return res.json()
}
