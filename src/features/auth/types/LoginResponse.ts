import { AuthenticatedUser } from "./AuthenticatedUser";

export interface LoginResponse {
  token: string;
  user: AuthenticatedUser;
}
