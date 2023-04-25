import {
  buildMessage,
  isEmail,
  isNotEmpty,
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/**
 * An annotation that optionally validates a string's maximum length.
 *
 * Validation is skipped if the value is null, undefined, empty, or not a string.
 *
 * If {@link email} is true, validation is skipped if the value is not an email.
 *
 * @param maxLength the maximum length accepted for this field
 * @param email whether the value is an email or not
 * @param validationOptions an optional {@link ValidationOptions}
 * @returns a validator constraint function
 */
export function OptionalStringMaxLength(
  maxLength: number,
  email: boolean,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'optionalStringMaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [email, maxLength],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let valid = true;
          if (isNotEmpty(value) && isString(value)) {
            if (args.constraints[0]) {
              if (isEmail(value)) {
                valid = value.length <= args.constraints[1];
              }
            } else {
              valid = value.length <= args.constraints[1];
            }
          }
          return valid;
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            `$property must be shorter than or equal to ${maxLength} characters`,
          validationOptions,
        ),
      },
    });
  };
}
