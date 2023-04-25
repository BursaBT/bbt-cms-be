import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export class MatchDetailsEntity {
  property: string;
  validationFunction: (value: any, relatedValue: any) => boolean;
}

export function MatchDetails(
  property: MatchDetailsEntity,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchDetailsConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'MatchDetails' })
export class MatchDetailsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [matchDetail] = args.constraints;
    const matchDetails = matchDetail as MatchDetailsEntity;
    const relatedValue = (args.object as any)[matchDetails.property];
    return matchDetails.validationFunction(value, relatedValue);
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} and ${args.property} don't match`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} and ${args.property} don't match`;
  }
}
