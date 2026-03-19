"use server"

import { AppDataSource } from '@/lib/data-source'
import { Todo } from '@/lib/entities/Todo'
import { revalidatePath } from 'next/cache'

// Initialize database connection
const initializeDB = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  return AppDataSource.getRepository(Todo)
}

export async function createTodo(title: string, description?: string) {
  const todoRepository = await initializeDB()
  const todo = new Todo()
  todo.title = title
  todo.description = description
  todo.completed = false
  todo.createdAt = new Date()
  todo.updatedAt = new Date()
  await todoRepository.save(todo)
  revalidatePath('/')
}

export async function getTodos(completed: boolean) {
  const todoRepository = await initializeDB()
  const todos = await todoRepository.find({
    where: { completed },
    order: { updatedAt: 'DESC' },
  })
  return todos
}

export async function toggleTodo(id: number) {
  const todoRepository = await initializeDB()
  const todo = await todoRepository.findOne({ where: { id } })
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.completed = !todo.completed
  todo.updatedAt = new Date()
  await todoRepository.save(todo)
  revalidatePath('/')
}

export async function deleteTodo(id: number) {
  const todoRepository = await initializeDB()
  const todo = await todoRepository.findOne({ where: { id } })
  if (!todo) {
    throw new Error('Todo not found')
  }
  await todoRepository.remove(todo)
  revalidatePath('/')
}