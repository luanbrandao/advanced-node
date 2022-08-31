import { RequiredStringValidator, ValidationBuild } from '@/application/validation'

describe('ValidationBuild', () => {
  it('shuld return a RequiredStringValidation', () => {
    const validators = ValidationBuild.of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})
