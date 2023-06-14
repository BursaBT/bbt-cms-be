import { HttpStatus } from '@nestjs/common';
import {BaseException} from "./baseException";

export class PropertiesNotFoundException extends BaseException {
  constructor(objectOrError?: any, description = ' Properties not found') {
    super(description, HttpStatus.NOT_FOUND);
    super.errorCode = 404;
  }
}
