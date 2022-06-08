import { LoadFacebookUser, LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

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
