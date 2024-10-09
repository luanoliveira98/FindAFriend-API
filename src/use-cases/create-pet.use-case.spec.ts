import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

describe('Create Pet Use Case', () => {
  let sut: CreatePetUseCase
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Cat Org',
      author_name: 'John Doe',
      email: 'john.doe@mail.com',
      whatsapp: '11999999999',
      password_hash: '123456',
      cep: '01311-927',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Av. Paulista, 1471',
    })

    const { pet } = await sut.execute({
      name: 'Estrela',
      about: 'Really happy cat',
      age: 'adult',
      size: 'little',
      energyLevel: 'low',
      environment: 'small',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet when org does not exists', async () => {
    await expect(() =>
      sut.execute({
        name: 'Estrela',
        about: 'Really happy cat',
        age: 'adult',
        size: 'little',
        energyLevel: 'low',
        environment: 'small',
        orgId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
