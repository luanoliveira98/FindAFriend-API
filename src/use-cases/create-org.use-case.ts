import { OrgsRepository } from '@/repositories/orgs.repository.interface'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

interface CreateOrgUserCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUserCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
    })

    return { org }
  }
}
