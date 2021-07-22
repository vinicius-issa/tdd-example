import { RepositoryStars } from './protocols/repository-stars'
import { RockCache } from './protocols/rock-cache'

export class GitRock {
  private readonly cache: RockCache

  constructor(cache: RockCache) {
    this.cache = cache
  }

  async getStars(company: string): Promise<RepositoryStars[]> {
    await this.cache.get(company)
    const result = [
      {
        name: 'repositoryA',
        stars: 10
      },
      {
        name: 'repositoryB',
        stars: 15
      }
    ]
    await this.cache.set(company, JSON.stringify(result))
    return result
  }
}