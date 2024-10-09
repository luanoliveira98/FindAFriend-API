import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { refreshController } from './refresh.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerController)

  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)
}
