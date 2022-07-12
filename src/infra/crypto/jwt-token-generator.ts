import { Tokengenerator } from '../../data/contracts/crypto'
import jwt from 'jsonwebtoken'

export class JwtTokenGenerator implements Tokengenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: Tokengenerator.Params): Promise<Tokengenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    const token = jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
    return token
  }
}
