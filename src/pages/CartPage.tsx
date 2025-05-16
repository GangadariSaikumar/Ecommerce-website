
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash, ChevronLeft, ChevronRight, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const navigate = useNavigate();
  
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === "TECH10") {
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid or expired coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    // This would typically redirect to a checkout page or process
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" />
          Your Cart {items.length > 0 && `(${items.length} items)`}
        </h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Button 
              asChild
              className="bg-tech-purple hover:bg-tech-deep-purple text-white"
            >
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="w-full sm:w-24 h-24 bg-white border rounded-md overflow-hidden">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <Link 
                                to={`/product/${item.product.id}`}
                                className="font-medium hover:text-tech-purple transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <div className="font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500 mb-3">
                              ${item.product.price.toFixed(2)} each
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border rounded-md bg-white">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 rounded-none"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="w-10 text-center text-sm">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.product.stock <= item.quantity}
                                  className="h-8 w-8 rounded-none"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(-1)}
                      className="text-gray-500"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Continue Shopping
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="mr-1 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {/* Coupon Code */}
                  <form onSubmit={handleApplyCoupon} className="mb-6">
                    <div className="text-sm font-medium mb-2">Promo Code</div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        variant="outline"
                        disabled={isApplyingCoupon}
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                  </form>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-tech-purple hover:bg-tech-deep-purple text-white"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                </CardContent>
                
                <CardFooter className="bg-gray-50 px-6 py-4 text-sm text-gray-500">
                  <p>
                    Free shipping on orders over $100. 30-day return policy.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
