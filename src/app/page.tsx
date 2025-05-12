import Footer from "@/app/rootcomponents/footer/Footer";
import FuturisticHeader from "@/app/rootcomponents/header/FuturisticHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight, Car, Bike, MapPin, Users, FileText } from "lucide-react";

export default function Home() {
  return (
    <>
      <FuturisticHeader />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <div className="absolute inset-0 backdrop-blur-sm z-0" />
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ 
                backgroundImage: "url('/images/signin.jpg')", 
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Momentum</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Discover premium vehicles that match your lifestyle. From luxury sedans to powerful SUVs, find your perfect ride.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Browse Vehicles <ChevronRight size={20} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-8 py-6 text-lg hover:bg-white/20 transition-all duration-300">
                  <Link href="/about" className="flex items-center gap-2">
                    Learn More <ChevronRight size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Glassmorphism floating cards */}
          <div className="absolute bottom-10 right-10 hidden lg:block">
            <div className="flex gap-6">
              <Card className="w-32 h-32 flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Car size={32} className="text-white mb-2" />
                <p className="text-white text-sm font-medium">Premium Cars</p>
              </Card>
              <Card className="w-32 h-32 flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Bike size={32} className="text-white mb-2" />
                <p className="text-white text-sm font-medium">Motorbikes</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Momentum Drives</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We offer a premium experience with a wide selection of vehicles across Kenya
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Car size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Premium Selection</h3>
                <p className="text-muted-foreground">
                  Browse through our curated collection of high-quality vehicles from top manufacturers around the world.
                </p>
              </Card>
              
              {/* Feature 2 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Nationwide Presence</h3>
                <p className="text-muted-foreground">
                  With 8 stations across Kenya, we're always close to you. Visit any of our locations for personalized service.
                </p>
              </Card>
              
              {/* Feature 3 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our experienced team will help you find the perfect vehicle that matches your needs and preferences.
                </p>
              </Card>
              
              {/* Feature 4 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Seamless Paperwork</h3>
                <p className="text-muted-foreground">
                  We handle all the documentation and paperwork, making your purchase experience smooth and hassle-free.
                </p>
              </Card>
              
              {/* Feature 5 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Flexible Financing</h3>
                <p className="text-muted-foreground">
                  We offer various financing options to make your dream vehicle affordable with convenient payment plans.
                </p>
              </Card>
              
              {/* Feature 6 */}
              <Card className="p-8 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Customer Satisfaction</h3>
                <p className="text-muted-foreground">
                  Our commitment to excellence ensures that you'll have a positive experience from browsing to driving home.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <div className="absolute inset-0 backdrop-blur-sm z-0" />
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ 
                backgroundImage: "url('/images/signup.jpg')", 
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Find Your Perfect Vehicle?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Visit our dashboard to browse our inventory and find the vehicle that matches your needs.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Explore Dashboard <ChevronRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
