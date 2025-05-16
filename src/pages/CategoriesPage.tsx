
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const categoryImages: Record<string, string> = {
    "all": "/placeholder.svg",
    "audio": "/placeholder.svg",
    "wearables": "/placeholder.svg",
    "computers": "/placeholder.svg",
    "phones": "/placeholder.svg",
    "accessories": "/placeholder.svg",
    "gaming": "/placeholder.svg",
    "smart-home": "/placeholder.svg",
  };
  
  const categoryIcons = {
    "all": "🛒",
    "audio": "🎧",
    "wearables": "⌚",
    "computers": "💻",
    "phones": "📱",
    "accessories": "🔌",
    "gaming": "🎮",
    "smart-home": "🏠"
  };
  
  const categoryDescriptions: Record<string, string> = {
    "all": "Explore our complete collection of cutting-edge gadgets and tech accessories.",
    "audio": "Immerse yourself in crystal-clear sound with our premium headphones, earbuds, and speakers.",
    "wearables": "Stay connected on the go with smartwatches and fitness trackers that enhance your active lifestyle.",
    "computers": "Boost your productivity with our selection of laptops, desktops, and computing accessories.",
    "phones": "Stay connected with the latest smartphones featuring cutting-edge technology and features.",
    "accessories": "Enhance your tech experience with chargers, cases, adapters, and more essential accessories.",
    "gaming": "Level up your gaming setup with consoles, controllers, and immersive gaming peripherals.",
    "smart-home": "Transform your living space with connected devices that make home life more convenient."
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Shop by Category</h1>
        <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
          Explore our wide range of tech products organized by category to find exactly what you need
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(category => category.id !== 'all').map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
            >
              <Card className="overflow-hidden h-full transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="relative h-48 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10 flex items-center justify-center">
                  <span className="text-6xl">{categoryIcons[category.id as keyof typeof categoryIcons] || "📱"}</span>
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center text-white font-medium">
                      <span>Browse Products</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-tech-purple transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {categoryDescriptions[category.id]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
