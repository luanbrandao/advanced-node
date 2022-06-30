export interface Tokengenerator {
  generateToken: (params: Tokengenerator.Params) => Promise<Tokengenerator.Result>
}

export namespace Tokengenerator {
  export type Params = {
    key: string
    expirationInMs: number
  }

  export type Result = string
}
