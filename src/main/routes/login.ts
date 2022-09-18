import { Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/controllers'
import { adaptExpressRoute as adapt } from '@/infra/http'

export default (router: Router): void => {
  // const controller = makeFacebookLoginController()
  // const adapter = new ExpressRouter(controller)
  router.post('/api/login/facebook', adapt(makeFacebookLoginController()))
}
