export interface IHashCompare {
  compare: (value: string, hash: string) => Promise<boolean>
}
