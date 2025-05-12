"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Building2, ShoppingCart, CreditCard, Users, TrendingUp } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Total Vehicles</CardTitle>
          <Car className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">124</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+12%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Total Sales</CardTitle>
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">KES 42.5M</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+8%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Stations</CardTitle>
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">8</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+1</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Payments</CardTitle>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">KES 38.2M</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+15%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Customers</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,245</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+18%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Revenue Growth</CardTitle>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">+22%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+5%</span> from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
