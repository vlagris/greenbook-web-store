
const EMAIL_BUSY = {
  error_code: 3,
  error_message: "A user with this email address already exists."
}

const SERVER_ERROR = {
  error_message: "Internal server error."
}

const BAD_REQUEST = {
  error_code: 0,
  error_message: "Invalid request."
}

const NOT_VALIDATION = {
  error_code: 2,
  error_message: "Data has not been validation."
}

const INVALID_DATA = {
  error_code: 1,
  error_message: "Invalid data."
}

const NOT_AUTH = {
  error_message: "No access."
}

const INVALID_REFRESH_TOKEN = {
  error_message: "Refresh token is not valid. Please make a new sign in request."
}

const NOT_FOUND = {
  error_message: "Not found"
}

export const errors = {
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  EMAIL_BUSY,
  NOT_AUTH,
  NOT_VALIDATION,
  INVALID_DATA,
  INVALID_REFRESH_TOKEN
}

export const cookies = {
  refreshToken: {
    name: "refreshToken",
    options: {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 60)),
    }
  }
}