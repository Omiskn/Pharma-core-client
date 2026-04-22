import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import PatientRow from "./PatientRow";

export default function PatientsTable({ data }: any) {
  return (
    <div className="lg:col-span-3 bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 text-right">
            <TableHead className="text-right">المريض</TableHead>
            <TableHead className="text-right">معلومات الاتصال</TableHead>
            <TableHead className="text-right">الحالة الصحية</TableHead>
            <TableHead className="text-right">آخر زيارة</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">الإجراء</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((p: any) => (
            <PatientRow key={p.id} patient={p} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
