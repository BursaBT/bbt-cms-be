import faker from '@faker-js/faker';
import { validate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { OptionalStringMaxLength } from './optional-string-max-length';

/**
 * UserInput encapsulates and validates request input for a user.
 */
export class UserInput {
  @ApiProperty({ example: 'user@domain.com', maxLength: 255 })
  @IsEmail()
  @OptionalStringMaxLength(255, true)
  email: string;
  @ApiProperty({ example: 'Tom', maxLength: 64 })
  @IsNotEmpty()
  @OptionalStringMaxLength(64, false)
  firstName: string;
  @ApiProperty({ example: 'Jones', maxLength: 64 })
  @IsNotEmpty()
  @OptionalStringMaxLength(64, false)
  lastName: string;
}

describe('OptionalStringMaxLength', () => {
  const input = new UserInput();

  it('should not trigger if all values are undefined', () => {
    expect(validate(input)).resolves.toMatchObject([
      {
        constraints: { isEmail: 'email must be an email' },
      },
      {
        constraints: { isNotEmpty: 'firstName should not be empty' },
      },
      {
        constraints: { isNotEmpty: 'lastName should not be empty' },
      },
    ]);
  });

  it('should not trigger if all values are defined and within spec', () => {
    input.email = faker.internet.email();
    input.firstName = faker.name.firstName();
    input.lastName = faker.name.lastName();
    expect(validate(input)).resolves.toEqual([]);
  });

  it('should trigger for firstName if the value is to long', () => {
    input.firstName = 'rightsaidfred'.repeat(15);
    expect(validate(input)).resolves.toMatchObject([
      {
        constraints: {
          optionalStringMaxLength:
            'firstName must be shorter than or equal to 64 characters',
        },
      },
    ]);
  });

  it('should trigger for firstName and lastName if the values are to long', () => {
    input.lastName = 'rightsaidfred'.repeat(15);
    expect(validate(input)).resolves.toMatchObject([
      {
        constraints: {
          optionalStringMaxLength:
            'firstName must be shorter than or equal to 64 characters',
        },
      },
      {
        constraints: {
          optionalStringMaxLength:
            'lastName must be shorter than or equal to 64 characters',
        },
      },
    ]);
  });
});
