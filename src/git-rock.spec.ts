import { resolve } from 'path/posix'
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

  const makeFakeResult = () => [
    {
      name: 'repositoryA',
      stars: 10
    },
    {
      name: 'repositoryB',
      stars: 15
    }
  ]

  test('Should getStars return the correct values', async () => {
    const {
      sut
    } = makeSut()
    const repositories = await sut.getStars('any_company')
    expect(repositories).toEqual(makeFakeResult())
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

  test('Should call set in CacheMock with correct value if get return undefined', async () => {
    const {
      sut,
      cacheMock
    } = makeSut()

    const cacheSpy = jest.spyOn(cacheMock, 'set')
    await sut.getStars('any_company')
    expect(cacheSpy).toBeCalledWith('any_company', JSON.stringify(makeFakeResult()) )
  })

  test('Shouldnt call Cache.set if get return any value', async () => {
    const {
      sut,
      cacheMock
    } = makeSut()
    const resultString = JSON.stringify(makeFakeResult())
    const cacheSpySet = jest.spyOn(cacheMock, 'set')
    jest.spyOn(cacheMock, 'get').mockReturnValueOnce(
      new Promise((resolve)=>resolve(resultString))
    )
    await sut.getStars('any_company')
    expect(cacheSpySet).not.toBeCalled()
  })
})