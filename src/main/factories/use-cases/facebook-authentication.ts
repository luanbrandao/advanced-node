import { FacebookAuthenticationUseCase } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokengenerator } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthenticationUseCase => {
  return new FacebookAuthenticationUseCase(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokengenerator()
  )
}