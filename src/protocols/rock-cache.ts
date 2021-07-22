export interface RockCache {
  get: (key: string) => Promise<string | undefined>
  set: (key: string, value: string) => Promise<void>
}