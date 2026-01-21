import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, Phone, Mail, MapPin } from "lucide-react";

const patients = [
  { id: 1, name: "Alice Williams", age: 34, phone: "(555) 123-4567", email: "alice.w@email.com", lastVisit: "2 days ago", condition: "Chronic Asthma", status: "Active" },
  { id: 2, name: "Robert Brown", age: 52, phone: "(555) 987-6543", email: "robert.b@email.com", lastVisit: "1 week ago", condition: "Hypertension", status: "Active" },
  { id: 3, name: "Emily Davis", age: 28, phone: "(555) 456-7890", email: "emily.d@email.com", lastVisit: "3 weeks ago", condition: "None", status: "Inactive" },
  { id: 4, name: "Michael Wilson", age: 45, phone: "(555) 234-5678", email: "michael.w@email.com", lastVisit: "Yesterday", condition: "Diabetes T2", status: "Active" },
  { id: 5, name: "Sarah Miller", age: 67, phone: "(555) 876-5432", email: "sarah.m@email.com", lastVisit: "Today", condition: "Arthritis", status: "Active" },
  { id: 6, name: "James Taylor", age: 41, phone: "(555) 345-6789", email: "james.t@email.com", lastVisit: "1 month ago", condition: "None", status: "Inactive" },
];

export default function Patients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Patients</h2>
          <p className="text-gray-500">Directory of registered patients and history.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Register Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters & Stats Sidebar (could be top on mobile) */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-9" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">All</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">Active</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">Inactive</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/20">New</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead>Patient</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.age} yrs • ID: #{1000 + patient.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="w-3 h-3 mr-1" /> {patient.phone}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="w-3 h-3 mr-1" /> {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.condition !== "None" ? (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">{patient.condition}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{patient.lastVisit}</TableCell>
                  <TableCell>
                    <div className={`w-2 h-2 rounded-full inline-block mr-2 ${patient.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm">{patient.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
