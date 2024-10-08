import { OrgsRepository } from '@/repositories/orgs.repository.interface'
import { PetsRepository } from '@/repositories/pets.repository.interface'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found.error'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  orgId: string
}

interface RegisterPetUserCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUserCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
      org_id: orgId,
    })

    return { pet }
  }
}
