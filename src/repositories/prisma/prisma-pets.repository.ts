import { Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository.interface'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: { city: { contains: params.city, mode: 'insensitive' } },
        age: params.age ? params.age : {},
        size: params.size ? params.size : {},
        energy_level: params.energy_level ? params.energy_level : {},
        environment: params.environment ? params.environment : {},
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
