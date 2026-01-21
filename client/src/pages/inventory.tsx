import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  AlertCircle,
  CheckCircle2,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const inventoryData = [
  { id: 1, name: "Amoxicillin 500mg", sku: "MED-001", category: "Antibiotics", stock: 450, minLevel: 100, price: 12.50, expiry: "2026-10-15", status: "In Stock" },
  { id: 2, name: "Ibuprofen 400mg", sku: "MED-002", category: "Pain Relief", stock: 1200, minLevel: 200, price: 8.99, expiry: "2027-01-20", status: "In Stock" },
  { id: 3, name: "Lisinopril 10mg", sku: "MED-003", category: "Cardiovascular", stock: 45, minLevel: 50, price: 15.00, expiry: "2026-05-12", status: "Low Stock" },
  { id: 4, name: "Metformin 500mg", sku: "MED-004", category: "Diabetes", stock: 800, minLevel: 150, price: 5.50, expiry: "2026-08-30", status: "In Stock" },
  { id: 5, name: "Atorvastatin 20mg", sku: "MED-005", category: "Cardiovascular", stock: 20, minLevel: 40, price: 22.00, expiry: "2025-12-05", status: "Critical" },
  { id: 6, name: "Omeprazole 20mg", sku: "MED-006", category: "Gastrointestinal", stock: 300, minLevel: 80, price: 18.75, expiry: "2026-11-01", status: "In Stock" },
  { id: 7, name: "Albuterol Inhaler", sku: "MED-007", category: "Respiratory", stock: 65, minLevel: 30, price: 45.00, expiry: "2025-09-15", status: "In Stock" },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Inventory</h2>
          <p className="text-gray-500">Manage your drug stock and expiry dates.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or SKU..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="text-gray-600">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Stock Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{item.stock}</span>
                    <span className="text-[10px] text-muted-foreground">Min: {item.minLevel}</span>
                  </div>
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.expiry}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      item.status === "In Stock" ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" :
                      item.status === "Low Stock" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200" :
                      "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
                    }
                  >
                    {item.status === "In Stock" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Item</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
