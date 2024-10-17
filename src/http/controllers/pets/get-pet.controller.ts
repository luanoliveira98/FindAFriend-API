import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    id: z.string(),
  })

  const body = bodySchema.parse(request.params)

  try {
    const createPetUseCase = makeGetPetUseCase()

    const { pet } = await createPetUseCase.execute(body)

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
