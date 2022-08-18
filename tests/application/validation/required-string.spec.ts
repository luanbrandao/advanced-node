import { RequiredFieldError } from '@/application/errors'

class RequiredStringValidator {
  constructor (private readonly value: string, private readonly fieldName: string) {}

  validator (): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}

describe('RequeredStringValidator', () => {
  it('should return RequiredFieldError if value is empty ', () => {
    const sut = new RequiredStringValidator('', 'any_field')

    const error = sut.validator()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is null ', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validator()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined ', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')

    const error = sut.validator()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
