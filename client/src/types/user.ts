export type User = {
  id: string,
  firstName: string | null,
  lastName: string | null,
  avatar: string | null,
  email: string,
}

export type UserResponse = {
  id: string,
  firstName: string | null,
  lastName: string | null,
  avatarImage: string | null,
  email: string,
}

export type UserRequest = {
  firstName: string,
  lastName: string,
}

export type EmailRequest = {
  email: string
}

export type PasswordRequest = {
  currentPassword: string,
  newPassword: string,
}


