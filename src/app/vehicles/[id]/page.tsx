"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  IconCar, 
  IconMotorbike, 
  IconHeart, 
  IconHeartFilled, 
  IconEngine, 
  IconGauge, 
  IconCalendar, 
  IconRuler, 
  IconPalette, 
  IconMapPin,
  IconShoppingCart,
  IconArrowLeft,
  IconShare
} from "@tabler/icons-react"
import { Database } from "@/types/supabase"

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"]
type Station = Database["public"]["Tables"]["stations"]["Row"]
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const supabase = createClient()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [station, setStation] = useState<Station | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [userRole, setUserRole] = useState<string>("customer")
  const [similarVehicles, setSimilarVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true)
      const { data: vehicleData, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching vehicle:", error)
        router.push('/vehicles')
        return
      }

      setVehicle(vehicleData)

      // Fetch station data
      if (vehicleData.station_id) {
        const { data: stationData } = await supabase
          .from("stations")
          .select("*")
          .eq("id", vehicleData.station_id)
          .single()
        
        setStation(stationData)
      }

      // Fetch similar vehicles (same make or model)
      const { data: similarData } = await supabase
        .from("vehicles")
        .select("*")
        .or(`make.eq.${vehicleData.make},model.eq.${vehicleData.model}`)
        .neq("id", params.id)
        .limit(4)

      setSimilarVehicles(similarData || [])

      setLoading(false)
    }

    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          setUser(profile)
          setFavorites(profile.favorites || [])
          setUserRole(profile.role)
        }
      }
    }

    fetchVehicle()
    fetchUserProfile()
  }, [params.id, router])

  const toggleFavorite = async () => {
    if (!user || !vehicle) {
      router.push('/signin')
      return
    }
    
    let newFavorites = [...favorites]
    
    if (newFavorites.includes(vehicle.id)) {
      newFavorites = newFavorites.filter(id => id !== vehicle.id)
    } else {
      newFavorites.push(vehicle.id)
    }
    
    setFavorites(newFavorites)
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ favorites: newFavorites })
      .eq('id', user.id)
    
    if (error) {
      console.error("Error updating favorites:", error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(price)
  }

  const canPurchase = () => {
    return ["salesperson", "station_manager", "owner", "it_admin", "exec"].includes(userRole) || 
           (vehicle?.status === "available")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
              <div className="flex gap-2 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                ))}
              </div>
              
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-8"></div>
            </div>
            
            <div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
        <p className="mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/vehicles')}>
          <IconArrowLeft className="mr-2" size={16} />
          Back to Vehicles
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="mb-2 pl-0 hover:bg-transparent hover:text-red-800"
            onClick={() => router.push('/vehicles')}
          >
            <IconArrowLeft className="mr-2" size={18} />
            Back to Vehicles
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-muted-foreground mt-2">
            {vehicle.year} • {vehicle.body_style || (vehicle.vehicle_type === 'car' ? 'Car' : 'Motorbike')}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20"
            onClick={toggleFavorite}
          >
            {favorites.includes(vehicle.id) ? (
              <IconHeartFilled size={20} className="text-red-800" />
            ) : (
              <IconHeart size={20} />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20"
          >
            <IconShare size={20} />
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
            onClick={() => setShowPurchaseModal(true)}
            disabled={!canPurchase() || vehicle.status === "sold"}
          >
            <IconShoppingCart className="mr-2" size={18} />
            {vehicle.status === "sold" ? "Sold Out" : "Purchase"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main Image Gallery */}
          <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={vehicle.image_urls?.[activeImageIndex] || '/images/vehicle-placeholder.jpg'} 
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {vehicle.image_urls && vehicle.image_urls.length > 1 && (
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {vehicle.image_urls.map((url, index) => (
                <div 
                  key={index}
                  className={`
                    h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2
                    ${activeImageIndex === index ? 'border-red-800' : 'border-transparent'}
                  `}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={url} 
                    alt={`${vehicle.make} ${vehicle.model} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Vehicle Details Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">Specifications</TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">Features</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">About this {vehicle.vehicle_type}</h3>
              <p className="mb-6">{vehicle.description || `This ${vehicle.year} ${vehicle.make} ${vehicle.model} is currently available at our ${station?.name || 'dealership'}. It features a ${vehicle.engine_displacement_cc || ''} cc ${vehicle.engine_type_combustion || ''} engine with ${vehicle.transmission || 'automatic'} transmission.`}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconCalendar size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconGauge size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-medium">{vehicle.mileage?.toLocaleString() || 'N/A'} km</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconEngine size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engine</p>
                    <p className="font-medium">{vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc}cc` : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconPalette size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{vehicle.color_exterior || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconRuler size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-medium">{vehicle.condition ? vehicle.condition.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-red-800/10 p-2 rounded-full">
                    <IconMapPin size={24} className="text-red-800" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{station?.city || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-medium">{vehicle.make}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{vehicle.model}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Body Style</p>
                  <p className="font-medium">{vehicle.body_style || 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Engine Type</p>
                  <p className="font-medium">
                    {vehicle.engine_type_combustion ? vehicle.engine_type_combustion.charAt(0).toUpperCase() + vehicle.engine_type_combustion.slice(1) : 'N/A'}
                    {vehicle.is_hybrid ? ' (Hybrid)' : ''}
                  </p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Engine Displacement</p>
                  <p className="font-medium">{vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc}cc` : 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Cylinders</p>
                  <p className="font-medium">{vehicle.cylinders || 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Horsepower</p>
                  <p className="font-medium">{vehicle.horsepower_hp ? `${vehicle.horsepower_hp} hp` : 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Torque</p>
                  <p className="font-medium">{vehicle.torque_nm ? `${vehicle.torque_nm} Nm` : 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">
                    {vehicle.transmission ? vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1) : 'N/A'}
                  </p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Drivetrain</p>
                  <p className="font-medium">
                    {vehicle.drivetrain ? vehicle.drivetrain.toUpperCase() : 'N/A'}
                  </p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Exterior Color</p>
                  <p className="font-medium">{vehicle.color_exterior || 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Interior Color</p>
                  <p className="font-medium">{vehicle.color_interior || 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">VIN</p>
                  <p className="font-medium">{vehicle.vin || 'N/A'}</p>
                </div>
                
                <div className="py-2 border-b border-red-800/10">
                  <p className="text-sm text-muted-foreground">Stock Number</p>
                  <p className="font-medium">{vehicle.stock_number}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Features & Equipment</h3>
              
              {vehicle.features ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(() => {
                    const features: React.ReactElement[] = [];
                    
                    if (Array.isArray(vehicle.features)) {
                      vehicle.features.forEach((feature, index) => {
                        if (typeof feature === 'string') {
                          features.push(
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-800"></div>
                              <p>{feature}</p>
                            </div>
                          );
                        }
                      });
                    } else if (typeof vehicle.features === 'object' && vehicle.features !== null) {
                      Object.entries(vehicle.features).forEach(([key, value]) => {
                        features.push(
                          <div key={key} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-800"></div>
                            <p>{key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
                          </div>
                        );
                      });
                    }
                    
                    return features;
                  })()}
                </div>
              ) : (
                <p>No features listed for this vehicle.</p>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Similar Vehicles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarVehicles.map((similarVehicle) => (
                  <Card 
                    key={similarVehicle.id} 
                    className="overflow-hidden backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={similarVehicle.image_urls?.[0] || '/images/vehicle-placeholder.jpg'}
                          alt={`${similarVehicle.make} ${similarVehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h4 className="font-bold">{similarVehicle.make} {similarVehicle.model}</h4>
                        <p className="text-sm text-muted-foreground">{similarVehicle.year} • {similarVehicle.mileage?.toLocaleString() || 'N/A'} km</p>
                        <p className="text-red-800 font-bold mt-2">{formatPrice(similarVehicle.price)}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 w-full border-red-800/20 hover:bg-red-800 hover:text-white"
                          onClick={() => router.push(`/vehicles/${similarVehicle.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {formatPrice(vehicle.price)}
              </CardTitle>
              <CardDescription>
                <Badge 
                  className={`
                    ${vehicle.status === 'available' ? 'bg-green-600' : 
                      vehicle.status === 'reserved' ? 'bg-amber-600' : 'bg-red-600'} 
                    text-white
                  `}
                >
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </Badge>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <div className="flex items-start gap-2">
                    <IconMapPin size={18} className="mt-0.5 text-red-800" />
                    <div>
                      <p className="font-medium">{station?.name || 'Momentum Drives'}</p>
                      <p className="text-sm text-muted-foreground">{station?.address}</p>
                      <p className="text-sm text-muted-foreground">{station?.city}, {station?.region_or_county}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="font-medium mb-2">Contact</h4>
                  <p className="text-sm">{station?.phone_number || 'Contact our sales team'}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-2">
              <Button 
                className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
                onClick={() => setShowPurchaseModal(true)}
                disabled={!canPurchase() || vehicle.status === "sold"}
              >
                <IconShoppingCart className="mr-2" size={18} />
                {vehicle.status === "sold" ? "Sold Out" : "Purchase"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-red-800/20"
                onClick={toggleFavorite}
              >
                {favorites.includes(vehicle.id) ? (
                  <>
                    <IconHeartFilled size={18} className="mr-2 text-red-800" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <IconHeart size={18} className="mr-2" />
                    Add to Favorites
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Purchase Modal would be implemented here */}
      {/* For now, we'll just redirect to the dashboard when purchase is clicked */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md backdrop-blur-lg bg-white/90 dark:bg-black/90 border-red-800/20 shadow-xl">
            <CardHeader>
              <CardTitle>Purchase Vehicle</CardTitle>
              <CardDescription>
                To complete your purchase, please visit our dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>You'll be redirected to the dashboard to complete this purchase.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowPurchaseModal(false)}>Cancel</Button>
              <Button 
                className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
                onClick={() => router.push('/dashboard')}
              >
                Continue to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
