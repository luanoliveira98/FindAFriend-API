import { OrgsRepository } from '@/repositories/orgs.repository.interface'
import { PetsRepository } from '@/repositories/pets.repository.interface'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  orgId: string
}

interface CreatePetUserCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
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
  }: CreatePetUseCaseRequest): Promise<CreatePetUserCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
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
