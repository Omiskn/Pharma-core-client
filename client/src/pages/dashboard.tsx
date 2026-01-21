import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Package, 
  AlertTriangle, 
  Users 
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 2100 },
  { name: "Wed", total: 1800 },
  { name: "Thu", total: 2400 },
  { name: "Fri", total: 3200 },
  { name: "Sat", total: 3800 },
  { name: "Sun", total: 2600 },
];

const recentSales = [
  { id: "INV001", patient: "Alice Williams", amount: "$124.50", status: "Completed", time: "10:24 AM" },
  { id: "INV002", patient: "Robert Brown", amount: "$45.00", status: "Completed", time: "10:45 AM" },
  { id: "INV003", patient: "Emily Davis", amount: "$210.20", status: "Pending", time: "11:02 AM" },
  { id: "INV004", patient: "Michael Wilson", amount: "$85.00", status: "Completed", time: "11:15 AM" },
  { id: "INV005", patient: "Sarah Miller", amount: "$12.99", status: "Refunded", time: "11:30 AM" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500">Overview of pharmacy performance for today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>End Shift</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$12,450.20</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-600 flex items-center mr-1">
                +12% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Prescriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+573</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-600 flex items-center mr-1">
                +8% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-yellow-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Items below threshold
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2,340</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-red-500 flex items-center mr-1">
                -2% <ArrowDownRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-1 lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSales.map((sale, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {sale.patient.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.patient}</p>
                      <p className="text-xs text-muted-foreground">{sale.id} • {sale.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{sale.amount}</p>
                    <Badge variant={sale.status === "Completed" ? "default" : sale.status === "Pending" ? "secondary" : "destructive"} className="text-[10px] h-5 px-1.5">
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
