import { LoadFacebookUser, LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  callsCount = 0
  async loadUser (
    params: LoadFacebookUser.Params
  ): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}
class LoadUserAccountRepo implements LoadUserAccountRepository {
  callsCount = 0
  async load (params: LoadUserAccountRepository.Params): Promise<void> {
    this.callsCount++
    return await Promise.resolve()
  }
}

// type SutType = {
//   sut: FacebookAuthenticationService;
//   loadFaceebookUserApi: MockProxy<LoadFacebookUserApi>;
// };

// const mockSut = (): SutType => {
//   const loadFaceebookUserApi = mock<LoadFacebookUserApi>();
//   const sut = new FacebookAuthenticationService(loadFaceebookUserApi);

//   return {
//     sut,
//     loadFaceebookUserApi,
//   };
// };

describe('FacebookAuthenticationService', () => {
  let loadFaceebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFaceebookUserApi = mock()
    loadFaceebookUserApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })

    loadUserAccountRepo = mock()

    sut = new FacebookAuthenticationService(
      loadFaceebookUserApi,
      loadUserAccountRepo
    )
  })

  // example with jest-mock-extended
  it('should call LoadFacebookUserApi with correct params', async () => {
    // const { sut, loadFaceebookUserApi } = mockSut();

    await sut.perform({ token })

    expect(loadFaceebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(loadFaceebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    // const { sut, loadFaceebookUserApi } = mockSut();

    loadFaceebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  // example with mock jest
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFaceebookUserApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(
      loadFaceebookUserApi,
      loadUserAccountRepo
    )

    await sut.perform({ token })

    expect(loadFaceebookUserApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(loadFaceebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const loadFaceebookUserApi = {
      loadUser: jest.fn()
    }

    loadFaceebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(
      loadFaceebookUserApi,
      loadUserAccountRepo
    )

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  // example with class spy
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFaceebookUserApi = new LoadFacebookUserApiSpy()
    const loadUserAccountRepo = new LoadUserAccountRepo()
    const sut = new FacebookAuthenticationService(
      loadFaceebookUserApi,
      loadUserAccountRepo
    )

    await sut.perform({ token })

    expect(loadFaceebookUserApi.token).toBe('any_token')
    expect(loadFaceebookUserApi.callsCount).toBe(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const loadFaceebookUserApi = new LoadFacebookUserApiSpy()
    loadFaceebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(
      loadFaceebookUserApi,
      loadUserAccountRepo
    )

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when  LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({
      email: 'any_fb_email'
    })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})
