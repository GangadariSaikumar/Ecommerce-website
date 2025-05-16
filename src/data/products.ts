
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  rating: number;
  stock: number;
  discountPercentage?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "UltraSound X Pro Headphones",
    price: 299.99,
    category: "Audio",
    image: "/placeholder.svg",
    description: "Experience crystal-clear sound with our flagship wireless headphones featuring active noise cancellation and 40 hours of battery life.",
    features: ["Active Noise Cancellation", "40-hour battery life", "Premium comfort", "Bluetooth 5.2"],
    rating: 4.8,
    stock: 25,
    isFeatured: true,
    isNew: true
  },
  {
    id: "2",
    name: "TechPro Smartwatch",
    price: 249.99,
    category: "Wearables",
    image: "/placeholder.svg",
    description: "Track your fitness, receive notifications, and more with this advanced smartwatch featuring a 1.4-inch AMOLED display.",
    features: ["Heart rate monitor", "Sleep tracking", "5 ATM water resistance", "7-day battery life"],
    rating: 4.5,
    stock: 15,
    discountPercentage: 10,
    isFeatured: true
  },
  {
    id: "3",
    name: "CloudBook Air Laptop",
    price: 999.99,
    category: "Computers",
    image: "/placeholder.svg",
    description: "Ultra-thin and lightweight laptop with a stunning 4K display, powerful processor, and all-day battery life.",
    features: ["13.3-inch 4K display", "16GB RAM", "512GB SSD", "Intel Core i7"],
    rating: 4.9,
    stock: 10,
    isFeatured: true
  },
  {
    id: "4",
    name: "PowerDock Charging Station",
    price: 79.99,
    category: "Accessories",
    image: "/placeholder.svg",
    description: "Charge multiple devices simultaneously with this sleek wireless charging dock featuring fast charging technology.",
    features: ["15W fast charging", "Multiple device support", "LED indicators", "Compact design"],
    rating: 4.3,
    stock: 30,
    isFeatured: true
  },
  {
    id: "5",
    name: "ClearVision VR Headset",
    price: 349.99,
    category: "Gaming",
    image: "/placeholder.svg",
    description: "Immerse yourself in virtual reality with our high-resolution VR headset featuring motion tracking and spatial audio.",
    features: ["4K resolution per eye", "120Hz refresh rate", "Integrated audio", "6DOF tracking"],
    rating: 4.7,
    stock: 8,
    isNew: true
  },
  {
    id: "6",
    name: "UltraThin Smartphone",
    price: 899.99,
    category: "Phones",
    image: "/placeholder.svg",
    description: "The latest flagship smartphone with a stunning 6.7-inch display, powerful camera system, and all-day battery life.",
    features: ["6.7-inch OLED", "108MP camera", "5G connectivity", "5000mAh battery"],
    rating: 4.6,
    stock: 20,
    isFeatured: true
  },
  {
    id: "7",
    name: "SoundBar Pro",
    price: 199.99,
    category: "Audio",
    image: "/placeholder.svg",
    description: "Upgrade your home theater with this premium soundbar featuring Dolby Atmos and wireless subwoofer.",
    features: ["Dolby Atmos", "Wireless subwoofer", "HDMI ARC", "Bluetooth 5.0"],
    rating: 4.4,
    stock: 12,
    discountPercentage: 15
  },
  {
    id: "8",
    name: "SmartHome Hub",
    price: 129.99,
    category: "Smart Home",
    image: "/placeholder.svg",
    description: "Control all your smart home devices from one central hub with voice commands and smartphone integration.",
    features: ["Voice control", "Wi-Fi & Bluetooth", "100+ device compatibility", "Energy monitoring"],
    rating: 4.2,
    stock: 18,
    isNew: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'audio', name: 'Audio' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'computers', name: 'Computers' },
  { id: 'phones', name: 'Phones' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'smart-home', name: 'Smart Home' },
];
