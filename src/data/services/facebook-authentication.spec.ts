import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFaceebookUserBy: LoadFacebookUserApi) {}

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    this.loadFaceebookUserBy.loadUser(params)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserApi {
  loadUser: (
    params: LoadFacebookUser.Params
  ) => Promise<LoadFacebookUser.Result>
}

namespace LoadFacebookUser {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (
    params: LoadFacebookUser.Params
  ): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFaceebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFaceebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFaceebookUserApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const loadFaceebookUserApi = new LoadFacebookUserApiSpy()
    loadFaceebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFaceebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
