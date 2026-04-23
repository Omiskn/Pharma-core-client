import { UserRole } from "./UserRole";

export interface AuthenticatedUser {
  userId: number;
  userName: string;
  role: UserRole;
}
