import { HttpStatus } from '@nestjs/common';
import {BaseException} from "./baseException";

export class OrderNotFoundException extends BaseException {
  constructor(objectOrError?: any, description = 'OrderNumber not found') {
    super(description, HttpStatus.NOT_FOUND);
    super.errorCode = 404;
  }
}
