import { UserRole } from "./UserRole";

export interface User {
  userId: number;
  userName: string;
  phoneNumber: string | null;
  address: string | null;
  role: UserRole;
  createdAt: string | null;
}
