import { Switch, Route } from "wouter";
import { queryClient } from "@/core/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/core/components/ui/toaster";
import { TooltipProvider } from "@/core/components/ui/tooltip";
import { Layout } from "@/core/layout/layout";
import Dashboard from "@/features/dashboard/dashboard-page";
import Inventory from "@/features/inventory/inventory-page";
import POS from "@/features/pos/pos-page";
import Patients from "@/features/patients/patients-page";
import Settings from "@/features/settings/settings-page";
import Reports from "@/features/reports/reports-page";
import Invoices from "@/features/invoices/invoices-page";
import NotFound from "@/features/not-found/not-found-page";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/pos" component={POS} />
        <Route path="/patients" component={Patients} />
        <Route path="/reports" component={Reports} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
