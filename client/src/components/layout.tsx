import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Pill,
  Search,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import logo from "@assets/generated_images/minimalist_pharmacy_logo_icon.png";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "POS", href: "/pos" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
            <img src={logo} alt="PharmaCore" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg tracking-tight">PharmaCore</h1>
            <p className="text-xs text-sidebar-foreground/60">ERP System v2.0</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground")} />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-sidebar-border/50">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <Avatar className="w-9 h-9 border border-sidebar-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Dr. Sarah Chen</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Chief Pharmacist</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search drugs, patients, or invoices..." 
                className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Operational
            </div>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-primary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50 p-6">
          <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
