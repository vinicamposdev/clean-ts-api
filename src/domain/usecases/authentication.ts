export interface IAuthentication {
  auth: (email: string, password: string) => Promise<string>
}
