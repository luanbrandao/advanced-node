import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { FacebookAccount } from '@/domain/models'
import { LoadFacebookUserApi } from '../contracts/apis'
import {
  SaveFacebookAccountRepository,
  LoadUserAccountRepository
} from '../contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
    SaveFacebookAccountRepository
  ) {}

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({
        email: fbData.email
      })

      const facebookAccount = new FacebookAccount(fbData, accountData)

      await this.userAccountRepo.saveWithFacebook({
        id: facebookAccount.id,
        name: facebookAccount.name,
        email: facebookAccount.email,
        facebookId: facebookAccount.facebookId
      })
    }

    return new AuthenticationError()
  }
}
