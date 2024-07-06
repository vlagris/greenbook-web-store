import {isAxiosError} from "axios";
import {ErrorType} from "@/types";


export function createHttpError(error: Error) {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return {
          type: error.response?.data?.error_code,
          message: error.response?.data?.error_message
        }
      case 401:
        return {
          type: ErrorType.UNAUTHORIZED,
          message: error.response?.data?.error_message
        }
      case 403:
        return {
          type: ErrorType.NOT_AUTH,
          message: error.response?.data?.error_message
        }
      case 404:
        return {
          type: ErrorType.NOT_FOUND,
          message: error.response?.data?.error_message
        }
      case 500:
        return {
          type: ErrorType.SERVER_ERROR,
          message: error.response?.data?.error_message
        }
    }
  }
  return error;
}