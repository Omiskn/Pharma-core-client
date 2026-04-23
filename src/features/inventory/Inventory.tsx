import { useState } from "react";
import InventoryHeader from "./components/InventoryHeader";
import InventoryToolbar from "./components/InventoryToolbar";
import InventoryTable from "./components/InventoryTable";

const inventoryData = [
  {
    id: 1,
    name: "أموكسيسيلين 500 ملغ",
    sku: "MED-001",
    category: "مضادات حيوية",
    stock: 450,
    minLevel: 100,
    price: 12.5,
    expiry: "2026-10-15",
    status: "متوفر",
  },
  {
    id: 2,
    name: "ايبوبروفين 400 ملغ",
    sku: "MED-002",
    category: "مسكنات آلام",
    stock: 1200,
    minLevel: 200,
    price: 8.99,
    expiry: "2027-01-20",
    status: "متوفر",
  },
  {
    id: 3,
    name: "ليزينوبريل 10 ملغ",
    sku: "MED-003",
    category: "أمراض القلب",
    stock: 45,
    minLevel: 50,
    price: 15.0,
    expiry: "2026-05-12",
    status: "مخزون منخفض",
  },
  {
    id: 4,
    name: "ميتفورمين 500 ملغ",
    sku: "MED-004",
    category: "السكري",
    stock: 800,
    minLevel: 150,
    price: 5.5,
    expiry: "2026-08-30",
    status: "متوفر",
  },
  {
    id: 5,
    name: "أطورفاستاتين 20 ملغ",
    sku: "MED-005",
    category: "أمراض القلب",
    stock: 20,
    minLevel: 40,
    price: 22.0,
    expiry: "2025-12-05",
    status: "حرج",
  },
  {
    id: 6,
    name: "أوميبرازول 20 ملغ",
    sku: "MED-006",
    category: "الجهاز الهضمي",
    stock: 300,
    minLevel: 80,
    price: 18.75,
    expiry: "2026-11-01",
    status: "متوفر",
  },
  {
    id: 7,
    name: "بخاخ ألبوتيرول",
    sku: "MED-007",
    category: "الجهاز التنفسي",
    stock: 0,
    minLevel: 30,
    price: 45.0,
    expiry: "2025-09-15",
    status: "متوفر",
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" dir="rtl">
      <InventoryHeader />

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <InventoryToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <InventoryTable data={filteredData} />
      </div>
    </div>
  );
}
