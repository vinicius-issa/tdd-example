import { RepositoryStars } from './protocols/repository-stars'
import { RockCache } from './protocols/rock-cache'

export class GitRock {
  private readonly cache: RockCache

  constructor(cache: RockCache) {
    this.cache = cache
  }

  async getStars(company: string): Promise<RepositoryStars[]> {
    this.cache.get(company)
    return [
      {
        name: 'repositoryA',
        stars: 10
      },
      {
        name: 'repositoryB',
        stars: 15
      }
    ]
  }
}