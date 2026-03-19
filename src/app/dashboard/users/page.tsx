import UsersTable from '@/components/UsersTable'
import { fetchUsers } from '@/lib/data'

export default async function UsersPage() {
  const users = await fetchUsers()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <UsersTable users={users} />
    </div>
  )
}