
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Car, 
  Building2, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  Settings, 
  ChevronRight, 
  Menu, 
  X, 
  LogOut, 
  User
} from "lucide-react"
import HeaderThemeToggler from "@/app/rootcomponents/header/components/ThemeToggler"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const navItems = [
    { name: "Vehicles", href: "/dashboard", icon: <Car size={20} /> },
    { name: "Stations", href: "/dashboard/stations", icon: <Building2 size={20} /> },
    { name: "Purchases", href: "/dashboard/purchases", icon: <ShoppingCart size={20} /> },
    { name: "Payments", href: "/dashboard/payments", icon: <CreditCard size={20} /> },
    { name: "Invoices", href: "/dashboard/invoices", icon: <FileText size={20} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
  ]
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/40 dark:bg-black/40 backdrop-blur-lg border-r border-white/20 dark:border-white/10 p-4">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">M</div>
            </div>
            <span className="font-bold text-xl">
              Momentum<span className="text-red-600">Drives</span>
            </span>
          </Link>
        </div>
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-xl mb-1 ${
                  pathname === item.href
                    ? "bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-500"
                    : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        
        <Separator className="my-4 bg-gray-200 dark:bg-gray-800" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@momentumdrives.com</p>
            </div>
          </div>
          <HeaderThemeToggler />
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/40 dark:bg-black/40 backdrop-blur-lg border-b border-white/20 dark:border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>
          
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">M</div>
            </div>
            <span className="font-bold text-lg">
              Momentum<span className="text-red-600">Drives</span>
            </span>
          </Link>
          
          <HeaderThemeToggler />
        </header>
        
        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
            <div className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center">
                  <div className="relative h-8 w-8 mr-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">M</div>
                  </div>
                  <span className="font-bold text-lg">
                    Momentum<span className="text-red-600">Drives</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X size={24} />
                </Button>
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start rounded-xl mb-1 ${
                        pathname === item.href
                          ? "bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-500"
                          : ""
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                      <ChevronRight size={16} className="ml-auto opacity-50" />
                    </Button>
                  </Link>
                ))}
              </nav>
              
              <Separator className="my-4 bg-gray-200 dark:bg-gray-800" />
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@momentumdrives.com</p>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full justify-start mt-4 text-red-600">
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
