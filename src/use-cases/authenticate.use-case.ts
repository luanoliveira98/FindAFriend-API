import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs.repository.interface'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
