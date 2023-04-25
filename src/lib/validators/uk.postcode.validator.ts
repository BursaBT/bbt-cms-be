import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValid } from './postcode';

@ValidatorConstraint({ async: true })
export class IsPostcodeValidConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(postCode: any, args: ValidationArguments) {
    if (!isValid(postCode)) return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments.property + ' must have valid postcode';
  }
}

export function IsPostcodeValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'postCodeValidator',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPostcodeValidConstraint,
    });
  };
}
