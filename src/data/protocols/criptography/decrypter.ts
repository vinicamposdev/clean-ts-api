export interface IDecrypter {
  decrypt: (value: string) => Promise<string>
}
