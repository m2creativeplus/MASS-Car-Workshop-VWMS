"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  Phone, 
  ShieldCheck,
  CreditCard
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Repair Recommendations
const REPAIR_ITEMS = [
  {
    id: 1,
    title: "Front Brake Pads",
    reason: "Pads are worn down to 2mm (Metal-on-metal risk).",
    severity: "critical", // critical, recommended
    cost: 85.00,
    image: "/images/repairs/brake-pads-worn.jpg" // placeholder
  },
  {
    id: 2,
    title: "Engine Air Filter",
    reason: "Clogged filter affecting fuel economy.",
    severity: "recommended",
    cost: 15.00,
    image: "/images/repairs/air-filter-dirty.jpg"
  },
  {
    id: 3,
    title: "Wiper Blades",
    reason: "Streaking during wiper operation.",
    severity: "recommended",
    cost: 25.00,
    image: "/images/repairs/wipers.jpg"
  }
]

export function MobileApprovalFlow() {
  const [decisions, setDecisions] = useState<Record<number, 'approved' | 'declined'>>({})
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const currentItem = REPAIR_ITEMS[currentItemIndex]

  const handleDecision = (decision: 'approved' | 'declined') => {
    setDecisions(prev => ({ ...prev, [currentItem.id]: decision }))
    
    if (currentItemIndex < REPAIR_ITEMS.length - 1) {
      setCurrentItemIndex(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const totalCost = Object.entries(decisions)
    .filter(([_, status]) => status === 'approved')
    .reduce((sum, [id, _]) => {
      const item = REPAIR_ITEMS.find(i => i.id === Number(id))
      return sum + (item ? item.cost : 0)
    }, 0)

  // COMPLETED STATE (Summary)
  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">You're All Set!</h2>
          <p className="text-slate-500 max-w-xs mx-auto">
            We've received your approvals. Our technicians will start working on your vehicle immediately.
          </p>
        </motion.div>

        <Card className="w-full max-w-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
           <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Approved Services</span>
                  <span className="font-bold text-slate-900 dark:text-white">{Object.values(decisions).filter(d => d === 'approved').length} Items</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Estimate</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${totalCost.toFixed(2)}</span>
              </div>
           </CardContent>
        </Card>

        <Button className="w-full max-w-sm h-12 text-lg bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-900/20">
            <CreditCard className="w-5 h-5 mr-2" /> Pay Deposit Now
        </Button>
      </div>
    )
  }

  // CARD REVIEW STATE
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col relative overflow-hidden">
      
      {/* HEADER: Vehicle Status */}
      <div className="bg-white dark:bg-slate-900 p-4 shadow-sm z-10 flex justify-between items-center">
         <div>
            <h1 className="font-bold text-slate-900 dark:text-white">Toyota Land Cruiser</h1>
            <p className="text-xs text-slate-500">SL-8292 • 48,000km</p>
         </div>
         <Button variant="ghost" size="icon" className="text-orange-600 bg-orange-50 dark:bg-orange-900/20">
             <Phone className="w-5 h-5" />
         </Button>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-1 bg-slate-200 dark:bg-slate-800 w-full">
         <motion.div 
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentItemIndex) / REPAIR_ITEMS.length) * 100}%` }}
         />
      </div>

      {/* MAIN CONTENT: The Card Stack */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ x: 300, opacity: 0, rotate: 10 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -300, opacity: 0, rotate: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-sm"
          >
            <Card className="overflow-hidden border-0 shadow-2xl bg-white dark:bg-slate-900 h-[60vh] flex flex-col">
              {/* IMAGE AREA */}
              <div className="h-[45%] bg-slate-200 dark:bg-slate-800 relative bg-cover bg-center">
                 {/* Placeholder for actual image */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <img 
                        src={currentItem.image} 
                        alt="Repair Item" 
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/1e293b/FFF?text=Part+Image')}
                    />
                 </div>
                 
                 {currentItem.severity === 'critical' && (
                     <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 px-3 py-1">
                        <AlertTriangle className="w-3 h-3 mr-1" /> CRITICAL
                     </Badge>
                 )}
              </div>

              {/* CONTENT AREA */}
              <CardContent className="flex-1 p-6 flex flex-col justify-between">
                 <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {currentItem.title}
                        </h2>
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            ${currentItem.cost}
                        </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {currentItem.reason}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button 
                        variant="outline" 
                        className="h-14 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-lg"
                        onClick={() => handleDecision('declined')}
                    >
                        <XCircle className="w-6 h-6 mr-2" /> Decline
                    </Button>
                    <Button 
                        className="h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-lg shadow-lg shadow-emerald-900/20"
                        onClick={() => handleDecision('approved')}
                    >
                        <CheckCircle2 className="w-6 h-6 mr-2" /> Approve
                    </Button>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
      
      <div className="text-center pb-6 text-slate-400 text-sm">
         Reviewing Item {currentItemIndex + 1} of {REPAIR_ITEMS.length}
      </div>
    </div>
  )
}
