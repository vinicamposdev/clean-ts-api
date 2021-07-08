export interface IEncrypter {
  encrypt: (value: string) => Promise<string>
}
