
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Tech Enthusiast",
    content: "TechTreasure has the best selection of gadgets I've ever seen. Their shipping is lightning fast and their customer service is top-notch!",
    rating: 5,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Software Developer",
    content: "I bought my new laptop from TechTreasure and couldn't be happier. The prices are competitive and the quality is exceptional.",
    rating: 5,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Content Creator",
    content: "As someone who relies on tech for my work, I appreciate the quality and reliability of products from TechTreasure. Will definitely shop here again!",
    rating: 4,
    avatar: "/placeholder.svg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Don't just take our word for it - hear what our satisfied customers have to say
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
