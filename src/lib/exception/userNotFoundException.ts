import { HttpStatus } from '@nestjs/common';
import {BaseException} from "./baseException";

export class UserNotFoundException extends BaseException {
  constructor(objectOrError?: any, description = 'User not found') {
    super(description, HttpStatus.NOT_FOUND);
    super.errorCode = 404;
  }
}

export class UsernameNotAllowedException extends BaseException {
  constructor(username: string) {
    super(`Username(${username}) in use`, HttpStatus.CONFLICT);
  }
}

export class EmailNotAllowedException extends BaseException {
  constructor(email: string) {
    super(`Email(${email}) in use`, HttpStatus.CONFLICT);
  }
}

