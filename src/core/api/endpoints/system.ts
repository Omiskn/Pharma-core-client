import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/core/api/config";
import { apiClient } from "@/core/api/http-client";

export type ApiHealthResponse = {
  status: string;
  service?: string;
  version?: string;
  environment?: string;
  timestamp?: string;
};

export async function getApiHealth() {
  return apiClient.get<ApiHealthResponse>(apiConfig.healthPath, { useApiPrefix: false });
}

export function useApiHealth() {
  return useQuery({
    queryKey: ["system", "health"],
    queryFn: getApiHealth,
    retry: 1,
    refetchInterval: 30000,
  });
}
