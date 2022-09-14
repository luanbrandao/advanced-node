import { FacebookLoginController } from '@/application/controllers'
import { FacebookAuthenticationService } from '@/data/services'
import { FacebookApi } from '@/infra/apis'
import { JwtTokenGenerator } from '@/infra/crypto'
import { AxiosHttpClient } from '@/infra/http'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { Router } from 'express'
import { env } from '../config/env'

export default (router: Router): void => {
  router.post('/api/login/facebook', (req, res) => {
    res.send({ data: 'any_data' })
  })
}
