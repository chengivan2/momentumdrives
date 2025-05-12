"use client"

import { useState } from "react"
import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Car, 
  Building2, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  FileText, 
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
  MapPin,
  Phone
} from "lucide-react"
import { InvoiceGenerator } from "./components/InvoiceGenerator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("vehicles")
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
  const [isAddStationOpen, setIsAddStationOpen] = useState(false)
  
  return (
    <div className="px-4 lg:px-6 space-y-8">
      {/* Dashboard Overview */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your vehicle inventory, sales, and business operations.
        </p>
      </div>

      {/* Stats Overview */}
      <SectionCards />

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="vehicles" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-4 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl overflow-x-auto">
          <TabsTrigger value="vehicles" className="flex items-center gap-2">
            <Car size={16} />
            <span>Vehicles</span>
          </TabsTrigger>
          <TabsTrigger value="stations" className="flex items-center gap-2">
            <Building2 size={16} />
            <span>Stations</span>
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <ShoppingCart size={16} />
            <span>Purchases</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Company</span>
          </TabsTrigger>
        </TabsList>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search vehicles..." 
                  className="pl-10 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px] bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus size={18} className="mr-2" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">Add New Vehicle</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new vehicle to add to inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="e.g. Toyota" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g. Corolla" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="e.g. 2022" type="number" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KES)</Label>
                    <Input id="price" placeholder="e.g. 2500000" type="number" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddVehicleOpen(false)} className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl">
                    Save Vehicle
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vehicle Card 1 */}
            <Card className="overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-green-500/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
                    Available
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-black text-xs font-medium rounded-full">
                    KES 2,500,000
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">Toyota Corolla</h3>
                <p className="text-sm text-muted-foreground mb-3">2020 • 15,000 km • Petrol</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Momentum Drives Main</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/90 dark:bg-black/90 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-xl">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye size={14} /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit size={14} /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 size={14} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>

            {/* Vehicle Card 2 */}
            <Card className="overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-green-500/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
                    Available
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-black text-xs font-medium rounded-full">
                    KES 6,500,000
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">BMW X5</h3>
                <p className="text-sm text-muted-foreground mb-3">2019 • 25,000 km • Diesel</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Momentum Drives Westlands</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                    View
                  </Button>
                </div>
              </div>
            </Card>

            {/* Vehicle Card 3 */}
            <Card className="overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-green-500/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
                    Available
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-black text-xs font-medium rounded-full">
                    KES 2,800,000
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">Honda Civic</h3>
                <p className="text-sm text-muted-foreground mb-3">2021 • 8,000 km • Petrol</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Momentum Drives Mombasa</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
              View All Vehicles
            </Button>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search invoices..." 
                className="pl-10 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl"
              />
            </div>
            <InvoiceGenerator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Invoice Card 1 */}
            <Card className="p-6 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">MD-INV-001</h3>
                  <p className="text-sm text-muted-foreground">October 15, 2023</p>
                </div>
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Paid</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer:</span>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Vehicle:</span>
                  <span className="text-sm font-medium">Range Rover Sport</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-medium">KES 8,500,000</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  View
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  Download
                </Button>
              </div>
            </Card>

            {/* Invoice Card 2 */}
            <Card className="p-6 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">MD-INV-002</h3>
                  <p className="text-sm text-muted-foreground">November 2, 2023</p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Partial</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer:</span>
                  <span className="text-sm font-medium">John Kamau</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Vehicle:</span>
                  <span className="text-sm font-medium">Mercedes-Benz C-Class</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-medium">KES 4,200,000</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  View
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  Download
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
