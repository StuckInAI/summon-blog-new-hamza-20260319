import { AppDataSource } from './data-source'
import { User } from '@/entity/User'

export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
    
    // Seed initial data if empty
    const userRepository = AppDataSource.getRepository(User)
    const count = await userRepository.count()
    if (count === 0) {
      const users = [
        { name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
      ]
      for (const userData of users) {
        const user = userRepository.create({
          ...userData,
          createdAt: new Date(),
        })
        await userRepository.save(user)
      }
    }
  }
}