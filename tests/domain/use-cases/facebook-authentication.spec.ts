import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'

import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/domain/contracts/repos'

import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { AuthenticationError } from '@/domain/entities/errors'
// import { FacebookAccount } from '@/domain/entities'
import { mock, MockProxy } from 'jest-mock-extended'
import { AccessToken } from '@/domain/entities'

// import {mocked} from 'ts-jest/utils';

jest.mock('@/domain/entities/facebook-account')

// //mock o construct
// jest.mock("@/domain/models/facebook-account", () => {
//   return {
//     FacebookAccount: jest.fn().mockImplementation(() => {
//       return {};
//     }),
//   };
// });
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  callsCount = 0
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}
// class LoadUserAccountRepo implements LoadUserAccountRepository {
//   callsCount = 0;
//   async load(
//     params: LoadUserAccountRepository.Params
//   ): Promise<LoadUserAccountRepository.Result> {
//     this.callsCount++;
//     return await Promise.resolve(undefined);
//   }
// }

// type SutType = {
//   sut: FacebookAuthenticationUseCase;
//   facebookApi: MockProxy<LoadFacebookUserApi>;
// };

// const mockSut = (): SutType => {
//   const facebookApi = mock<LoadFacebookUserApi>();
//   const sut = new FacebookAuthenticationUseCase(facebookApi);

//   return {
//     sut,
//     facebookApi,
//   };
// };

describe('FacebookAuthentication', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  // let createFacebookAccountRepo: MockProxy<CreateFacebookAccountRepository>
  let sut: FacebookAuthentication
  let token: string

  beforeAll(() => {
    facebookApi = mock()
    token = 'any_token'
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })

    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    // createFacebookAccountRepo = mock();
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })

    crypto = mock()
    crypto.generateToken.mockResolvedValue(Promise.resolve('any_generated_token'))
  })

  beforeEach(() => {
    // jest.clearAllMocks();

    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })

    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      // createFacebookAccountRepo,
      crypto
    )
  })

  // example with jest-mock-extended
  it('should call LoadFacebookUserApi with correct params', async () => {
    // const { sut, facebookApi } = mockSut();

    await sut({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    // const { sut, facebookApi } = mockSut();

    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  // example with mock jest
  it('should call LoadFacebookUserApi with correct params', async () => {
    const facebookApi = {
      loadUser: jest.fn()
    }
    const sut = setupFacebookAuthentication(facebookApi, userAccountRepo, crypto)

    await sut({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({
      token: 'any_token'
    })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const facebookApi = {
      loadUser: jest.fn()
    }

    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const sut = setupFacebookAuthentication(facebookApi, userAccountRepo, crypto)

    const authResult = await sut({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  // example with class spy
  it('should call LoadFacebookUserApi with correct params', async () => {
    const facebookApi = new LoadFacebookUserApiSpy()
    const sut = setupFacebookAuthentication(facebookApi, userAccountRepo, crypto)

    await sut({ token })

    expect(facebookApi.token).toBe('any_token')
    expect(facebookApi.callsCount).toBe(1)
  })

  it('should return AuthenticationError when  LoadFacebookUserApi returns undefined', async () => {
    const facebookApi = new LoadFacebookUserApiSpy()
    facebookApi.result = undefined
    const sut = setupFacebookAuthentication(facebookApi, userAccountRepo, crypto)

    const authResult = await sut({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({
      email: 'any_fb_email'
    })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    // substitiu a implementação do construct
    // mocked(FacebookAccount).mockImplementation(
    //   jest.fn().mockImplementation(() => {
    //     return { any: 'any' };
    //   })
    // );

    jest.mock('@/domain/entities/facebook-account', () => {
      return {
        FacebookAccount: jest.fn().mockImplementation(() => {
          return {}
        })
      }
    })
    await sut({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({})
    // expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({any: 'any'});

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  // removeu esses teste pois só queremos testar se está chamando o FacebookAccount com os valores certos.

  // it('should not updata account name', async () => {
  //   userAccountRepo.load.mockResolvedValueOnce({
  //     id: 'any_id',
  //     name: 'any_name'
  //   })

  //   await sut({ token })

  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
  //     id: 'any_id',
  //     name: 'any_name',
  //     email: 'any_fb_email',
  //     facebookId: 'any_fb_id'
  //   })

  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  // })

  // it('should update account name', async () => {
  //   userAccountRepo.load.mockResolvedValueOnce({
  //     id: 'any_id'
  //   })

  //   await sut({ token })

  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
  //     id: 'any_id',
  //     name: 'any_fb_name',
  //     email: 'any_fb_email',
  //     facebookId: 'any_fb_id'
  //   })

  //   expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  // })

  it('should call Tokengenerator with correct params', async () => {
    await sut({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  it('should return an AccessToken on success', async () => {
    const authResult = await sut({ token })

    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })

  // tests exceptions

  it('should rethrow if LoadFacebookUserApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })

  it('should rethrow if LoadUserAccountRepository throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should rethrow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should rethrow if Tokengenerator throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
