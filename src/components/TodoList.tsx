"use client"

import { useEffect, useState } from 'react'
import { Todo } from '@/lib/entities/Todo'
import { getTodos, toggleTodo, deleteTodo } from '@/app/actions'
import TodoItem from './TodoItem'

export default function TodoList({ completed }: { completed: boolean }) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTodos = async () => {
    setLoading(true)
    try {
      const data = await getTodos(completed)
      setTodos(data)
      setError(null)
    } catch (err) {
      setError('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [completed])

  const handleToggle = async (id: number) => {
    try {
      await toggleTodo(id)
      await loadTodos()
    } catch (err) {
      setError('Failed to update todo')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return
    try {
      await deleteTodo(id)
      await loadTodos()
    } catch (err) {
      setError('Failed to delete todo')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading todos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
        <button
          onClick={loadTodos}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {completed ? 'No completed tasks yet' : 'No pending tasks'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}