import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet.use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { randomUUID } from 'node:crypto'

describe('Register Pet Use Case', () => {
  let sut: RegisterPetUseCase
  let petsRepository: InMemoryPetsRepository

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Estrela',
      about: 'Really happy cat',
      age: 'adult',
      size: 'little',
      environment: 'small',
      orgId: randomUUID(),
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
