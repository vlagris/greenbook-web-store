
export function getUserWithoutPasswordHash(user) {
  const {passwordHash, ...userWithoutPasswordHash} = user.get();
  return userWithoutPasswordHash;
}