export interface IAuthenticationModel {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (authentication: IAuthenticationModel) => Promise<string>
}
