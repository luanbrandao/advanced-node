import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuild as Build, Validator } from '../validation'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  token: string
}

type Model =
  | Error
  | {
    accessToken: string
  }
export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })

    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [...Build.of({ value: httpRequest.token, fieldName: 'token' }).required().build()]
  }
}
