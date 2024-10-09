import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { CreateOrgUseCase } from './create-org.use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'

describe('Create Org Use Case', () => {
  let sut: CreateOrgUseCase
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
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
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create an org when email already exists', async () => {
    await orgsRepository.create({
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
    })

    await expect(() =>
      sut.execute({
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
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
