import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { RegisterUseCase } from '../register.use-case'

export function makeRegisterUseCase() {
  return new RegisterUseCase(new PrismaOrgsRepository())
}
