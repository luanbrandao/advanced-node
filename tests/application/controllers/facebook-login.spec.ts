import { AuthenticationError } from '@/domain/entities/errors'
// import { FacebookAuthentication } from '@/domain/features'
import { UnauthorizedError } from '@/application/errors'
import { FacebookLoginController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validation'

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: jest.Mock
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = jest.fn()
    facebookAuth.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should build Validators correctly', async () => {
    const validators = await sut.buildValidators({ token })

    expect(validators).toEqual([new RequiredStringValidator('any_token', 'token')])
  })

  // remove, make in RequiredStringValidator

  // it('should return 400 if token is null', async () => {
  //   const httpResponse = await sut.handle({ token: null as any })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new RequiredFieldError('token')
  //   })
  // })

  // it('should return 400 if token is undefined', async () => {
  //   const httpResponse = await sut.handle({ token: undefined as any })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new Error('The field token is required')
  //   })
  // })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth).toHaveBeenCalledWith({ token })
    expect(facebookAuth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new AuthenticationError())

    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication success', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })
})
