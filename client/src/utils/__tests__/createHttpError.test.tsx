import { createHttpError } from "@/utils/createHttpError.ts";
import {AxiosError, AxiosHeaders, isAxiosError} from "axios";
import {ErrorType} from "@/types.ts";


function createAxiosError({status, errorCode}: {status: number, errorCode?: number}) {
  const error = new AxiosError();
  error.response = {
    data: errorCode? {error_code: errorCode} : {},
    status: status,
    statusText: 'OK',
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };
  return error;
}

describe('createHttpError', () => {
  it('should return an http error with type server error', async () => {
    try {
      await createHttpError(createAxiosError({status: 500}))
    } catch (err) {
      expect(err).toEqual({
        type: ErrorType.SERVER_ERROR,
        message: undefined
      })
    }
  });


  it('should return an http error with type not found error', async () => {
    try {
      await createHttpError(createAxiosError({status: 404}))
    } catch (err) {
      expect(err).toEqual({
        type: ErrorType.NOT_FOUND,
        message: undefined
      })
    }
  });


  it('should return an http error with type not auth error', async () => {
    try {
      await createHttpError(createAxiosError({status: 403}))
    } catch (err) {
      expect(err).toEqual({
        type: ErrorType.NOT_AUTH,
        message: undefined
      })
    }
  });

  it('should return an http error with type email busy error', async () => {
    try {
      await createHttpError(createAxiosError({
        status: 400 ,
        errorCode: ErrorType.EMAIL_BUSY
      }));
    } catch (err) {
      expect(err).toEqual({
        type: ErrorType.EMAIL_BUSY,
        message: undefined
      })
    }
  });
});