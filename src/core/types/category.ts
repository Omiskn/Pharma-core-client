export interface CategoryDto {
  categoryId: number;
  name: string;
  arabicName: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface CategoryListResponse {
  categories: CategoryDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateCategoryRequest {
  categoryName: string;
  categoryArabicName?: string;
}

export interface UpdateCategoryRequest {
  categoryName?: string;
  categoryArabicName?: string;
}
