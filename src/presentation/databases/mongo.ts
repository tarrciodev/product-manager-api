import mongoose from 'mongoose'
import { env } from '../../env'

export async function connectToMongoDB(): Promise<void> {
  const uri = env.DATABASE_URL

  try {
    await mongoose.connect(uri, {
      dbName: 'user_db', // Specify the database name
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket inactivity
      connectTimeoutMS: 30000, // Timeout for initial connection
    })
    console.log('Connected to MongoDB via Mongoose')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}
