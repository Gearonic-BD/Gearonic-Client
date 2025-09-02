// utils/getUserFromJWT.ts
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  name: string;
  email?: string; // other fields in your token
  iat?: number;
  exp?: number;
}

export function getUserFromJWT(token: string) {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    return decoded.name; // assuming your JWT payload has `name`
  } catch (err) {
    console.error(err);
    return null;
  }
}
