import { RepositoryStars } from './protocols/repository-stars'

export class GitRock {

  getStars(company: string): RepositoryStars[] {
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