import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote,
  User,
  ScanBarcode
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const products = [
  { id: 1, name: "Amoxicillin 500mg", price: 12.50, category: "Antibiotics", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Ibuprofen 400mg", price: 8.99, category: "Pain Relief", color: "bg-red-100 text-red-700" },
  { id: 3, name: "Paracetamol 500mg", price: 5.00, category: "Pain Relief", color: "bg-red-100 text-red-700" },
  { id: 4, name: "Vitamin C 1000mg", price: 15.00, category: "Supplements", color: "bg-green-100 text-green-700" },
  { id: 5, name: "Bandages (Pack)", price: 4.50, category: "First Aid", color: "bg-orange-100 text-orange-700" },
  { id: 6, name: "Cough Syrup", price: 12.00, category: "Cold & Flu", color: "bg-purple-100 text-purple-700" },
  { id: 7, name: "Antiseptic Cream", price: 7.25, category: "First Aid", color: "bg-orange-100 text-orange-700" },
  { id: 8, name: "Thermometer", price: 25.00, category: "Device", color: "bg-gray-100 text-gray-700" },
  { id: 9, name: "Face Masks (10pcs)", price: 3.50, category: "PPE", color: "bg-gray-100 text-gray-700" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Side: Product Grid */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-11 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
            <ScanBarcode className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200 group"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-between gap-4">
                  <div className={`w-12 h-12 rounded-full ${product.color} flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-110 transition-transform`}>
                    {product.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="font-bold text-lg text-primary">${product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side: Cart */}
      <div className="w-[400px] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-lg">Current Order</h3>
            <div className="flex items-center text-sm text-muted-foreground bg-white px-2 py-1 rounded border">
              <User className="w-3 h-3 mr-1" />
              <span>Walk-in Customer</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Order #TRX-8842</p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-50">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <CreditCard className="w-8 h-8" />
              </div>
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} / unit</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-right min-w-[60px]">
                  <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} className="text-destructive text-[10px] hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5">
              <CreditCard className="w-4 h-4 mr-2" /> Card
            </Button>
            <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5">
              <Banknote className="w-4 h-4 mr-2" /> Cash
            </Button>
          </div>
          <Button className="w-full text-lg py-6 font-bold shadow-lg shadow-primary/20" size="lg" disabled={cart.length === 0}>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
