import { TableRow, TableCell } from "@/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Phone, Mail } from "lucide-react";

export default function PatientRow({ patient }: any) {
  return (
    <TableRow className="group hover:bg-muted/50 transition-colors cursor-pointer text-right">
      {/* Patient */}
      <TableCell>
        <div className="flex items-center gap-3 justify-start">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`}
            />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-right">
            <div className="font-medium">{patient.name}</div>
            <div className="text-xs text-muted-foreground">
              {patient.age} سنة • معرف: #{1000 + patient.id}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Contact */}
      <TableCell>
        <div className="space-y-1 text-right">
          <div className="flex items-center justify-start text-xs text-muted-foreground">
            <Phone className="w-3 h-3 ml-1" /> {patient.phone}
          </div>
          <div className="flex items-center justify-start text-xs text-muted-foreground">
            <Mail className="w-3 h-3 ml-1" /> {patient.email}
          </div>
        </div>
      </TableCell>

      {/* Condition */}
      <TableCell>
        {patient.condition !== "لا يوجد" ? (
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-50">
            {patient.condition}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">-</span>
        )}
      </TableCell>

      {/* Last Visit */}
      <TableCell className="text-sm text-muted-foreground">
        {patient.lastVisit}
      </TableCell>

      {/* Status */}
      <TableCell>
        <div className="flex items-center justify-start">
          <div
            className={`w-2 h-2 rounded-full inline-block ml-2 ${
              patient.status === "نشط" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <span className="text-sm">{patient.status}</span>
        </div>
      </TableCell>

      {/* Action */}
      <TableCell className="text-left">
        <Button variant="ghost" size="sm">
          عرض الملف
        </Button>
      </TableCell>
    </TableRow>
  );
}
