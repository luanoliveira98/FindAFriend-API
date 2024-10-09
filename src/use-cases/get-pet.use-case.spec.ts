import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { GetPetUseCase } from './get-pet.use-case'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

describe('Get Pet Use Case', () => {
  let sut: GetPetUseCase
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
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

    const petCreated = await petsRepository.create({
      name: 'Miu',
      about: 'So many happy cat',
      age: 'young',
      size: 'great',
      energy_level: 'full',
      environment: 'great',
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      id: petCreated.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get a pet details with a non-existent id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
