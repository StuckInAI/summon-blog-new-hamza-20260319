import { NextRequest, NextResponse } from 'next/server'
import { AppDataSource } from '@/lib/data-source'
import { Post } from '@/entities/Post'

const postRepository = AppDataSource.getRepository(Post)

export async function GET() {
  try {
    await AppDataSource.initialize()
    const posts = await postRepository.find()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await AppDataSource.initialize()
    const body = await request.json()
    const post = postRepository.create(body)
    const result = await postRepository.save(post)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
