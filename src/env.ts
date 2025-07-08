import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z
    .string()
    .url()
    .default('mongodb://admin:secret@localhost:27017'),
})

export const env = envSchema.parse(process.env)
