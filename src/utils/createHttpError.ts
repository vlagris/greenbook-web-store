import {isAxiosError} from "axios";
import {ErrorType} from "@/types.ts";


export function createHttpError(error: any) {
  // if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return Promise.reject({
          type: error.response?.data?.error_code,
          message: error.response?.data?.error_message
        });
      case 403:
        return Promise.reject({
          type: ErrorType.NOT_AUTH,
          message: error.response?.data?.error_message
        });
      case 404:
        return Promise.reject({
          type: ErrorType.NOT_FOUND,
          message: error.response?.data?.error_message
        });
      case 500:
        return Promise.reject({
          type: ErrorType.SERVER_ERROR,
          message: error.response?.data?.error_message
        });
    }
  // }
  return Promise.reject(error);
}