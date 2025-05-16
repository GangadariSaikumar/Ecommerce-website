
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast.success("Order placed successfully! Thank you for your purchase.");
      clearCart();
      window.location.href = "/order-success";
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
          <p className="mb-4">Your cart is empty. Add items to your cart before checkout.</p>
          <Button asChild className="bg-tech-purple hover:bg-tech-deep-purple text-white">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="mb-1">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="email" className="mb-1">Email Address</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="phone" className="mb-1">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="address" className="mb-1">Street Address</Label>
                    <Input id="address" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city" className="mb-1">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="state" className="mb-1">State</Label>
                      <Input id="state" required />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="mb-1">Zip Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="country" className="mb-1">Country</Label>
                    <Input id="country" defaultValue="United States" required />
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <Checkbox id="saveAddress" />
                    <label htmlFor="saveAddress" className="text-sm text-gray-600 ml-2">
                      Save this information for next time
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div>
                    <Label htmlFor="cardName" className="mb-1">Name on Card</Label>
                    <Input id="cardName" required />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="cardNumber" className="mb-1">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="expiration" className="mb-1">Expiration Date</Label>
                      <Input id="expiration" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="mb-1">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <Checkbox id="savePayment" />
                    <label htmlFor="savePayment" className="text-sm text-gray-600 ml-2">
                      Save this payment method
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-gray-600">{item.quantity} x </span>
                        <span className="ml-2">{item.product.name}</span>
                      </div>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 my-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-4">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-tech-purple hover:bg-tech-deep-purple text-white mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By placing this order, you agree to our terms and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
