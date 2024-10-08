import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { randomUUID } from 'node:crypto'
import { OrgNotFoundError } from './errors/org-not-found.error'

describe('Register Pet Use Case', () => {
  let sut: RegisterPetUseCase
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Cat Org',
      author_name: 'John Doe',
      email: 'john.doe@mail.com',
      whatsapp: '11999999999',
      password: '123456',
      cep: '01311-927',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'Av. Paulista, 1471',
      latitude: -23.5619143,
      longitude: -46.6587254,
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

  it('should not be able to register a pet when org does not exists', async () => {
    await expect(
      sut.execute({
        name: 'Estrela',
        about: 'Really happy cat',
        age: 'adult',
        size: 'little',
        energyLevel: 'low',
        environment: 'small',
        orgId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
