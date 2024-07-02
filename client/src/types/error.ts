export type ResponseError = {
  error_message: string,
  error_code?: number,
}

export enum ErrorType {
  BAD_REQUEST = 0,
  INVALID_DATA = 1,
  NOT_VALIDATION = 2,
  EMAIL_BUSY = 3,
  NOT_AUTH = 4,
  NOT_FOUND = 5,
  SERVER_ERROR = 6,
  INVALID_REFRESH_TOKEN = 7,
  UNAUTHORIZED = 8,
}

export type HttpError = {
  type: ErrorType,
  message?: string
}