import jwt from "jsonwebtoken";

export function createToken(userId: string, userEmail: string, options = {}) {
  return jwt.sign(
    { id: userId },
    process.env.NEXTAUTH_SECRET + userEmail,
    options
  );
}

export function verifyToken(token: string, userEmail: string) {
  return jwt.verify(token, process.env.NEXTAUTH_SECRET + userEmail);
}
