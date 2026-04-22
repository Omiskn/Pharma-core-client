import { Link, useLocation } from "wouter";
import { cn } from "@/utils/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import logo from "@assets/generated_images/minimalist_pharmacy_logo_icon.png";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/" },
  { icon: ShoppingCart, label: "نقطة البيع", href: "/pos" },
  { icon: Package, label: "المخزون", href: "/inventory" },
  { icon: Users, label: "المرضى", href: "/patients" },
  { icon: TrendingUp, label: "التقارير", href: "/reports" },
  { icon: FileText, label: "الفواتير", href: "/invoices" },
  { icon: Settings, label: "الإعدادات", href: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-l border-sidebar-border shadow-xl z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
          <img src={logo} alt="PharmaCore" className="w-8 h-8 object-contain" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg tracking-tight">
            فارماكور
          </h1>
          <p className="text-xs text-sidebar-foreground/60">
            نظام ERP الإصدار 2.0
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = location === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-primary-foreground"
                      : "text-sidebar-foreground/50"
                  )}
                />
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
            <AvatarFallback>د.س</AvatarFallback>
          </Avatar>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">د. سارة أحمد</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              صيدلاني مسؤول
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
          size="sm"
        >
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
