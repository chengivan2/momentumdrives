"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { FileText, Plus, Download, Send } from "lucide-react"

export function InvoiceGenerator() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  
  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate invoice generation
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 1500)
  }
  
  const resetForm = () => {
    setStep(1)
    setIsGenerated(false)
  }
  
  const closeDialog = () => {
    setIsOpen(false)
    setTimeout(resetForm, 300)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus size={18} className="mr-2" />
          Generate Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
            {step === 1 && "Create New Invoice"}
            {step === 2 && "Invoice Details"}
            {step === 3 && (isGenerated ? "Invoice Generated" : "Generating Invoice...")}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Select a customer and vehicle to create an invoice."}
            {step === 2 && "Add payment details and additional information."}
            {step === 3 && (isGenerated 
              ? "Your invoice has been generated successfully." 
              : "Please wait while we generate your invoice..."
            )}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select>
                <SelectTrigger id="customer" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="james-brown">James Brown</SelectItem>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select>
                <SelectTrigger id="vehicle" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                  <SelectItem value="toyota-corolla">Toyota Corolla (2020)</SelectItem>
                  <SelectItem value="bmw-x5">BMW X5 (2019)</SelectItem>
                  <SelectItem value="honda-civic">Honda Civic (2021)</SelectItem>
                  <SelectItem value="range-rover">Range Rover Sport (2018)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="station">Station</Label>
              <Select>
                <SelectTrigger id="station" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                  <SelectItem value="main">Momentum Drives Main</SelectItem>
                  <SelectItem value="westlands">Momentum Drives Westlands</SelectItem>
                  <SelectItem value="mombasa">Momentum Drives Mombasa</SelectItem>
                  <SelectItem value="kisumu">Momentum Drives Kisumu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KES)</Label>
              <Input 
                id="amount" 
                placeholder="e.g. 2,500,000" 
                className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger id="payment-method" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input 
                id="notes" 
                placeholder="Any additional information" 
                className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="theme">Invoice Theme</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 bg-white text-black border border-gray-200 hover:bg-gray-100 rounded-xl"
                >
                  Light
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 rounded-xl"
                >
                  Dark
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="py-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted-foreground">Generating your invoice...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Invoice MD-INV-003</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Your invoice has been generated successfully and is ready to be downloaded or sent.
                </p>
                <div className="flex gap-4 w-full max-w-sm">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter>
          {step === 1 && (
            <>
              <Button variant="outline" onClick={closeDialog} className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                Cancel
              </Button>
              <Button onClick={() => setStep(2)} className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl">
                Next
              </Button>
            </>
          )}
          
          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)} className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                Back
              </Button>
              <Button onClick={() => {
                setStep(3);
                handleGenerate();
              }} className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl">
                Generate Invoice
              </Button>
            </>
          )}
          
          {step === 3 && isGenerated && (
            <Button onClick={closeDialog} className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
