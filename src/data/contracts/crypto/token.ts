export interface Tokengenerator {
  generateToken: (params: Tokengenerator.Params) => Promise<void>
}

export namespace Tokengenerator {
  export type Params = {
    key: string
    expirationInMs: number
  }
}
