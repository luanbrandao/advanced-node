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

export type FacebookAuthentication = (params: {
  token: string
}) => Promise<AccessToken | AuthenticationError>

export const setupFacebookAuthentication: Setup =
  (facebookApi, userAccountRepo, crypto) => async (params) => {
    const fbData = await facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({
        email: fbData.email
      })

      const facebookAccount = new FacebookAccount(fbData, accountData)

      const { id } = await userAccountRepo.saveWithFacebook(facebookAccount)

      const token = await crypto.generateToken({
        key: id,
        expirationInMs: AccessToken.expirationInMs
      })
      return new AccessToken(token)
    }

    return new AuthenticationError()
  }
