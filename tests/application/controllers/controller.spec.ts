import { ServerError } from '@/application/errors'
import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  // it('should return 400 if validation fails', async () => {
  //   const error = new Error('validation_error');

  //   const RequiredStringValidatorSpy = jest
  //     .spyOn(RequiredStringValidator.prototype, 'validate')
  //     .mockReturnValueOnce(error);

  //   const httpResponse = await sut.handle('any_value');

  //   console.log({ httpResponse });

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: error,
  //   });
  //   expect(RequiredStringValidatorSpy).toHaveBeenCalledTimes(1);
  // });

  // tenta melhorar esse teste
  // Aula 38. Applicando o Template Method Pattern
  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')

    jest.spyOn(sut, 'validate').mockReturnValueOnce(error)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 if authentication throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual(sut.result)
  })
})
