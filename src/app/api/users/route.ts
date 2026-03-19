import { NextRequest, NextResponse } from 'next/server'
import { AppDataSource } from '@/lib/data-source'
import { User } from '@/entity/User'
import { initializeDatabase } from '@/lib/db'

const userRepository = AppDataSource.getRepository(User)

export async function GET() {
  try {
    await initializeDatabase()
    const users = await userRepository.find()
    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase()
    const body = await request.json()
    const user = userRepository.create({
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date(),
    })
    await userRepository.save(user)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await initializeDatabase()
    const body = await request.json()
    const user = await userRepository.findOne({ where: { id: body.id } })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    Object.assign(user, body)
    await userRepository.save(user)
    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await initializeDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }
    const result = await userRepository.delete(id)
    if (result.affected === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}