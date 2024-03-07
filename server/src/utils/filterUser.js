
export function filterUser(user) {
  const {passwordHash: passHash, ...userData } = user;
  return userData;
}