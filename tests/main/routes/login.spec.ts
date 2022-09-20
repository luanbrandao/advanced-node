import { app } from '@/main/config/app'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

jest.mock('@/infra/apis/facebook', () => ({
  FacebookApi: jest.fn().mockReturnValue({
    loadUser: jest
      .fn()
      .mockResolvedValueOnce({ facebookId: 'any_id', name: 'any_name', email: 'any_email' })
  })
}))

describe('Login Routes', () => {
  describe('Post /login/facebook', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('sould return 200 with AccessToken', async () => {
      // jest.mock('@/infra/apis/facebook', () => {
      //   return {
      //     loadUser: jest.fn().mockResolvedValueOnce(() => {
      //       return {
      //         facebookId: 'any_id',
      //         name: 'any_name',
      //         email: 'any_email',
      //       }
      //     }),
      //   }
      // })

      await request(app).post('/api/login/facebook').send({ token: 'valid_token' }).expect(200)
    })
  })
})
