import { GitRock } from './git-rock'
import { RockCache } from './protocols/rock-cache'

describe('GitRock', () => {
  const makeRockCacheMock = () => {
    class RockCacheMock implements RockCache {
      async get (key: string): Promise<string|undefined> {
        return
      }

      async set (key: string, value: string): Promise<void> {
        return
      }
    }
    return new RockCacheMock()
  }

  const makeSut = () => {
    const cacheMock = makeRockCacheMock()
    const sut = new GitRock(cacheMock)
    return {
      cacheMock,
      sut
    }
  }

  test('Should getStars return the correct values', async () => {
    const {
      sut
    } = makeSut()
    const repositories = await sut.getStars('any_company')
    expect(repositories).toEqual([
      {
        name: 'repositoryA',
        stars: 10
      },
      {
        name: 'repositoryB',
        stars: 15
      }
    ])
  })

  test('Should call get in CacheMock with correct value', async () => {
    const {
      sut,
      cacheMock
    } = makeSut()

    const cacheSpy = jest.spyOn(cacheMock, 'get')
    await sut.getStars('any_company')
    expect(cacheSpy).toBeCalledWith('any_company')
  })
})