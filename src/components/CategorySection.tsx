
import { categories } from "@/data/products";
import { Link } from "react-router-dom";

export default function CategorySection() {
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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find the perfect gadget based on your needs and interests
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.id === 'all' ? '/products' : `/products?category=${category.id}`}
              className="bg-white group rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-3">
                {categoryIcons[category.id as keyof typeof categoryIcons] || "📱"}
              </div>
              <h3 className="font-medium text-lg group-hover:text-tech-purple transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
