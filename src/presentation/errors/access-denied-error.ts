export class AccessDeniedError extends Error {
  constructor () {
    super('Access Denied Error')
    this.name = 'AccessDeniedError'
  }
}
