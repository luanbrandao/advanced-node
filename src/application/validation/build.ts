import { RequiredStringValidator, Validator } from '@/application/validation'

export class ValidationBuild {
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
