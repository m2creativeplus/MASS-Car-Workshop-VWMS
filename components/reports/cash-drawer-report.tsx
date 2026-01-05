"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Wallet,
  DollarSign,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calculator,
  History,
  LockOpen,
  Lock,
  Banknote,
  CreditCard
} from "lucide-react"

// Cash drawer state
interface CashDrawerState {
  isOpen: boolean
  openedAt: Date | null
  startingCash: number
  cashPayments: number
  checkPayments: number
  adjustments: { type: 'add' | 'remove', amount: number, reason: string, time: Date }[]
}

// Denomination counts
interface DenominationCount {
  pennies: number
  nickels: number
  dimes: number
  quarters: number
  ones: number
  fives: number
  tens: number
  twenties: number
  fifties: number
  hundreds: number
  checks: number
}

// Sample history
const drawerHistory = [
  { date: '2025-01-04', openedBy: 'Ali', closedBy: 'Ali', starting: 200, expected: 1245, counted: 1240, discrepancy: -5 },
  { date: '2025-01-03', openedBy: 'Farah', closedBy: 'Farah', starting: 200, expected: 980, counted: 980, discrepancy: 0 },
  { date: '2025-01-02', openedBy: 'Ali', closedBy: 'Omar', starting: 200, expected: 1560, counted: 1565, discrepancy: 5 },
]

export function CashDrawerReport() {
  const [drawerState, setDrawerState] = useState<CashDrawerState>({
    isOpen: true,
    openedAt: new Date(),
    startingCash: 200,
    cashPayments: 1850,
    checkPayments: 800,
    adjustments: [
      { type: 'remove', amount: 50, reason: 'Petty cash - supplies', time: new Date() }
    ]
  })

  const [denominations, setDenominations] = useState<DenominationCount>({
    pennies: 0, nickels: 0, dimes: 0, quarters: 0,
    ones: 0, fives: 0, tens: 0, twenties: 0, fifties: 0, hundreds: 0,
    checks: 0
  })

  const [openDrawerDialog, setOpenDrawerDialog] = useState(false)
  const [closeDrawerDialog, setCloseDrawerDialog] = useState(false)
  const [startingAmount, setStartingAmount] = useState(200)

  // Calculate totals
  const totalAdjustments = drawerState.adjustments.reduce((sum, adj) => 
    adj.type === 'add' ? sum + adj.amount : sum - adj.amount, 0
  )
  const expectedCash = drawerState.startingCash + drawerState.cashPayments + totalAdjustments
  const expectedChecks = drawerState.checkPayments

  // Calculate counted totals
  const countedCash = 
    (denominations.pennies * 0.01) +
    (denominations.nickels * 0.05) +
    (denominations.dimes * 0.10) +
    (denominations.quarters * 0.25) +
    (denominations.ones * 1) +
    (denominations.fives * 5) +
    (denominations.tens * 10) +
    (denominations.twenties * 20) +
    (denominations.fifties * 50) +
    (denominations.hundreds * 100)

  const countedChecks = denominations.checks
  const cashDiscrepancy = countedCash - expectedCash
  const checkDiscrepancy = countedChecks - expectedChecks

  const handleOpenDrawer = () => {
    setDrawerState({
      isOpen: true,
      openedAt: new Date(),
      startingCash: startingAmount,
      cashPayments: 0,
      checkPayments: 0,
      adjustments: []
    })
    setOpenDrawerDialog(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="h-6 w-6 text-amber-600" />
            Cash Drawer Report
          </h2>
          <p className="text-muted-foreground">Daily cash and check reconciliation</p>
        </div>
        <div className="flex items-center gap-3">
          {drawerState.isOpen ? (
            <Badge className="bg-green-100 text-green-700 gap-1">
              <LockOpen className="h-3 w-3" /> Drawer Open
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-700 gap-1">
              <Lock className="h-3 w-3" /> Drawer Closed
            </Badge>
          )}
        </div>
      </div>

      {/* Drawer Status Card */}
      <Card className={`border-2 ${drawerState.isOpen ? 'border-green-500' : 'border-gray-300'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Drawer Status</CardTitle>
              {drawerState.isOpen && drawerState.openedAt && (
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Opened at {drawerState.openedAt.toLocaleTimeString()}
                </CardDescription>
              )}
            </div>
            {!drawerState.isOpen ? (
              <Dialog open={openDrawerDialog} onOpenChange={setOpenDrawerDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <LockOpen className="h-4 w-4 mr-2" />
                    Open Drawer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Open Cash Drawer</DialogTitle>
                    <DialogDescription>Enter the starting cash amount</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label>Starting Cash</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        className="pl-10"
                        value={startingAmount}
                        onChange={(e) => setStartingAmount(Number(e.target.value))}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Count the physical cash and enter the total
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleOpenDrawer}>Confirm & Open</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={closeDrawerDialog} onOpenChange={setCloseDrawerDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Lock className="h-4 w-4 mr-2" />
                    Close Drawer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Close Cash Drawer</DialogTitle>
                    <DialogDescription>Count all denominations and checks</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-6 py-4">
                    {/* Coins */}
                    <div>
                      <h4 className="font-medium mb-3">Coins</h4>
                      <div className="space-y-2">
                        {(['pennies', 'nickels', 'dimes', 'quarters'] as const).map((coin) => (
                          <div key={coin} className="flex items-center justify-between">
                            <Label className="capitalize">{coin}</Label>
                            <Input 
                              type="number"
                              className="w-24"
                              value={denominations[coin]}
                              onChange={(e) => setDenominations(d => ({ ...d, [coin]: Number(e.target.value) }))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Bills */}
                    <div>
                      <h4 className="font-medium mb-3">Bills</h4>
                      <div className="space-y-2">
                        {[
                          { key: 'ones', label: '$1' },
                          { key: 'fives', label: '$5' },
                          { key: 'tens', label: '$10' },
                          { key: 'twenties', label: '$20' },
                          { key: 'fifties', label: '$50' },
                          { key: 'hundreds', label: '$100' },
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center justify-between">
                            <Label>{label}</Label>
                            <Input 
                              type="number"
                              className="w-24"
                              value={denominations[key as keyof DenominationCount]}
                              onChange={(e) => setDenominations(d => ({ ...d, [key]: Number(e.target.value) }))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <Label>Total Checks ($)</Label>
                      <Input 
                        type="number"
                        className="w-32"
                        value={denominations.checks}
                        onChange={(e) => setDenominations(d => ({ ...d, checks: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Counted Cash:</span>
                      <span className="font-bold">${countedCash.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Counted Checks:</span>
                      <span className="font-bold">${countedChecks.toFixed(2)}</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCloseDrawerDialog(false)}>Cancel</Button>
                    <Button onClick={() => {
                      setDrawerState(s => ({ ...s, isOpen: false }))
                      setCloseDrawerDialog(false)
                    }}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Review Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Current Status / Reconciliation */}
      {drawerState.isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cash Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Cash Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Starting Cash</span>
                <span className="font-medium">${drawerState.startingCash.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">+ Cash Payments</span>
                <span className="font-medium text-green-600">+${drawerState.cashPayments.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">+/- Adjustments</span>
                <span className={`font-medium ${totalAdjustments >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalAdjustments >= 0 ? '+' : ''}{totalAdjustments.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Expected Cash</span>
                <span className="font-bold text-lg">${expectedCash.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Check Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Check Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Check Payments</span>
                <span className="font-medium">${drawerState.checkPayments.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Expected Checks</span>
                <span className="font-bold text-lg">${expectedChecks.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Keep physical checks in a separate stack for deposit
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Adjustments */}
      {drawerState.isOpen && drawerState.adjustments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Today's Adjustments</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Adjustment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drawerState.adjustments.map((adj, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-muted-foreground">
                      {adj.time.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={adj.type === 'add' ? 'default' : 'destructive'}>
                        {adj.type === 'add' ? <Plus className="h-3 w-3 mr-1" /> : <Minus className="h-3 w-3 mr-1" />}
                        {adj.type === 'add' ? 'Added' : 'Removed'}
                      </Badge>
                    </TableCell>
                    <TableCell>{adj.reason}</TableCell>
                    <TableCell className={`text-right font-medium ${adj.type === 'add' ? 'text-green-600' : 'text-red-600'}`}>
                      {adj.type === 'add' ? '+' : '-'}${adj.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Drawer History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5" />
            Drawer History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Opened By</TableHead>
                <TableHead>Closed By</TableHead>
                <TableHead className="text-right">Starting</TableHead>
                <TableHead className="text-right">Expected</TableHead>
                <TableHead className="text-right">Counted</TableHead>
                <TableHead className="text-right">Discrepancy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drawerHistory.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{entry.date}</TableCell>
                  <TableCell>{entry.openedBy}</TableCell>
                  <TableCell>{entry.closedBy}</TableCell>
                  <TableCell className="text-right">${entry.starting}</TableCell>
                  <TableCell className="text-right">${entry.expected}</TableCell>
                  <TableCell className="text-right">${entry.counted}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      entry.discrepancy === 0 
                        ? 'bg-green-100 text-green-700'
                        : entry.discrepancy > 0 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                    }>
                      {entry.discrepancy === 0 ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Balanced</>
                      ) : (
                        <><AlertTriangle className="h-3 w-3 mr-1" /> ${entry.discrepancy}</>
                      )}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Formula Reference */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">💰 Reconciliation Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-medium">Expected Cash</span>
              <p className="text-muted-foreground">Starting + Payments + Adjustments</p>
            </div>
            <div>
              <span className="font-medium">Discrepancy</span>
              <p className="text-muted-foreground">Counted Amount - Expected Amount</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
