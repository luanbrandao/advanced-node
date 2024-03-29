import { Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'

export default (router: Router): void => {
  // const controller = makeFacebookLoginController()
  // const adapter = new ExpressRouter(controller)
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
}
