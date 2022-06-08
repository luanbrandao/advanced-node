import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '../contracts/apis'

export class FacebookAuthenticationService {
  constructor (private readonly loadFaceebookUserBy: LoadFacebookUserApi) {}

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    this.loadFaceebookUserBy.loadUser(params)
    return new AuthenticationError()
  }
}
