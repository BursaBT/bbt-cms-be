import {
  isDefined,
  isPhoneNumber,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Logger } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class IsPhoneNumberValidConstraint
  implements ValidatorConstraintInterface
{
  private readonly logger: Logger = new Logger(this.constructor.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(phoneNumber: any, args: ValidationArguments) {
    return isDefined(phoneNumber) && isPhoneNumber(phoneNumber);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid phone number`;
  }
}

export function IsPhoneNumberDataValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: '',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberValidConstraint,
    });
  };
}
