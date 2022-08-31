import { RequiredStringValidator, Validator } from '@/application/validation'

class ValidationBuild {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: string, fieldName: string }): ValidationBuild {
    return new ValidationBuild(params.value, params.fieldName)
  }

  required (): ValidationBuild {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}

describe('ValidationBuild', () => {
  it('shuld return a RequiredStringValidation', () => {
    const validators = ValidationBuild.of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})
