import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types";

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout, hasRole } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
    hasRole,
    isAdmin: hasRole(UserRole.Admin),
    isCashier: hasRole(UserRole.Cashier),
  };
}
