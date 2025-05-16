
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { products, Product, categories } from "@/data/products";
import { Filter, Search, X } from "lucide-react";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  
  // Initialize price range based on min/max product prices
  useEffect(() => {
    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    setPriceRange([minPrice, maxPrice]);
  }, []);
  
  // Apply filters when parameters change
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "all";
    const searchParam = searchParams.get("search") || "";
    
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
    
    filterProducts(categoryParam, searchParam, priceRange, sortBy);
  }, [searchParams]);
  
  // Filter products based on current filter state
  const filterProducts = (
    category: string, 
    search: string, 
    price: number[], 
    sort: string
  ) => {
    let filtered = [...products];
    
    // Category filter
    if (category && category !== "all") {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(searchLower) || 
             p.description.toLowerCase().includes(searchLower) ||
             p.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Price range filter
    filtered = filtered.filter(
      p => p.price >= price[0] && p.price <= price[1]
    );
    
    // Apply sorting
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // "newest"
        filtered = filtered; // Products are already sorted by newest
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    
    setSearchParams(params);
  };
  
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    
    setSearchParams(params);
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    filterProducts(selectedCategory, searchQuery, values, sortBy);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    filterProducts(selectedCategory, searchQuery, priceRange, value);
  };
  
  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
    setSelectedCategory("all");
    
    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    setPriceRange([minPrice, maxPrice]);
    
    setSortBy("newest");
    setFilteredProducts(products);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile filter toggle */}
          <div className="w-full md:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`md:w-64 w-full ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-tech-purple"
                >
                  Clear all
                </Button>
              </div>
              
              {/* Search filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-9"
                  />
                  <Button type="submit" size="sm" className="bg-tech-purple hover:bg-tech-deep-purple">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <span className="text-xs text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mt-3"
                />
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <Select
                  value={sortBy}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Mobile close button */}
              <div className="mt-6 md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </span>
              </div>
            </div>
            
            {/* Active filters */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <div className="bg-tech-light-purple text-tech-purple px-3 py-1 rounded-full text-sm flex items-center">
                    <span>Search: {searchQuery}</span>
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete("search");
                        setSearchParams(params);
                        setSearchQuery("");
                      }}
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {selectedCategory !== "all" && (
                  <div className="bg-tech-light-purple text-tech-purple px-3 py-1 rounded-full text-sm flex items-center">
                    <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete("category");
                        setSearchParams(params);
                        setSelectedCategory("all");
                      }}
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try changing your filters or search query</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
