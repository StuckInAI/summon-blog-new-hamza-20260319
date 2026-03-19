import { AppDataSource } from './data-source'
import { User } from '@/entity/User'
import { initializeDatabase } from './db'

export async function fetchUsers(): Promise<User[]> {
  await initializeDatabase()
  const userRepository = AppDataSource.getRepository(User)
  return userRepository.find()
}

export async function fetchMetrics() {
  await initializeDatabase()
  const userRepository = AppDataSource.getRepository(User)
  const totalUsers = await userRepository.count()
  
  // Mock data for demonstration
  return {
    totalUsers,
    revenue: 125430,
    activeSessions: 842,
    trendData: [
      { date: '2024-01', value: 4000 },
      { date: '2024-02', value: 3000 },
      { date: '2024-03', value: 5000 },
      { date: '2024-04', value: 4500 },
      { date: '2024-05', value: 6000 },
      { date: '2024-06', value: 5500 },
    ],
  }
}