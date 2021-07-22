import { GitRock } from './git-rock'

describe('GitRock', () => {
  test('', async () => {
    const sut = new GitRock()
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
})