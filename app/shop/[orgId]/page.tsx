"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ShoppingCart, Search, Filter, CheckCircle, Car } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function PublicStorePage() {
  const params = useParams()
  // In a real app we'd resolve orgId from slug, here we assume ID passed directly or handle mapping
  const orgId = params.orgId as string 
  
  const inventory = useQuery(api.store.getPublicInventory, { orgId })
  const settings = useQuery(api.store.getStoreSettings, { orgId })
  const createOrder = useMutation(api.store.createStoreOrder)
  const { toast } = useToast()

  const [cart, setCart] = useState<{item: any, quantity: number}[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Checkout Form
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    email: "",
    paymentMethod: "zaad"
  })

  // Filter items
  const filteredItems = inventory?.filter((item: any) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  // Cart Logic
  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item._id === item._id)
      if (existing) {
        return prev.map(i => i.item._id === item._id ? {...i, quantity: i.quantity + 1} : i)
      }
      return [...prev, { item, quantity: 1 }]
    })
    toast({
      title: "Added to cart",
      description: `${item.name} added to your order.`
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item._id !== itemId))
  }

  const cartTotal = cart.reduce((sum, i) => sum + (i.item.price * i.quantity), 0)

  const handleCheckout = async () => {
    if (!checkoutData.name || !checkoutData.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide your Name and Phone number."
      })
      return
    }

    try {
      const { orderNumber } = await createOrder({
        orgId,
        customerName: checkoutData.name,
        customerPhone: checkoutData.phone,
        customerEmail: checkoutData.email,
        items: cart.map(i => ({
          itemId: i.item._id,
          name: i.item.name,
          quantity: i.quantity,
          price: i.item.price
        })),
        subtotal: cartTotal,
        tax: 0, // Simplified tax for MVF
        total: cartTotal,
        paymentMethod: checkoutData.paymentMethod
      })

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${orderNumber} has been received. We will contact you shortly.`
      })
      
      setCart([])
      setIsCartOpen(false)
      // Optional: Redirect to success page
    } catch (error) {
      console.error("Checkout failed", error)
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "Something went wrong. Please try again."
      })
    }
  }

  // Loading state
  if (inventory === undefined || settings === undefined) {
    return <div className="min-h-screen flex items-center justify-center">Loading Store...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Dynamic Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm" style={{ borderTop: `4px solid ${settings.accentColor}` }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo placeholder */}
            <div className="h-8 w-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold">
              {settings.subdomain ? settings.subdomain[0].toUpperCase() : "M"}
            </div>
            <h1 className="font-bold text-xl">{settings.subdomain ? `${settings.subdomain} Shop` : "Workshop Store"}</h1>
          </div>

          <div className="flex items-center gap-4">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[540px] flex flex-col">
                <SheetHeader>
                  <SheetTitle>Your Shopping Cart</SheetTitle>
                  <SheetDescription>
                    Review your items and checkout.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-auto py-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Your cart is empty.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(({ item, quantity }) => (
                        <div key={item._id} className="flex gap-4 p-4 border rounded-lg bg-white">
                          <div className="h-16 w-16 bg-slate-100 rounded flex items-center justify-center">
                            <Car className="h-8 w-8 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.partNumber}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-medium">${item.price} x {quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 h-auto p-0"
                                onClick={() => removeFromCart(item._id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t pt-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Simplified Checkout Form */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                      <Label>Contact Info</Label>
                      <Input 
                        placeholder="Full Name" 
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                      />
                      <Input 
                        placeholder="Phone Number (Zaad/eDahab)" 
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button 
                          variant={checkoutData.paymentMethod === "zaad" ? "default" : "outline"}
                          onClick={() => setCheckoutData({...checkoutData, paymentMethod: "zaad"})}
                          className="w-full text-xs"
                        >
                          Zaad / eDahab
                        </Button>
                        <Button 
                          variant={checkoutData.paymentMethod === "cash" ? "default" : "outline"}
                          onClick={() => setCheckoutData({...checkoutData, paymentMethod: "cash"})}
                          className="w-full text-xs"
                        >
                          Pay at Shop
                        </Button>
                      </div>
                    </div>

                    <SheetFooter>
                      <Button className="w-full bg-[#00A65A] hover:bg-[#008d4c] text-white" size="lg" onClick={handleCheckout}>
                        Place Order for ${cartTotal.toFixed(2)}
                      </Button>
                    </SheetFooter>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Banner Area */}
      {settings.bannerImage && (
        <div className="h-48 md:h-64 bg-slate-900 relative overflow-hidden">
           {/* Fallback pattern if image fails or just as generic background */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="container mx-auto h-full flex items-center px-4 relative z-10">
             <div className="max-w-xl">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Quality Parts, Reliable Service</h2>
               <p className="text-slate-200">Order online and pick up at our workshop today.</p>
             </div>
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search parts by name, number or vehicle..." 
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
             {/* Year Make Model Selector Placeholder */}
             <Button variant="outline" className="w-full justify-between">
                <span>All Categories</span>
                <Filter className="h-4 w-4 opacity-50" />
             </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item: any) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
               <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
                  <Car className="h-12 w-12 text-slate-300" />
                  {item.category && (
                    <Badge className="absolute top-2 left-2 bg-slate-900/80 hover:bg-slate-900 text-xs">
                      {item.category}
                    </Badge>
                  )}
               </div>
               <CardHeader className="p-4 pb-2">
                 <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                 <p className="text-xs text-muted-foreground">{item.partNumber}</p>
               </CardHeader>
               <CardContent className="p-4 pt-0 h-12">
                 <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
               </CardContent>
               <Separator />
               <CardFooter className="p-4 flex items-center justify-between bg-slate-50/50">
                 <div className="font-bold text-lg text-slate-900">${item.price}</div>
                 <Button 
                    size="sm" 
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={!item.inStock ? "opacity-50" : ""}
                    style={item.inStock ? { backgroundColor: settings.accentColor, color: "white" } : {}}
                 >
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                 </Button>
               </CardFooter>
            </Card>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-100 inline-flex p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="text-slate-500">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2026 {settings.subdomain ? `${settings.subdomain} Workshop` : "Workshop"}. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2 text-sm">
             <span>Powered by</span>
             <Badge variant="outline" className="border-orange-500/50 text-orange-500 font-bold bg-orange-950/20">MASS</Badge>
          </div>
        </div>
      </footer>
    </div>
  )
}
