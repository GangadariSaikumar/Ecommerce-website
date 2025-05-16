
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-tech-light-purple py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="text-tech-purple">Discover</span> the Latest Tech Gadgets
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-lg">
              Explore our premium collection of cutting-edge electronics and smart devices to elevate your tech experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild className="bg-tech-purple hover:bg-tech-deep-purple text-white font-medium px-8 py-6 text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button 
                variant="outline" 
                asChild 
                className="border-tech-purple text-tech-purple hover:bg-tech-light-purple hover:text-tech-deep-purple px-8 py-6 text-lg"
              >
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 md:scale-110 transform transition-transform animate-pulse">
              <img 
                src="/placeholder.svg" 
                alt="Latest tech gadget" 
                className="mx-auto rounded-lg shadow-2xl"
                style={{ maxHeight: "400px" }} 
              />
            </div>
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-tech-blue/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-tech-purple/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-tech-purple/5 rounded-full"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-tech-blue/5 rounded-full"></div>
      </div>
    </div>
  );
}
