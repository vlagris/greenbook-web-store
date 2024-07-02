import {User, UserResponse} from "@/types";

export function userResponseAdapter(data: UserResponse): User {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatarImage,
    email: data.email,
  };
}

