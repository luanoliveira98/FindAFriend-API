import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthenticateUseCase } from '../authenticate.use-case'

export function makeAuthenticateUseCase() {
  return new AuthenticateUseCase(new PrismaOrgsRepository())
}
