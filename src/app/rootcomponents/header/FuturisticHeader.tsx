"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import HeaderThemeToggler from "@/app/rootcomponents/header/components/ThemeToggler"
import { 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Car, 
  Building2, 
  FileText, 
  User, 
  LogIn
} from "lucide-react"

export default function FuturisticHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "py-2 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-md" 
        : "py-4 bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">M</div>
            </div>
            <span className={`font-bold text-xl ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
              Momentum<span className="text-red-600">Drives</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/vehicles" label="Vehicles" icon={<Car size={16} />} isScrolled={isScrolled} />
            <NavLink href="/stations" label="Stations" icon={<Building2 size={16} />} isScrolled={isScrolled} />
            <NavLink href="/dashboard" label="Dashboard" icon={<FileText size={16} />} isScrolled={isScrolled} />
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <HeaderThemeToggler />
            <Link href="/signin">
              <Button 
                variant="outline" 
                size="sm"
                className={`rounded-full ${
                  isScrolled 
                    ? "bg-white/20 dark:bg-black/20 border-gray-300 dark:border-gray-700" 
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-full"
              >
                <User className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <HeaderThemeToggler />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-gray-900 dark:text-white" : "text-white"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/90 dark:bg-black/90 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <MobileNavLink href="/vehicles" label="Vehicles" icon={<Car size={18} />} />
            <MobileNavLink href="/stations" label="Stations" icon={<Building2 size={18} />} />
            <MobileNavLink href="/dashboard" label="Dashboard" icon={<FileText size={18} />} />
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-2">
            <Link href="/signin" className="w-full">
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-xl"
              >
                <User className="mr-2 h-5 w-5" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  )
}

// Desktop Navigation Link
function NavLink({ href, label, icon, isScrolled }: { href: string; label: string; icon: React.ReactNode; isScrolled: boolean }) {
  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        size="sm"
        className={`rounded-full ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
      >
        {icon}
        <span className="ml-1">{label}</span>
      </Button>
    </Link>
  )
}

// Mobile Navigation Link
function MobileNavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="w-full">
      <Button 
        variant="ghost" 
        className="w-full justify-start rounded-xl"
      >
        {icon}
        <span className="ml-2">{label}</span>
        <ChevronRight className="ml-auto h-5 w-5 opacity-50" />
      </Button>
    </Link>
  )
}
