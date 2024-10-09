import { PetsRepository } from '@/repositories/pets.repository.interface'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetsUserCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUserCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}
