import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Post } from '@/entities/Post'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Post],
  migrations: [],
  subscribers: [],
})
