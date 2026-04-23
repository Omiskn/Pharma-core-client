import api from "./client";
import type {
  UserDto,
  UserListResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/types";

export const getUsers = (params?: {
  page?: number;
  limit?: number;
  role?: number;
  search?: string;
}) => api.get<UserListResponse>("/users", { params });

export const createUser = (data: CreateUserRequest) =>
  api.post<UserDto>("/users", data);

export const updateUser = (id: number, data: UpdateUserRequest) =>
  api.put<UserDto>(`/users/${id}`, data);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export const hardDeleteUser = (id: number) =>
  api.delete(`/users/${id}/hard`);
