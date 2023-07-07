export class ApiError extends Error {
  success: boolean;
  statusCode: number;
  errorCode: string;
  reason: string;
  constructor(success: boolean, statusCode: number, errorCode: string, message: string) {
    super(message);
    this.success = success;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.reason = message;
  }
}
