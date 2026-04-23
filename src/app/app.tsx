import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Patients from "@/features/patients/Patients";
import Settings from "@/features/settings/Settings";
import Invoices from "@/features/invoices/Invoices";
import DashboardPage from "@core/pages/DashboardPage";
import InventoryPage from "@core/pages/InventoryPage";
import Reports from "@/features/reports/Reports";
import RegisterPage from "@core/pages/RegisterPage";
import NotFound from "@core/pages/NotFoundPage";
import LoginPage from "@core/pages/LoginPage";
import { Layout } from "@/core/layout/layout";
import POS from "@/features/pos/Pos";
import { ProtectedRoute } from "./ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 🔹 خارج Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 🔹 داخل Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="pos" element={<POS />} />
            <Route path="patients" element={<Patients />} />
            <Route path="reports" element={<Reports />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
