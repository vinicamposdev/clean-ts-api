export interface ITokenGenerator {
  generate: (id: string) => Promise<string>
}
