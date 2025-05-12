"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconCar, IconMotorbike, IconHeart, IconHeartFilled, IconFilter } from "@tabler/icons-react"
import { Database } from "@/types/supabase"

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"]
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"]

export default function VehiclesPage() {
  const router = useRouter()
  const supabase = createClient()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleType, setVehicleType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [sortBy, setSortBy] = useState<string>("price-asc")
  const [user, setUser] = useState<UserProfile | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [makes, setMakes] = useState<string[]>([])
  const [selectedMake, setSelectedMake] = useState<string>("all")

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      const { data: vehiclesData, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching vehicles:", error)
      } else {
        setVehicles(vehiclesData || [])
        setFilteredVehicles(vehiclesData || [])
        
        // Extract unique makes for filter
        const uniqueMakes = Array.from(new Set(vehiclesData?.map(v => v.make) || []))
        setMakes(uniqueMakes)
      }
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
        }
      }
    }

    fetchVehicles()
    fetchUserProfile()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...vehicles]
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by vehicle type
    if (vehicleType !== "all") {
      filtered = filtered.filter(vehicle => vehicle.vehicle_type === vehicleType)
    }
    
    // Filter by price range
    filtered = filtered.filter(vehicle => 
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    )
    
    // Filter by make
    if (selectedMake !== "all") {
      filtered = filtered.filter(vehicle => vehicle.make === selectedMake)
    }
    
    // Apply sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "year-desc") {
      filtered.sort((a, b) => b.year - a.year)
    } else if (sortBy === "year-asc") {
      filtered.sort((a, b) => a.year - b.year)
    }
    
    setFilteredVehicles(filtered)
  }, [vehicles, searchTerm, vehicleType, priceRange, sortBy, selectedMake])

  const toggleFavorite = async (vehicleId: string) => {
    if (!user) {
      router.push('/signin')
      return
    }
    
    let newFavorites = [...favorites]
    
    if (newFavorites.includes(vehicleId)) {
      newFavorites = newFavorites.filter(id => id !== vehicleId)
    } else {
      newFavorites.push(vehicleId)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
            Explore Our Vehicles
          </h1>
          <p className="text-muted-foreground mt-2">
            Find your perfect ride from our premium selection
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search makes, models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20"
          />
          
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20"
          >
            <IconFilter size={18} />
            Filters
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <Card className="mb-8 backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                <Tabs defaultValue="all" value={vehicleType} onValueChange={setVehicleType} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">All</TabsTrigger>
                    <TabsTrigger value="car" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
                      <IconCar size={16} className="mr-1" /> Cars
                    </TabsTrigger>
                    <TabsTrigger value="motorbike" className="data-[state=active]:bg-red-800 data-[state=active]:text-white">
                      <IconMotorbike size={16} className="mr-1" /> Bikes
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Make</label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger className="w-full backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {makes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full backdrop-blur-md bg-white/10 dark:bg-black/10 border-red-800/20">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="year-desc">Year: Newest First</SelectItem>
                    <SelectItem value="year-asc">Year: Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-3">
                <label className="text-sm font-medium mb-2 block">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-red-800"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-red-800"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
              <CardContent className="pt-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card 
              key={vehicle.id} 
              className="overflow-hidden backdrop-blur-lg bg-white/40 dark:bg-black/40 border-red-800/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image_urls?.[0] || '/images/vehicle-placeholder.jpg'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black"
                    onClick={() => toggleFavorite(vehicle.id)}
                  >
                    {favorites.includes(vehicle.id) ? (
                      <IconHeartFilled size={20} className="text-red-800" />
                    ) : (
                      <IconHeart size={20} />
                    )}
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge 
                    className={`
                      ${vehicle.status === 'available' ? 'bg-green-600' : 
                        vehicle.status === 'reserved' ? 'bg-amber-600' : 'bg-red-600'} 
                      text-white
                    `}
                  >
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {vehicle.make} {vehicle.model}
                  </CardTitle>
                  <Badge variant="outline" className="border-red-800/30">
                    {vehicle.year}
                  </Badge>
                </div>
                <CardDescription>
                  {vehicle.vehicle_type === 'car' ? (
                    <div className="flex items-center gap-1">
                      <IconCar size={16} />
                      <span>{vehicle.body_style || 'Car'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <IconMotorbike size={16} />
                      <span>{vehicle.body_style || 'Motorbike'}</span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                  <div>
                    <span className="text-muted-foreground">Mileage:</span>
                    <p>{vehicle.mileage?.toLocaleString() || 'N/A'} km</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transmission:</span>
                    <p>{vehicle.transmission ? vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1) : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engine:</span>
                    <p>{vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc}cc` : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel:</span>
                    <p>{vehicle.engine_type_combustion ? vehicle.engine_type_combustion.charAt(0).toUpperCase() + vehicle.engine_type_combustion.slice(1) : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-800 dark:text-red-600">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search term</p>
        </div>
      )}
    </div>
  )
}
