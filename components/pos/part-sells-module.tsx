"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Smartphone,
  DollarSign,
  Receipt,
  Search,
  Package,
  CheckCircle2,
  Loader2
} from "lucide-react"

// Mock parts inventory
const partsInventory = [
  { id: "P-001", name: "Engine Oil 5W-30 (4L)", sku: "OIL-5W30-4L", price: 45, stock: 45, category: "Fluids" },
  { id: "P-002", name: "Brake Pads (Front)", sku: "BP-FRONT-001", price: 150, stock: 8, category: "Brakes" },
  { id: "P-003", name: "Air Filter", sku: "AF-UNI-001", price: 25, stock: 32, category: "Filters" },
  { id: "P-004", name: "Spark Plugs (Set of 4)", sku: "SP-SET4-001", price: 35, stock: 24, category: "Ignition" },
  { id: "P-005", name: "Transmission Fluid (1L)", sku: "TF-ATF-1L", price: 18, stock: 56, category: "Fluids" },
  { id: "P-006", name: "Wiper Blades (Pair)", sku: "WB-PAIR-001", price: 22, stock: 15, category: "Accessories" },
  { id: "P-007", name: "Battery 12V 60Ah", sku: "BAT-12V-60", price: 120, stock: 6, category: "Electrical" },
  { id: "P-008", name: "Oil Filter", sku: "OF-UNI-001", price: 12, stock: 48, category: "Filters" },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

type PaymentMethod = "cash" | "zaad" | "edahab" | "card"

export function PartSellsModule() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [processing, setProcessing] = useState(false)
  const [saleComplete, setSaleComplete] = useState(false)

  const filteredParts = partsInventory.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (part: typeof partsInventory[0]) => {
    const existing = cart.find(item => item.id === part.id)
    if (existing) {
      setCart(cart.map(item => 
        item.id === part.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { id: part.id, name: part.name, price: part.price, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax

  const processSale = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProcessing(false)
    setSaleComplete(true)
    
    // Reset after showing success
    setTimeout(() => {
      setCart([])
      setSaleComplete(false)
    }, 3000)
  }

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case "cash": return <DollarSign className="h-5 w-5" />
      case "zaad": return <Smartphone className="h-5 w-5" />
      case "edahab": return <Smartphone className="h-5 w-5" />
      case "card": return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <div className="h-full flex bg-slate-50 dark:bg-slate-950">
      
      {/* Left Side - Product Grid */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
            Part Sells / POS
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            className="pl-10 h-12 text-lg" 
            placeholder="Search parts by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredParts.map((part) => (
            <Card 
              key={part.id}
              className="cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all duration-200"
              onClick={() => addToCart(part)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-center h-16 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="font-medium text-sm line-clamp-2 mb-1">{part.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{part.sku}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">${part.price}</span>
                  <Badge variant="outline" className="text-xs">
                    {part.stock} in stock
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Side - Cart & Payment */}
      <div className="w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-orange-500" />
            <h3 className="font-bold text-lg">Current Sale</h3>
            <Badge className="ml-auto bg-orange-500">{cart.length} items</Badge>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 py-12">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No items in cart</p>
              <p className="text-sm">Click on a part to add it</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-orange-600 font-semibold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-red-500 hover:text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-4">
          
          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tax (5%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Payment Method</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={paymentMethod === "cash" ? "default" : "outline"}
                className={paymentMethod === "cash" ? "bg-orange-500 hover:bg-orange-600" : ""}
                onClick={() => setPaymentMethod("cash")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Cash
              </Button>
              <Button 
                variant={paymentMethod === "zaad" ? "default" : "outline"}
                className={paymentMethod === "zaad" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setPaymentMethod("zaad")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Zaad
              </Button>
              <Button 
                variant={paymentMethod === "edahab" ? "default" : "outline"}
                className={paymentMethod === "edahab" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setPaymentMethod("edahab")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                e-Dahab
              </Button>
              <Button 
                variant={paymentMethod === "card" ? "default" : "outline"}
                className={paymentMethod === "card" ? "bg-slate-800 hover:bg-slate-900" : ""}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </Button>
            </div>
          </div>

          {/* Process Payment Button */}
          <Button 
            className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white"
            disabled={cart.length === 0 || processing}
            onClick={processSale}
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : saleComplete ? (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Sale Complete!
              </>
            ) : (
              <>
                <Receipt className="h-5 w-5 mr-2" />
                Complete Sale (${total.toFixed(2)})
              </>
            )}
          </Button>

          {/* Zaad/eDahab Payment Info */}
          {(paymentMethod === "zaad" || paymentMethod === "edahab") && (
            <div className="text-xs text-center text-slate-500 p-2 bg-slate-50 dark:bg-slate-800 rounded">
              <p className="font-medium">Payment will be processed via {paymentMethod === "zaad" ? "Zaad" : "e-Dahab"}</p>
              <p>Customer will receive SMS confirmation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartSellsModule
