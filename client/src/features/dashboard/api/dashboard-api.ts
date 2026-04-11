import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiError } from "@/core/api/http-client";

export type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
};

export type DashboardRevenuePoint = {
  name: string;
  total: number;
};

export type DashboardSale = {
  id: string;
  patient: string;
  amount: string;
  status: string;
  time: string;
};

export type DashboardOverview = {
  metrics: DashboardMetric[];
  weeklyRevenue: DashboardRevenuePoint[];
  recentSales: DashboardSale[];
};

export const fallbackDashboardOverview: DashboardOverview = {
  metrics: [
    { label: "إجمالي الإيرادات", value: "12,450.20 ر.س", trend: "+12% منذ الشهر الماضي", trendDirection: "up" },
    { label: "الوصفات المصروفة", value: "+573", trend: "+8% منذ الشهر الماضي", trendDirection: "up" },
    { label: "تنبيهات انخفاض المخزون", value: "12", trend: "أصناف تحت الحد الأدنى", trendDirection: "neutral" },
    { label: "المرضى النشطون", value: "2,340", trend: "-2% منذ الشهر الماضي", trendDirection: "down" },
  ],
  weeklyRevenue: [
    { name: "الإثنين", total: 1200 },
    { name: "الثلاثاء", total: 2100 },
    { name: "الأربعاء", total: 1800 },
    { name: "الخميس", total: 2400 },
    { name: "الجمعة", total: 3200 },
    { name: "السبت", total: 3800 },
    { name: "الأحد", total: 2600 },
  ],
  recentSales: [
    { id: "INV001", patient: "علي محمد", amount: "124.50 ر.س", status: "مكتمل", time: "10:24 ص" },
    { id: "INV002", patient: "أحمد محمود", amount: "45.00 ر.س", status: "مكتمل", time: "10:45 ص" },
    { id: "INV003", patient: "سارة خالد", amount: "210.20 ر.س", status: "قيد الانتظار", time: "11:02 ص" },
    { id: "INV004", patient: "محمد حسن", amount: "85.00 ر.س", status: "مكتمل", time: "11:15 ص" },
    { id: "INV005", patient: "ليلى يوسف", amount: "12.99 ر.س", status: "مسترجع", time: "11:30 ص" },
  ],
};

export async function getDashboardOverview() {
  const response = await apiClient.get<Partial<DashboardOverview>>("/dashboard/overview");

  return {
    metrics: Array.isArray(response?.metrics) ? response.metrics : fallbackDashboardOverview.metrics,
    weeklyRevenue: Array.isArray(response?.weeklyRevenue)
      ? response.weeklyRevenue
      : fallbackDashboardOverview.weeklyRevenue,
    recentSales: Array.isArray(response?.recentSales)
      ? response.recentSales
      : fallbackDashboardOverview.recentSales,
  } satisfies DashboardOverview;
}

export function useDashboardOverview() {
  const query = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
    retry: false,
    staleTime: 60000,
  });

  const isApiUnavailable = query.error instanceof ApiError;

  return {
    ...query,
    data: query.data ?? fallbackDashboardOverview,
    isUsingFallback: !query.data,
    isApiUnavailable,
  };
}
