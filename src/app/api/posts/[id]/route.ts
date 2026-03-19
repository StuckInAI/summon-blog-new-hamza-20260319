import { NextRequest, NextResponse } from 'next/server'
import { AppDataSource } from '@/lib/data-source'
import { Post } from '@/entities/Post'

const postRepository = AppDataSource.getRepository(Post)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AppDataSource.initialize()
    const post = await postRepository.findOneBy({ id: parseInt(params.id) })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AppDataSource.initialize()
    const body = await request.json()
    await postRepository.update(params.id, body)
    const updatedPost = await postRepository.findOneBy({ id: parseInt(params.id) })
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AppDataSource.initialize()
    await postRepository.delete(params.id)
    return NextResponse.json({ message: 'Post deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
