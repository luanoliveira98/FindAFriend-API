import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerController)
}
