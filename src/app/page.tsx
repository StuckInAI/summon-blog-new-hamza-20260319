import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
        <TodoForm />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Tasks</h2>
          <TodoList completed={false} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
          <TodoList completed={true} />
        </div>
      </div>
    </div>
  )
}