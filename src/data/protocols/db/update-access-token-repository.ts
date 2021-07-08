export interface IUpdateAccessTokenRepository {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
