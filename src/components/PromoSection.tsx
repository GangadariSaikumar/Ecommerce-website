
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PromoSection() {
  return (
    <section className="py-16 bg-tech-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Special Offer" 
                className="rounded-lg shadow-xl" 
              />
              <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-red-500 flex items-center justify-center transform rotate-12">
                <div className="text-white font-bold text-center">
                  <div className="text-sm">SAVE</div>
                  <div className="text-xl">25%</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Special Summer Sale
            </h2>
            <p className="text-gray-300 mb-8">
              Take advantage of our limited-time offers on the most popular tech gadgets.
              Get up to 25% off on selected items for a limited time only.
            </p>
            <Button 
              asChild 
              className="bg-tech-purple hover:bg-tech-deep-purple text-white"
            >
              <Link to="/products?sale=true">View Offers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
