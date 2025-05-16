
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const discountedPrice = product.discountPercentage 
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;

  return (
    <div className="group product-card-shadow bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block h-48 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-tech-blue text-white">New</Badge>
          )}
          {product.discountPercentage && (
            <Badge className="bg-red-500 text-white">-{product.discountPercentage}%</Badge>
          )}
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium ml-1">{product.rating}</span>
          </div>
        </div>
        
        {/* Name */}
        <Link to={`/product/${product.id}`} className="font-medium hover:text-tech-purple transition-colors line-clamp-2 mb-1">
          {product.name}
        </Link>
        
        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            {discountedPrice ? (
              <>
                <span className="font-bold text-lg">${discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Stock Status & Add to Cart */}
          <div className="flex justify-between items-center">
            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <Button 
              size="sm" 
              className="bg-tech-purple hover:bg-tech-deep-purple text-white"
              disabled={product.stock <= 0}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
