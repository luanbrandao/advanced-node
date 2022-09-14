import { JwtTokenGenerator } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJwtTokengenerator = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(env.jwtSecret)
}
