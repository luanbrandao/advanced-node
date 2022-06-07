import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFaceebookUserBy: LoadFacebookUserApi) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    this.loadFaceebookUserBy.loadUser(params)
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUser.Params) => Promise<void>
}

namespace LoadFacebookUser {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string

  async loadUser (params: LoadFacebookUser.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFaceebookUser = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFaceebookUser)

    await sut.perform({ token: 'any_token' })

    expect(loadFaceebookUser.token).toBe('any_token')
  })
})
