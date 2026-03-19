import { Todo } from '@/lib/entities/Todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-gray-600 mt-1">{todo.description}</p>
        )}
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
          <span>Created: {formatDate(todo.createdAt)}</span>
          <span>Updated: {formatDate(todo.updatedAt)}</span>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-600 hover:text-red-800 p-2"
        aria-label="Delete todo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}