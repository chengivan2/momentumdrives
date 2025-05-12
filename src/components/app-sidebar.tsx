"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  IconCar,
  IconChartBar,
  IconDashboard,
  IconFileInvoice,
  IconHelp,
  IconMapPin,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconUsers,
  IconBuildingStore,
  IconBrandMercedes,
  IconHeart,
  IconCreditCard,
} from "@tabler/icons-react"
import { createClient } from "@/utils/supabase/client"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Database } from "@/types/supabase"

type UserRole = Database["public"]["Enums"]["user_role"]

// Define which menu items are accessible to which roles
const roleAccess = {
  dashboard: ["customer", "salesperson", "social_media_manager", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  vehicles: ["customer", "salesperson", "social_media_manager", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  stations: ["salesperson", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  purchases: ["salesperson", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  payments: ["salesperson", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  invoices: ["salesperson", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  customers: ["salesperson", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  analytics: ["station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  settings: ["owner", "it_admin", "exec"],
  brands: ["customer", "salesperson", "social_media_manager", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
  favorites: ["customer", "salesperson", "social_media_manager", "station_manager", "owner", "it_admin", "exec", "exec_secretary"],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRole>("customer")
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          setUser({
            name: profile.full_name || session.user.email?.split('@')[0] || 'User',
            email: profile.email || session.user.email,
            avatar: profile.profile_image_url || '/images/default-avatar.png',
            role: profile.role
          })
          setUserRole(profile.role)
        } else {
          setUser({
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            avatar: '/images/default-avatar.png',
            role: 'customer'
          })
        }
      } else {
        setUser({
          name: 'Guest',
          email: '',
          avatar: '/images/default-avatar.png',
          role: 'customer'
        })
      }
    }

    fetchUser()
  }, [])

  // Filter menu items based on user role
  const canAccess = (menuItem: string) => {
    const accessList = roleAccess[menuItem as keyof typeof roleAccess] || []
    return accessList.includes(userRole)
  }

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      visible: canAccess('dashboard')
    },
    {
      title: "Vehicles",
      url: "/vehicles",
      icon: IconCar,
      visible: canAccess('vehicles')
    },
    {
      title: "Brands",
      url: "/brands",
      icon: IconBrandMercedes,
      visible: canAccess('brands')
    },
    {
      title: "Stations",
      url: "/stations",
      icon: IconBuildingStore,
      visible: canAccess('stations')
    },
    {
      title: "Purchases",
      url: "/purchases",
      icon: IconShoppingCart,
      visible: canAccess('purchases')
    },
    {
      title: "Payments",
      url: "/payments",
      icon: IconCreditCard,
      visible: canAccess('payments')
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: IconFileInvoice,
      visible: canAccess('invoices')
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsers,
      visible: canAccess('customers')
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
      visible: canAccess('analytics')
    },
  ].filter(item => item.visible)

  const navSecondary = [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
      visible: canAccess('settings')
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: IconHeart,
      visible: canAccess('favorites')
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
      visible: true
    },
    {
      title: "Help",
      url: "/help",
      icon: IconHelp,
      visible: true
    },
  ].filter(item => item.visible)

  const documents = [
    {
      name: "Vehicle Inventory",
      url: "/vehicles",
      icon: IconCar,
    },
    {
      name: "Station Locations",
      url: "/stations",
      icon: IconMapPin,
    },
    {
      name: "Invoice Templates",
      url: "/invoice-templates",
      icon: IconFileInvoice,
    },
  ]

  return (
    <Sidebar 
      collapsible="offcanvas" 
      {...props}
      className="bg-sidebar border-sidebar-border"
    >
      <SidebarHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <img 
                  src="/logos/mdrives-dm-logo.png" 
                  alt="Momentum Drives" 
                  className="h-6 w-auto dark:block hidden" 
                />
                <img 
                  src="/logos/mdrives-lm-logo.png" 
                  alt="Momentum Drives" 
                  className="h-6 w-auto dark:hidden block" 
                />
                <span className="text-base font-semibold ml-2">Momentum Drives</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || {
          name: 'Loading...',
          email: '',
          avatar: '/images/default-avatar.png'
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
