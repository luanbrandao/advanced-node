import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration Test', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({
      token:
        'EAALAUvMGX7EBALZC4ba7RlXjNtTr80BkQSyKiBiSCjlBG1jWCQj1rZBxuoyjXl1aCwaXe2lMkpf1Xo2FaOWLV1QoMZAWX9HscCmmDMZCrRF6pZCLRC3yT14023IiZCZBU7O775w3Uye4zNffDKKbtbLFB0gLBt5leiGXExpUGEZAliX1diiZCQMZA6JN1C0XaE2t9ZCuSWnjCCqc0tWHOyfDMQC'
    })

    expect(fbUser).toEqual({
      facebookId: '103388065851964',
      email: 'test_mptjenp_face@tfbnw.net',
      name: 'Test Face'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
