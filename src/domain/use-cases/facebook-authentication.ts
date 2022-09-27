import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { LoadFacebookUserApi } from '../contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos'

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGenerator,
) => FacebookAuthentication
type Input = { token: string }
type Output = { accessToken: string }

export type FacebookAuthentication = (params: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup =
  (facebookApi, userAccountRepo, crypto) => async (params) => {
    const fbData = await facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({
        email: fbData.email
      })

      const facebookAccount = new FacebookAccount(fbData, accountData)

      const { id } = await userAccountRepo.saveWithFacebook(facebookAccount)

      const accessToken = await crypto.generateToken({
        key: id,
        expirationInMs: AccessToken.expirationInMs
      })

      return { accessToken }
    }

    throw new AuthenticationError()
  }
