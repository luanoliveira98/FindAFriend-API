import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware'
import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwtMiddleware] }, createPetController)
}
