import axios from 'axios'
import { HttpGetClient } from '../../../src/infra/http'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    it('should call fet with correct params', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>
      const sut = new AxiosHttpClient()

      await sut.get({
        url: 'any_url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
