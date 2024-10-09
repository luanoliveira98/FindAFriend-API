import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { CreatePetUseCase } from '../create-pet.use-case'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
