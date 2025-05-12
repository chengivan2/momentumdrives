"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Printer, Download, Mail } from "lucide-react";
import { useTheme } from "next-themes";

export function InvoiceGenerator() {
  const { theme } = useTheme();
  const [invoiceData, setInvoiceData] = useState({
    customer: "",
    vehicle: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
    includeVAT: true,
    includeDelivery: false,
    notes: "",
  });

  const [previewReady, setPreviewReady] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateInvoice = () => {
    // In a real app, this would generate the invoice
    setPreviewReady(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus size={18} className="mr-2" />
          Generate Invoice
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-l-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            Generate Invoice
          </SheetTitle>
          <SheetDescription>
            Create a new invoice for a vehicle purchase.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {!previewReady ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    placeholder="Enter customer name"
                    value={invoiceData.customer}
                    onChange={(e) => handleChange("customer", e.target.value)}
                    className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select
                    value={invoiceData.vehicle}
                    onValueChange={(value) => handleChange("vehicle", value)}
                  >
                    <SelectTrigger className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                      <SelectItem value="toyota-corolla">Toyota Corolla</SelectItem>
                      <SelectItem value="bmw-x5">BMW X5</SelectItem>
                      <SelectItem value="honda-civic">Honda Civic</SelectItem>
                      <SelectItem value="range-rover">Range Rover Sport</SelectItem>
                      <SelectItem value="mercedes-benz">Mercedes-Benz C-Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    value={invoiceData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={invoiceData.paymentMethod}
                  onValueChange={(value) => handleChange("paymentMethod", value)}
                >
                  <SelectTrigger className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="financing">Financing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeVAT"
                    checked={invoiceData.includeVAT}
                    onCheckedChange={(checked) =>
                      handleChange("includeVAT", checked as boolean)
                    }
                  />
                  <Label htmlFor="includeVAT">Include VAT (16%)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeDelivery"
                    checked={invoiceData.includeDelivery}
                    onCheckedChange={(checked) =>
                      handleChange("includeDelivery", checked as boolean)
                    }
                  />
                  <Label htmlFor="includeDelivery">Include Delivery Fee</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea
                  id="notes"
                  placeholder="Enter any additional notes"
                  value={invoiceData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="w-full min-h-[100px] p-3 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl resize-none"
                />
              </div>

              <Button
                onClick={generateInvoice}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText size={18} className="mr-2" />
                Generate Invoice
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Invoice Preview */}
              <Card className={`p-6 ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                      Momentum Drives
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Mombasa Road, Exit 7, Nairobi, Kenya
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-xl font-bold">INVOICE</h4>
                    <p className="text-sm text-muted-foreground">
                      #MD-INV-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {invoiceData.date}
                    </p>
                  </div>
                </div>

                <div className="border-t border-b border-white/10 dark:border-white/5 py-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground mb-1">
                        Bill To:
                      </h5>
                      <p className="font-medium">{invoiceData.customer}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground mb-1">
                        Payment Method:
                      </h5>
                      <p className="font-medium capitalize">
                        {invoiceData.paymentMethod.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 dark:border-white/5">
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10 dark:border-white/5">
                        <td className="py-3">
                          {invoiceData.vehicle.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </td>
                        <td className="text-right py-3">
                          KES {Number(invoiceData.amount).toLocaleString()}
                        </td>
                      </tr>
                      {invoiceData.includeVAT && (
                        <tr className="border-b border-white/10 dark:border-white/5">
                          <td className="py-3">VAT (16%)</td>
                          <td className="text-right py-3">
                            KES {(Number(invoiceData.amount) * 0.16).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {invoiceData.includeDelivery && (
                        <tr className="border-b border-white/10 dark:border-white/5">
                          <td className="py-3">Delivery Fee</td>
                          <td className="text-right py-3">KES 15,000</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="py-3 font-bold">Total</td>
                        <td className="text-right py-3 font-bold">
                          KES{" "}
                          {(
                            Number(invoiceData.amount) +
                            (invoiceData.includeVAT
                              ? Number(invoiceData.amount) * 0.16
                              : 0) +
                            (invoiceData.includeDelivery ? 15000 : 0)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {invoiceData.notes && (
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-muted-foreground mb-1">
                      Notes:
                    </h5>
                    <p className="text-sm">{invoiceData.notes}</p>
                  </div>
                )}

                <div className="text-center text-sm text-muted-foreground">
                  <p>Thank you for your business!</p>
                  <p>For any inquiries, please contact us at info@momentumdrives.com</p>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5"
                  onClick={() => setPreviewReady(false)}
                >
                  Edit Invoice
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Printer size={18} className="mr-2" />
                  Print
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download size={18} className="mr-2" />
                  Download
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail size={18} className="mr-2" />
                  Email
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
