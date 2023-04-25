import { HttpStatus } from '@nestjs/common';
import {BaseException} from "./baseException";

export class ProductNotFoundException extends BaseException {
  constructor(objectOrError?: any, description = ' Product not found') {
    super(description, HttpStatus.NOT_FOUND);
    super.errorCode = 404;
  }
}
