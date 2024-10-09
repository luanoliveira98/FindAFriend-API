import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  })

  const body = bodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      ...body,
      orgId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
