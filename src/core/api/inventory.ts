import api from "./client";
import type {
  MedicineDto,
  MedicineListResponse,
  CreateMedicineRequest,
  UpdateMedicineRequest,
  PosMedicineDto,
  StockListResponse,
  StockWithBatchesDto,
  BatchDto,
  AdjustmentRequest,
  AdjustmentWithStockMovementDto,
} from "@/types";

// Medicines
export const getMedicines = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  unit?: number;
  categoryId?: number;
}) => api.get<MedicineListResponse>("/medicines", { params });

export const searchMedicines = (params: {
  q: string;
  page?: number;
  limit?: number;
}) => api.get<MedicineListResponse>("/medicines/search", { params });

export const getMedicine = (id: number) =>
  api.get<MedicineDto>(`/medicines/${id}`);

export const createMedicine = (data: CreateMedicineRequest) =>
  api.post<MedicineDto>("/medicines", data);

export const updateMedicine = (id: number, data: UpdateMedicineRequest) =>
  api.put<MedicineDto>(`/medicines/${id}`, data);

export const deleteMedicine = (id: number) =>
  api.delete(`/medicines/${id}`);

export const restoreMedicine = (id: number) =>
  api.post(`/medicines/${id}/restore`);

// Batches
export const getBatchesByMedicine = (medicineId: number) =>
  api.get<{ batches: BatchDto[] }>(`/inventory/batches/${medicineId}`);

export const getStockByMedicine = (medicineId: number) =>
  api.get<StockWithBatchesDto>(`/inventory/stock/${medicineId}`);

// Inventory stock
export const getStock = (params?: {
  page?: number;
  limit?: number;
  medicineId?: number;
}) => api.get<StockListResponse>("/inventory/stock", { params });

export const getLowStock = (threshold?: number) =>
  api.get<{ items: unknown[] }>("/inventory/low-stock", {
    params: { threshold },
  });

export const getExpiring = (daysUntilExpiry?: number) =>
  api.get<{ items: unknown[] }>("/inventory/expiring", {
    params: { daysUntilExpiry },
  });

export const adjustStock = (data: AdjustmentRequest) =>
  api.post<AdjustmentWithStockMovementDto>("/inventory/adjust", data);
