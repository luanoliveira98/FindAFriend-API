import { PetsRepository } from '@/repositories/pets.repository.interface'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  environment: string
  orgId: string
}

interface RegisterPetUserCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    environment,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUserCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      environment,
      org_id: orgId,
    })

    return { pet }
  }
}
