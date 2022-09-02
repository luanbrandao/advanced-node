import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { Validator, ValidationComposite } from '../validation'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>
  // quem não implementar o buildValidator já tem uma validação default
  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }

    try {
      return await this.perform(httpRequest)
    } catch (error: any) {
      return serverError(error)
    }
  }

  validate (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)

    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}
