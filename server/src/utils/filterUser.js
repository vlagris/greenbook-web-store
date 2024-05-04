
export function filterUser(user) {
  const {passwordHash, ...userData } = user;
  return userData;
}