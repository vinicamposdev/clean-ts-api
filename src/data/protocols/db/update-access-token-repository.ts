export interface IUpdateAccessTokenRepository {
  update: (id: string, token: string) => Promise<void>
}
