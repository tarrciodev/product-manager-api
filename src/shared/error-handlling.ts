import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

// Interface para erros padronizados
interface CustomError extends Error {
  statusCode?: number
  code?: string
  details?: unknown
}

// Erros específicos do domínio ou aplicação
class ClientError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ClientError'
    return
  }
}

class ServerError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ServerError'
  }
}

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: CustomError, request: FastifyRequest, reply: FastifyReply) => {
      request.log.error({
        error: error.message,
        stack: error.stack,
        code: error.code,
        details: error.details,
      })

      if (error instanceof ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          code: 'INVALID_INPUT',
          message: 'Validation error',
          details: error.errors,
        })
      }

      if (
        error instanceof ClientError ||
        (error.statusCode && error.statusCode >= 400 && error.statusCode < 500)
      ) {
        return reply.status(error.statusCode || 400).send({
          statusCode: error.statusCode || 400,
          error: error.name || 'Client Error',
          code: error.code || 'CLIENT_ERROR',
          message: error.message,
          details: error.details,
        })
      }

      if (
        error instanceof ServerError ||
        (error.statusCode && error.statusCode >= 500)
      ) {
        return reply.status(error.statusCode || 500).send({
          statusCode: error.statusCode || 500,
          error: 'Internal Server Error',
          code: error.code || 'SERVER_ERROR',
          message: 'An unexpected error occurred',
          details: null,
        })
      }

      return reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        details: null,
      })
    }
  )
}

export function throwClientError(
  message: string,
  statusCode: number = 400,
  code?: string,
  details?: unknown
) {
  throw new ClientError(statusCode, message, code, details)
}

export function throwServerError(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: unknown
) {
  throw new ServerError(statusCode, message, code, details)
}
