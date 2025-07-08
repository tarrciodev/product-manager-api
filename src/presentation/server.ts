import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../env'
import { setupErrorHandler } from '../shared/error-handlling'
import { connectToMongoDB } from './databases/mongo'
import { productRoutes } from './routes/product-routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Product Manager API',
      description: 'Product Manager API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

export function startServer() {
  connectToMongoDB()
  app.register(productRoutes)
  setupErrorHandler(app)
  app
    .listen({ port: env.PORT, host: '0.0.0.0' })
    .then(() => {
      console.log(`✅ Server is running on port ${env.PORT}`)
    })
    .catch(err => {
      console.error('❌ Error starting server:', err)
      process.exit(1)
    })
}
