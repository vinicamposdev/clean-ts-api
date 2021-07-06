export class UnauthorizedError extends Error {
  constructor () {
    super('Internal Unauthorized Error')
    this.name = 'UnauthorizedError'
  }
}
