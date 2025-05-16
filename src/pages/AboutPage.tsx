
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About TechTreasure</h1>
          
          <div className="bg-tech-light-purple rounded-lg p-8 mb-10">
            <h2 className="text-xl font-semibold mb-4 text-tech-purple">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, TechTreasure was born out of a passion for technology and a desire to make cutting-edge gadgets accessible to everyone. What started as a small online store has grown into a trusted destination for tech enthusiasts and everyday consumers alike.
            </p>
            <p className="text-gray-700">
              Our mission is simple: to provide high-quality tech products with exceptional customer service and competitive prices. We carefully curate our selection to offer only the best gadgets that enhance your daily life.
            </p>
          </div>
          
          <div className="md:flex gap-8 items-center mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src="/placeholder.svg" alt="Our team" className="rounded-lg shadow-md w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Our Values</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-purple text-white mr-3 flex-shrink-0 text-sm">1</span>
                  <span><strong>Quality First:</strong> We never compromise on the quality of products we offer.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-purple text-white mr-3 flex-shrink-0 text-sm">2</span>
                  <span><strong>Customer Satisfaction:</strong> Your happiness is our top priority.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-purple text-white mr-3 flex-shrink-0 text-sm">3</span>
                  <span><strong>Innovation:</strong> We stay ahead of tech trends to bring you the latest and greatest.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tech-purple text-white mr-3 flex-shrink-0 text-sm">4</span>
                  <span><strong>Integrity:</strong> Honesty and transparency in everything we do.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-10" />
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Meet the passionate individuals behind TechTreasure who work tirelessly to bring you the best tech shopping experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img src="/placeholder.svg" alt="Team member" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Alex Johnson</h3>
                <p className="text-gray-500 mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-600">Tech enthusiast with 15+ years in the industry.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img src="/placeholder.svg" alt="Team member" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Sarah Chen</h3>
                <p className="text-gray-500 mb-2">Product Specialist</p>
                <p className="text-sm text-gray-600">Expert at finding the best gadgets for our customers.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img src="/placeholder.svg" alt="Team member" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Michael Rivera</h3>
                <p className="text-gray-500 mb-2">Customer Support</p>
                <p className="text-sm text-gray-600">Dedicated to ensuring 100% customer satisfaction.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-tech-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join the TechTreasure Family</h2>
            <p className="mb-6">
              Discover why thousands of customers trust us for their tech needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                asChild
                className="bg-tech-purple hover:bg-tech-deep-purple text-white"
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button 
                variant="outline"
                asChild
                className="bg-transparent border-white text-white hover:bg-white hover:text-tech-dark"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
