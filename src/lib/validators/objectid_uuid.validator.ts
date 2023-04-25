import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isUUID,
} from 'class-validator';
import { ObjectId } from 'bson';

@ValidatorConstraint({ async: true })
export class IsUUID_ObjectId implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(id: any, args: ValidationArguments) {
    return isUUID(id) ? true : ObjectId.isValid(id);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments.property + ' must have a valid UUID or ObjectId';
  }
}

export function IsUUIDObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUUID_ObjectId',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUUID_ObjectId,
    });
  };
}
