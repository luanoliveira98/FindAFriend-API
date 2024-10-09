import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { SearchPetsUseCase } from './search-pets.use-case'

describe('Search Pets Use Case', () => {
  let sut: SearchPetsUseCase
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)

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

    await petsRepository.create({
      name: 'Estrela',
      about: 'Really happy cat',
      age: 'adult',
      size: 'little',
      energy_level: 'low',
      environment: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Miu',
      about: 'So many happy cat',
      age: 'young',
      size: 'great',
      energy_level: 'full',
      environment: 'great',
      org_id: org.id,
    })

    const org2 = await orgsRepository.create({
      name: 'White Cat Org',
      author_name: 'John Doe',
      email: 'john@doe.com',
      whatsapp: '11999999999',
      password_hash: '123456',
      cep: '20520-160',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: 'Tijuca',
      street: 'Rua Clóvis Bevilaqua',
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'Lazy cat',
      age: 'adult',
      size: 'medium',
      energy_level: 'low',
      environment: 'medium',
      org_id: org2.id,
    })
  })

  it('should be able to list all pets for a city', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Estrela',
      }),
      expect.objectContaining({
        name: 'Miu',
      }),
    ])
  })

  it('should be able to list all pets for a city and age', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'young',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Miu',
      }),
    ])
  })

  it('should be able to list all pets for a city and size', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      size: 'little',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Estrela',
      }),
    ])
  })

  it('should be able to list all pets for a city and energy_level', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      energy_level: 'low',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Luna',
      }),
    ])
  })

  it('should be able to list all pets for a city and environment', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      environment: 'medium',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Luna',
      }),
    ])
  })
})
