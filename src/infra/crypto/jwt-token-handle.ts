import { TokenGenerator, TokenValidator } from '../../domain/contracts/crypto'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { verify } from 'crypto'

export class JwtTokenHandler implements TokenGenerator {
  constructor(private readonly secret: string) {}

  async generateToken({
    expirationInMs,
    key,
  }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000
    const token = jwt.sign({ key }, this.secret, { expiresIn: expirationInSeconds })
    return token
  }

  async validateToken({ token }: TokenValidator.Params): Promise<void> {
    const playload = jwt.verify(token, this.secret) as JwtPayload
    return playload.key
  }
}
