export interface IEncrypter {
  encrypt: (id: string) => Promise<string>
}
