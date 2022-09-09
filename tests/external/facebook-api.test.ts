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
        'EAALAUvMGX7EBAElGp9gsvTUUZBUQbOKRdCNS4tpc7o2fBoIQXm8uoUoOM73mXbUZAXzTK3rRZCmlOgZBQvh43XvSuEYZBnpCzAqM0JIZAoIeiOBR4ulGgooDodzSembefHLriE08CyOnPYsGRx8e00hUqxbVxjGGHkzUmnsG7RjMAIBXnbtzkqtO2EZAu0rCJLdyZAX7V9dm99PrYqdPqE84'
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
