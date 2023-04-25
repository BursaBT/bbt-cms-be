import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  private readonly responseDetail: string | Record<string, any>;

  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
    this.responseDetail = response;
  }

  errorCode = -1000;

  convertToResponseModel() {
    return {
      status: this.getStatus(),
      statusCode: this.errorCode,
      code: this.errorCode,
      errors: [{ code: this.errorCode, message: this.responseDetail }],
    };
  }
}
