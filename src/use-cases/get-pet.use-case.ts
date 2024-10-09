import { PetsRepository } from '@/repositories/pets.repository.interface'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUserCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUserCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
