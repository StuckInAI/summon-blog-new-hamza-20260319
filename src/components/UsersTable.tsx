'use client'

import { User } from '@/entity/User'

type UsersTableProps = {
  users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {user.role}
                </span>
              </td>
              <td className="p-3">
                <button className="btn-secondary mr-2">Edit</button>
                <button className="btn-primary bg-red-600 hover:bg-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}