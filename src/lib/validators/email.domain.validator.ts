import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isDefined,
} from 'class-validator';
import isEmail from 'validator/lib/isEmail';
import { Logger } from '@nestjs/common';
import {validateEmailAddressWithMx} from "./email.validator";

@ValidatorConstraint({ async: true })
export class IsEmailDomainValidConstraint
  implements ValidatorConstraintInterface
{
  private readonly logger: Logger = new Logger(this.constructor.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(emailAddress: any, args: ValidationArguments) {
    this.logger.verbose('validating email address ' + emailAddress);
    if (!isDefined(emailAddress) || !isEmail(emailAddress)) return false;
    return validateEmailAddressWithMx(emailAddress)
      .then((response) => {
        return response.isValid;
      })
      .catch((reason) => {
        this.logger.error(reason);
        return false;
      });
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments.property + ' must have valid email domain';
  }
}

export function IsEmailDomainValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: '',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailDomainValidConstraint,
    });
  };
}
