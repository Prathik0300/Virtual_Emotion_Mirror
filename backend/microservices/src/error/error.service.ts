import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class Exception extends HttpException {
  constructor(
    message: string = 'Bad Request',
    statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(
      { statusCode, message, timestamp: new Date().toISOString() },
      statusCode,
    );
    this.validateAndThrow(statusCode);
  }

  private validateAndThrow(statusCode: number) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(this.getResponse());
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(this.getResponse());
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(this.getResponse());
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(this.getResponse());
      case HttpStatus.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityException(this.getResponse());
      case HttpStatus.INTERNAL_SERVER_ERROR:
        throw new InternalServerErrorException(this.getResponse());
      case HttpStatus.BAD_GATEWAY:
        throw new BadGatewayException(this.getResponse());
      case HttpStatus.SERVICE_UNAVAILABLE:
        throw new ServiceUnavailableException(this.getResponse());

      default:
        throw new HttpException(this.getResponse(), HttpStatus.BAD_REQUEST);
    }
  }
}
