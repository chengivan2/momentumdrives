"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import FuturisticHeader from "@/app/rootcomponents/header/FuturisticHeader"
import { 
  Car, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Star, 
  Users, 
  ChevronRight,
  ArrowRight
} from "lucide-react"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="min-h-screen flex flex-col">
      <FuturisticHeader />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-driving-a-luxury-car-on-a-highway-at-sunset-9521-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Drive Your <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Momentum</span> Forward
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Experience the thrill of premium vehicles with our exceptional service and nationwide presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Vehicles
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
              >
                Find a Station
                <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Featured Vehicles */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our premium selection of vehicles that combine luxury, performance, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vehicle Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="Toyota Corolla" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <h3 className="text-xl font-bold mb-1">Toyota Corolla</h3>
              <p className="text-sm text-muted-foreground mb-3">2020 • 15,000 km • Petrol</p>
              <Link href="/vehicles/toyota-corolla">
                <Button variant="outline" className="w-full rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Vehicle Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="BMW X5" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <h3 className="text-xl font-bold mb-1">BMW X5</h3>
              <p className="text-sm text-muted-foreground mb-3">2019 • 25,000 km • Diesel</p>
              <Link href="/vehicles/bmw-x5">
                <Button variant="outline" className="w-full rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Vehicle Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="Honda Civic" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <h3 className="text-xl font-bold mb-1">Honda Civic</h3>
              <p className="text-sm text-muted-foreground mb-3">2021 • 8,000 km • Petrol</p>
              <Link href="/vehicles/honda-civic">
                <Button variant="outline" className="w-full rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link href="/vehicles">
              <Button className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View All Vehicles
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Momentum Drives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just vehicles. Experience the Momentum Drives difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Vehicles</h3>
              <p className="text-muted-foreground">
                Our fleet consists of carefully selected vehicles that meet the highest standards of quality and performance.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nationwide Presence</h3>
              <p className="text-muted-foreground">
                With 8 stations across Kenya, we're always close to you. Visit any of our locations for exceptional service.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Documentation</h3>
              <p className="text-muted-foreground">
                Our digital invoice system ensures all your paperwork is handled efficiently and professionally.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Every vehicle undergoes rigorous inspection and maintenance to ensure your safety and satisfaction.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
              <p className="text-muted-foreground">
                From browsing to purchase, we ensure a premium experience that matches the quality of our vehicles.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-800 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
              <p className="text-muted-foreground">
                Our team of experts is always ready to assist you with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience the Momentum Difference?
              </h2>
              <p className="text-white/80 mb-6">
                Join thousands of satisfied customers who have chosen Momentum Drives for their vehicle needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vehicles">
                  <Button 
                    size="lg" 
                    className="bg-white text-red-900 hover:bg-white/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse Vehicles
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent border-white text-white hover:bg-white/10 rounded-full"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Car" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
