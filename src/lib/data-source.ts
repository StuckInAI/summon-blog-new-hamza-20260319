import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Todo } from './entities/Todo'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './dev.db',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
  logging: false,
  entities: [Todo],
  migrations: [],
  subscribers: [],
})

// Initialize connection on import
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      console.log('Database connection initialized')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Call initialize on module load (in production, this will happen when server starts)
if (process.env.NODE_ENV === 'production') {
  initializeDatabase()
}