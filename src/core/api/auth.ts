import api from "./client";
import type { LoginRequest, RegisterRequest, LoginResponse } from "@/types";

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getProfile = () => api.get("/auth/me");
