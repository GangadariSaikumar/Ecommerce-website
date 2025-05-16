
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found");
      navigate("/products");
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const discountedPrice = product?.discountPercentage 
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-600"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden border product-card-shadow h-96">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4" 
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="text-gray-500 text-sm">{product.category}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} rating</span>
            </div>
            
            {/* Price */}
            <div className="flex items-end gap-2 mb-6">
              {discountedPrice ? (
                <>
                  <span className="text-3xl font-bold">${discountedPrice}</span>
                  <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            {/* Stock Status */}
            <div className="mb-6">
              <span 
                className={`text-sm font-medium ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            {/* Add to Cart */}
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md mr-4 bg-white">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 px-3 rounded-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={increaseQuantity}
                  disabled={product.stock <= quantity}
                  className="h-10 px-3 rounded-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="bg-tech-purple hover:bg-tech-deep-purple text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-green-600 mr-2 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b bg-transparent p-0 mb-6">
              <TabsTrigger 
                value="details"
                className="relative h-12 border-0 border-b-2 border-transparent data-[state=active]:border-tech-purple data-[state=active]:text-tech-purple bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="relative h-12 border-0 border-b-2 border-transparent data-[state=active]:border-tech-purple data-[state=active]:text-tech-purple bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="relative h-12 border-0 border-b-2 border-transparent data-[state=active]:border-tech-purple data-[state=active]:text-tech-purple bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700">{product.description}</p>
                  <Separator className="my-6" />
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="text-green-600 mr-2 h-5 w-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">Model:</span> {product.name}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">Category:</span> {product.category}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">SKU:</span> TT-{product.id.padStart(6, '0')}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">Warranty:</span> 1 Year Limited
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">Stock:</span> {product.stock} units
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <span className="font-medium">Rating:</span> {product.rating}/5
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold">{product.rating}</span>
                    <span className="text-gray-500 ml-2">out of 5</span>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">John D.</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Amazing product! Works perfectly and arrived faster than expected.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Sophie T.</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Great quality for the price. Would definitely recommend to others.
                      </p>
                    </div>
                    
                    <Button className="bg-tech-purple hover:bg-tech-deep-purple text-white">
                      Load more reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
