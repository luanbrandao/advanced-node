export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try a again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
